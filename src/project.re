module Index = ProjectIndex;

module ValidationState = {
  type member = {
    blockstackId: string,
    address: string,
    pubKey: string
  };
  type t = {members: list(member)};
  let make = () => {members: []};
  let apply = (event: Event.t, state) =>
    switch event {
    | ProjectCreated({creatorId, creatorPubKey}) => {
        ...state,
        members: [
          {
            blockstackId: creatorId,
            pubKey: creatorPubKey,
            address: Utils.addressFromPublicKey(creatorPubKey)
          }
        ]
      }
    /* | MemberAdded(event) => { */
    /*     memberAddresses: [ */
    /*       Utils.addressFromPublicKey(event.pubKey), */
    /*       ...state.memberAddresses */
    /*     ] */
    /*   } */
    | _ => state
    };
};

type t = {
  id: string,
  log: EventLog.t,
  watchers: list(Watcher.t),
  state: ValidationState.t,
  viewModel: ViewModel.t
};

module Synchronize = {
  let getMemberHistoryUrls = (session: Session.Data.t, {id, state}) =>
    state.members
    /* |> List.filter(({blockstackId}: ValidationState.member) => */
    /*      blockstackId != session.blockstackId */
    /*    ) */
    |> List.map(({blockstackId}: ValidationState.member) =>
         Blockstack.getUserAppFileUrl(
           ~path=id ++ "/" ++ session.address ++ "/log.json",
           ~username=blockstackId,
           ~appOrigin=Utils.origin
         )
       )
    |> Array.of_list
    |> Js.Promise.all;
  let getMemberHistories = (session: Session.Data.t, {id, state}) =>
    Js.Promise.(
      state.members
      |> List.filter(({blockstackId}: ValidationState.member) =>
           blockstackId != session.blockstackId
         )
      |> List.map(({blockstackId}: ValidationState.member) =>
           Blockstack.getFileWithOpts(
             id ++ "/" ++ session.address ++ "/log.json",
             ~username=blockstackId,
             ()
           )
           |> then_(nullLog =>
                switch (Js.Nullable.to_opt(nullLog)) {
                | Some(raw) =>
                  resolve(Some(raw |> Json.parseOrRaise |> EventLog.decode))
                | None => resolve(None)
                }
              )
           |> catch(_error => resolve(None))
         )
      |> Array.of_list
      |> all
      |> then_(histories =>
           histories
           |> Array.to_list
           |> List.filter(Js.Option.isSome)
           |> List.rev_map(Js.Option.getExn)
           |> resolve
         )
    );
  /* let sync = (otherLogs, {state, watchers, log} as project) => { */
  /*   let (state,log) = log |> EventLog.merge(otherLogs,,item) => Verification.includeItem(item),((state,log),item) => { */
  /*            let state = state |> applyToState(item); */
  /*            let watchers = watchers |> updateWatchers(item, log); */
  /*            state */
  /*     } */
  /* let newItems = log |> EventLog.findNewItems(otherLogs); */
  /* let project = */
  /*   newItems */
  /*   |> List.fold_left( */
  /*        ({state, watchers, log}, item) => { */
  /*          /1* Verification.includeItem(item); *1/ */
  /*          let log = log |> EventLog.appendItem(item); */
  /*          let state = state |> applyToState(item); */
  /*          let watchers = watchers |> updateWatchers(item, log); */
  /*          {state, watchers, log}; */
  /*        }, */
  /*        project */
  /*      ); */
  /* applyWatcherEvents({log, state, watchers}); */
  /* }; */
};

let getMemberHistoryUrls = Synchronize.getMemberHistoryUrls;

let make = id => {
  id,
  log: EventLog.make(),
  watchers: [],
  state: ValidationState.make(),
  viewModel: ViewModel.make()
};

let updateWatchers = (item, log, watchers) => {
  watchers |> List.iter(w => w#receive(item));
  (
    switch (Watcher.initWatcherFor(item, log)) {
    | Some(w) => [w, ...watchers]
    | None => watchers
    }
  )
  |> List.filter(w => w#processCompleted() == false);
};

let rec applyWatcherEvents = ({id, log, watchers, state, viewModel}) => {
  let nextEvent =
    (
      try (
        Some(
          watchers
          |> List.rev
          |> List.find(w => w#pendingEvent() |> Js.Option.isSome)
        )
      ) {
      | Not_found => None
      }
    )
    |> DoNotFormat.andThenGetEvent;
  switch nextEvent {
  | None => {id, log, watchers, state, viewModel}
  | Some((issuer, event)) =>
    let (item, log) = log |> EventLog.append(issuer, event);
    let watchers = watchers |> updateWatchers(item, log);
    let state = state |> ValidationState.apply(event);
    let viewModel = viewModel |> ViewModel.apply(event);
    applyWatcherEvents({id, log, watchers, state, viewModel});
  };
};

let apply = (issuer, event, {id, log, watchers, state, viewModel}) => {
  let (item, log) = log |> EventLog.append(issuer, event);
  let watchers = watchers |> updateWatchers(item, log);
  let state = state |> ValidationState.apply(event);
  let viewModel = viewModel |> ViewModel.apply(event);
  applyWatcherEvents({id, log, watchers, state, viewModel});
};

let reconstruct = log => {
  let {viewModel, state} = make("");
  let (id, watchers, state, viewModel) =
    log
    |> EventLog.reduce(
         ((id, watchers, state, viewModel), {event} as item) => (
           switch event {
           | ProjectCreated({projectId}) => projectId
           | _ => id
           },
           switch (Watcher.initWatcherFor(item, log)) {
           | Some(w) => [w, ...watchers]
           | None => watchers
           },
           state |> ValidationState.apply(event),
           viewModel |> ViewModel.apply(event)
         ),
         ("", [], state, viewModel)
       );
  {id, log, watchers, state, viewModel};
};

let persist = ({id, log, state} as project) => {
  let logString = log |> EventLog.encode |> Json.stringify;
  let returnPromise =
    Js.Promise.(
      Blockstack.putFile(id ++ "/log.json", logString)
      |> then_(() => resolve(project))
    );
  state.members
  |> List.map(({address}: ValidationState.member) =>
       Blockstack.putFile(id ++ "/" ++ address ++ "/log.json", logString)
     )
  |> ignore;
  returnPromise;
};

let defaultPolicy = Policy.absolute;

let load = (~projectId) =>
  Js.Promise.(
    Blockstack.getFile(projectId ++ "/log.json")
    |> then_(nullLog =>
         switch (Js.Nullable.to_opt(nullLog)) {
         | Some(raw) =>
           resolve(raw |> Json.parseOrRaise |> EventLog.decode |> reconstruct)
         | None => raise(Not_found)
         }
       )
  );

let getId = ({id}) => id;

let getViewModel = ({viewModel}) => viewModel;

module Cmd = {
  module Create = {
    type result = (Index.t, t);
    let exec = (session: Session.Data.t, ~name as projectName) => {
      let projectCreated =
        Event.ProjectCreated.make(
          ~projectName,
          ~creatorId=session.blockstackId,
          ~creatorPubKey=session.appKeyPair |> Utils.publicKeyFromKeyPair,
          ~metaPolicy=defaultPolicy
        );
      Js.Promise.all2((
        Index.add(~projectId=projectCreated.projectId, ~projectName),
        make(projectCreated.projectId)
        |> apply(session.appKeyPair, ProjectCreated(projectCreated))
        |> persist
      ));
    };
  };
  module SuggestCandidate = {
    type result =
      | Ok(t)
      | NoUserInfo;
    let exec = (session: Session.Data.t, ~candidateId, project) =>
      Js.Promise.(
        UserPublicInfo.read(~blockstackId=candidateId)
        |> then_(readResult =>
             switch readResult {
             | UserPublicInfo.Ok(info) =>
               project
               |> apply(
                    session.appKeyPair,
                    Event.makeCandidateSuggested(
                      ~supporterId=session.blockstackId,
                      ~candidateId,
                      ~candidatePubKey=info.appPubKey
                    )
                  )
               |> persist
               |> then_(p => resolve(Ok(p)))
             | UserPublicInfo.NotFound => resolve(NoUserInfo)
             }
           )
      );
  };
};
