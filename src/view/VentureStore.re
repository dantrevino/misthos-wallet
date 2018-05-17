open PrimitiveTypes;

type selectedVenture =
  | None
  | CreatingVenture
  | JoiningVenture(ventureId)
  | LoadingVenture(ventureId)
  | VentureLoaded(ventureId, ViewModel.t, VentureWorkerClient.Cmd.t);

type action =
  | CreateVenture(string)
  | TabSync(VentureWorkerMessage.outgoing)
  | SyncWorkerMessage(SyncWorkerMessage.outgoing)
  | DataWorkerMessage(DataWorkerMessage.outgoing)
  | IncomeWorkerMessage(IncomeWorkerMessage.outgoing)
  | VentureWorkerMessage(VentureWorkerMessage.outgoing);

type state = {
  index: option(Venture.Index.t),
  selectedVenture,
  session: Session.t,
  syncWorker: ref(SyncWorkerClient.t),
  dataWorker: ref(DataWorkerClient.t),
  incomeWorker: ref(IncomeWorkerClient.t),
  persistWorker: ref(PersistWorkerClient.t),
  ventureWorker: ref(VentureWorkerClient.t),
};

let loadVentureAndIndex =
    (
      session: Session.t,
      currentRoute,
      {
        selectedVenture,
        ventureWorker,
        persistWorker,
        incomeWorker,
        syncWorker,
        session: oldSession,
      },
    ) => {
  if (oldSession != session) {
    ventureWorker^ |> VentureWorkerClient.updateSession;
    incomeWorker^ |> IncomeWorkerClient.updateSession;
    persistWorker^ |> PersistWorkerClient.updateSession;
    syncWorker^ |> SyncWorkerClient.updateSession;
  };
  switch (session, currentRoute: Router.Config.route, selectedVenture) {
  | (LoggedIn(_), Venture(ventureId, _), VentureLoaded(loadedId, _, _))
      when VentureId.eq(ventureId, loadedId) => selectedVenture
  | (LoggedIn(_), Venture(ventureId, _), VentureLoaded(loadedId, _, _))
      when VentureId.neq(ventureId, loadedId) =>
    ventureWorker^ |> VentureWorkerClient.load(~ventureId);
    LoadingVenture(ventureId);
  | (LoggedIn(_), Venture(ventureId, _), _) =>
    ventureWorker^ |> VentureWorkerClient.load(~ventureId);
    LoadingVenture(ventureId);
  | (LoggedIn(_sessionData), JoinVenture(ventureId, userId), _) =>
    ventureWorker^ |> VentureWorkerClient.joinVia(~ventureId, ~userId);
    JoiningVenture(ventureId);
  | _ => None
  };
};

let component = ReasonReact.reducerComponent("VentureStore");

module L = Dom.Storage;

let updateOtherTabs = msg => {
  let encodedMsg = msg |> VentureWorkerMessage.encodeOutgoing;
  L.localStorage |> L.setItem("tab-sync", encodedMsg |> Json.stringify);
};

external toStorageEvent : Dom.event => StorageEventRe.t = "%identity";

let handler = (send, msg) => {
  let storageEvent = msg |> toStorageEvent;
  switch (storageEvent |> StorageEventRe.key) {
  | "tab-sync" =>
    try (
      TabSync(
        storageEvent
        |> StorageEventRe.newValue
        |> Json.parseOrRaise
        |> VentureWorkerMessage.decodeOutgoing,
      )
      |> send
    ) {
    | _ => ()
    }
  | _ => ()
  };
};

let make = (~currentRoute, ~session: Session.t, children) => {
  ...component,
  initialState: () => {
    session: Unknown,
    index: None,
    selectedVenture: None,
    syncWorker: ref(SyncWorkerClient.make(~onMessage=Js.log)),
    dataWorker: ref(DataWorkerClient.make(~onMessage=Js.log)),
    incomeWorker: ref(IncomeWorkerClient.make(~onMessage=Js.log)),
    persistWorker: ref(PersistWorkerClient.make(~onMessage=Js.log)),
    ventureWorker: ref(VentureWorkerClient.make(~onMessage=Js.log)),
  },
  didMount: ({state}) =>
    loadVentureAndIndex(session, currentRoute, state) |> ignore,
  willReceiveProps: ({state}) => {
    ...state,
    selectedVenture: loadVentureAndIndex(session, currentRoute, state),
    session,
  },
  subscriptions: ({send, state}) => {
    let eventListener = handler(send);
    [
      Sub(
        () => {
          DomRe.window |> WindowRe.addEventListener("storage", eventListener);
          eventListener;
        },
        listener =>
          DomRe.window |> WindowRe.removeEventListener("storage", listener),
      ),
      Sub(
        () => {
          SyncWorkerClient.terminate(state.syncWorker^);
          let worker =
            SyncWorkerClient.make(~onMessage=message =>
              send(SyncWorkerMessage(message))
            );
          state.syncWorker := worker;
          worker;
        },
        SyncWorkerClient.terminate,
      ),
      Sub(
        () => {
          DataWorkerClient.terminate(state.dataWorker^);
          let worker =
            DataWorkerClient.make(~onMessage=message =>
              send(DataWorkerMessage(message))
            );
          state.dataWorker := worker;
          worker;
        },
        DataWorkerClient.terminate,
      ),
      Sub(
        () => {
          IncomeWorkerClient.terminate(state.incomeWorker^);
          let worker =
            IncomeWorkerClient.make(~onMessage=message =>
              send(IncomeWorkerMessage(message))
            );
          state.incomeWorker := worker;
          worker;
        },
        IncomeWorkerClient.terminate,
      ),
      Sub(() => state.persistWorker^, PersistWorkerClient.terminate),
      Sub(
        () => {
          VentureWorkerClient.terminate(state.ventureWorker^);
          let worker =
            VentureWorkerClient.make(~onMessage=message =>
              send(VentureWorkerMessage(message))
            );
          state.ventureWorker := worker;
          worker;
        },
        VentureWorkerClient.terminate,
      ),
    ];
  },
  reducer: (action, state) =>
    switch (state.session) {
    | LoggedIn(sessionData) =>
      switch (action) {
      | CreateVenture(name) =>
        state.ventureWorker^ |> VentureWorkerClient.create(~name);
        ReasonReact.Update({...state, selectedVenture: CreatingVenture});
      | VentureWorkerMessage(msg) =>
        state.persistWorker^ |> PersistWorkerClient.ventureMessage(msg);
        state.dataWorker^ |. DataWorkerClient.postMessage(msg);
        switch (msg, state.selectedVenture) {
        | (UpdateIndex(index), _) =>
          updateOtherTabs(msg);
          ReasonReact.Update({...state, index: Some(index)});
        | (VentureCreated(ventureId, events), _) =>
          ReasonReact.UpdateWithSideEffects(
            {
              ...state,
              selectedVenture:
                VentureLoaded(
                  ventureId,
                  ViewModel.init(sessionData.userId, events),
                  VentureWorkerClient.Cmd.make(
                    state.ventureWorker^,
                    ventureId,
                  ),
                ),
            },
            ((_) => Router.goTo(Router.Config.Venture(ventureId, None))),
          )
        | (VentureLoaded(ventureId, events, _), JoiningVenture(joiningId))
            when VentureId.eq(ventureId, joiningId) =>
          ReasonReact.UpdateWithSideEffects(
            {
              ...state,
              selectedVenture:
                VentureLoaded(
                  ventureId,
                  ViewModel.init(sessionData.userId, events),
                  VentureWorkerClient.Cmd.make(
                    state.ventureWorker^,
                    ventureId,
                  ),
                ),
            },
            ((_) => Router.goTo(Router.Config.Venture(ventureId, None))),
          )
        | (VentureLoaded(ventureId, events, _), LoadingVenture(loadingId))
            when VentureId.eq(ventureId, loadingId) =>
          ReasonReact.Update({
            ...state,
            selectedVenture:
              VentureLoaded(
                ventureId,
                ViewModel.init(sessionData.userId, events),
                VentureWorkerClient.Cmd.make(state.ventureWorker^, ventureId),
              ),
          })
        | (
            NewItems(ventureId, newItems),
            VentureLoaded(loadedId, viewModel, cmd),
          )
            when VentureId.eq(ventureId, loadedId) =>
          updateOtherTabs(msg);
          ReasonReact.Update({
            ...state,
            selectedVenture:
              VentureLoaded(
                ventureId,
                viewModel |> ViewModel.applyAll(newItems),
                cmd,
              ),
          });
        | _ => ReasonReact.NoUpdate
        };
      | SyncWorkerMessage(msg) =>
        state.ventureWorker^ |. VentureWorkerClient.postMessage(msg);
        ReasonReact.NoUpdate;
      | DataWorkerMessage(msg) =>
        state.ventureWorker^ |. VentureWorkerClient.postMessage(msg);
        ReasonReact.NoUpdate;
      | IncomeWorkerMessage(msg) =>
        state.ventureWorker^ |. VentureWorkerClient.postMessage(msg);
        ReasonReact.NoUpdate;
      | TabSync(msg) =>
        switch (msg) {
        | NewItems(ventureId, newItems) =>
          state.ventureWorker^
          |. VentureWorkerClient.postMessage(SyncTabs(ventureId, newItems));
          switch (state.selectedVenture) {
          | VentureLoaded(loadedId, viewModel, cmd)
              when VentureId.eq(loadedId, ventureId) =>
            ReasonReact.Update({
              ...state,
              selectedVenture:
                VentureLoaded(
                  ventureId,
                  viewModel |> ViewModel.applyAll(newItems),
                  cmd,
                ),
            })
          | _ => ReasonReact.NoUpdate
          };
        | UpdateIndex(index) =>
          ReasonReact.Update({...state, index: Some(index)})
        | _ => ReasonReact.NoUpdate
        }
      }
    | _ => ReasonReact.NoUpdate
    },
  render: ({state: {index, selectedVenture}, send}) =>
    children(~index, ~selectedVenture, ~createVenture=name =>
      send(CreateVenture(name))
    ),
};
