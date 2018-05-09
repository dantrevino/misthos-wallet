open PrimitiveTypes;

open WalletTypes;

module AppEvent = Event;

let userSession = id : Session.Data.t => {
  let appPrivateKey = Crypto.randomBytes(32) |> Utils.bufToHex;
  let issuerKeyPair =
    Utils.keyPairFromPrivateKey(
      Network.bitcoinNetwork(Regtest),
      appPrivateKey,
    );
  let appPubKey = issuerKeyPair |> Utils.publicKeyFromKeyPair;
  {
    userId: id,
    appPrivateKey,
    issuerKeyPair,
    storagePrefix:
      UserInfo.storagePrefix(
        ~appPubKey=issuerKeyPair |> Utils.publicKeyFromKeyPair,
      ),
    masterKeyChain:
      Bitcoin.HDNode.make(
        issuerKeyPair,
        appPubKey |. String.sub(0, 64) |> Utils.bufFromHex,
      ),
    network: Regtest,
  };
};

let twoUserSessions = () => (
  userSession("user1" |> UserId.fromString),
  userSession("user2" |> UserId.fromString),
);

let threeUserSessions = () => (
  userSession("user1" |> UserId.fromString),
  userSession("user2" |> UserId.fromString),
  userSession("user3" |> UserId.fromString),
);

let fourUserSessions = () => (
  userSession("user1" |> UserId.fromString),
  userSession("user2" |> UserId.fromString),
  userSession("user3" |> UserId.fromString),
  userSession("user4" |> UserId.fromString),
);

let custodianKeyChain =
    (~ventureId, ~keyChainIdx, {masterKeyChain}: Session.Data.t) =>
  CustodianKeyChain.make(
    ~ventureId,
    ~accountIdx=AccountIndex.default,
    ~keyChainIdx=CustodianKeyChainIndex.fromInt(keyChainIdx),
    ~masterKeyChain,
  )
  |> CustodianKeyChain.toPublicKeyChain;

let accountKeyChain =
    (~ventureId=VentureId.fromString("test"), ~keyChainIdx=0, users) =>
  users
  |> List.map((user: Session.Data.t) =>
       (user.userId, custodianKeyChain(~ventureId, ~keyChainIdx, user))
     )
  |> AccountKeyChain.make(
       AccountIndex.default,
       AccountKeyChainIndex.fromInt(keyChainIdx),
     );

module Event = {
  let createVenture = (session: Session.Data.t) =>
    AppEvent.VentureCreated.make(
      ~ventureName=UserId.toString(session.userId) ++ "-testventure",
      ~creatorId=session.userId,
      ~creatorPubKey=session.issuerKeyPair |> Utils.publicKeyFromKeyPair,
      ~metaPolicy=Policy.unanimous,
      ~network=session.network,
    );
  let partnerProposed =
      (
        ~policy=Policy.unanimous,
        ~lastRemovalAccepted,
        supporterSession: Session.Data.t,
        prospectSession: Session.Data.t,
      ) =>
    AppEvent.makePartnerProposed(
      ~supporterId=supporterSession.userId,
      ~prospectId=prospectSession.userId,
      ~prospectPubKey=
        prospectSession.issuerKeyPair |> Utils.publicKeyFromKeyPair,
      ~policy,
      ~lastRemovalAccepted,
    )
    |> AppEvent.getPartnerProposedExn;
  let partnerEndorsed =
      (supporter: Session.Data.t, {processId}: AppEvent.Partner.Proposed.t) =>
    AppEvent.makePartnerEndorsed(~processId, ~supporterId=supporter.userId)
    |> AppEvent.getPartnerEndorsedExn;
  let partnerRejected =
      (rejector: Session.Data.t, {processId}: AppEvent.Partner.Proposed.t) =>
    AppEvent.makePartnerRejected(~processId, ~rejectorId=rejector.userId)
    |> AppEvent.getPartnerRejectedExn;
  let partnerAccepted = AppEvent.Partner.Accepted.fromProposal;
  let partnerRemovalProposed =
      (supporterSession: Session.Data.t, toBeRemoved: Session.Data.t) =>
    AppEvent.makePartnerRemovalProposed(
      ~supporterId=supporterSession.userId,
      ~partnerId=toBeRemoved.userId,
      ~policy=Policy.unanimousMinusOne,
    )
    |> AppEvent.getPartnerRemovalProposedExn;
  let partnerRemovalEndorsed =
      (
        supporter: Session.Data.t,
        {processId}: AppEvent.Partner.Removal.Proposed.t,
      ) =>
    AppEvent.makePartnerRemovalEndorsed(
      ~processId,
      ~supporterId=supporter.userId,
    )
    |> AppEvent.getPartnerRemovalEndorsedExn;
  let partnerRemovalAccepted = AppEvent.Partner.Removal.Accepted.fromProposal;
  let accountCreationProposed = ({userId}: Session.Data.t) =>
    AppEvent.makeAccountCreationProposed(
      ~supporterId=userId,
      ~name="test",
      ~accountIdx=AccountIndex.default,
      ~policy=Policy.unanimous,
    )
    |> AppEvent.getAccountCreationProposedExn;
  let accountCreationAccepted = AppEvent.AccountCreation.Accepted.fromProposal;
  let custodianProposed =
      (
        {userId}: Session.Data.t,
        partnerProposal: AppEvent.Partner.Proposed.t,
      ) =>
    Event.makeCustodianProposed(
      ~partnerProposed=partnerProposal,
      ~supporterId=userId,
      ~accountIdx=AccountIndex.default,
      ~policy=Policy.unanimous,
    )
    |> Event.getCustodianProposedExn;
  let custodianEndorsed =
      (supporter: Session.Data.t, {processId}: AppEvent.Custodian.Proposed.t) =>
    AppEvent.makeCustodianEndorsed(~processId, ~supporterId=supporter.userId)
    |> AppEvent.getCustodianEndorsedExn;
  let custodianAccepted = AppEvent.Custodian.Accepted.fromProposal;
  let custodianRemovalProposed =
      (
        ~custodianAccepted,
        supporterSession: Session.Data.t,
        toBeRemoved: Session.Data.t,
      ) =>
    AppEvent.makeCustodianRemovalProposed(
      ~custodianAccepted,
      ~supporterId=supporterSession.userId,
      ~custodianId=toBeRemoved.userId,
      ~accountIdx=AccountIndex.default,
      ~policy=Policy.unanimousMinusOne,
    )
    |> AppEvent.getCustodianRemovalProposedExn;
  let custodianRemovalEndorsed =
      (
        supporter: Session.Data.t,
        {processId}: AppEvent.Custodian.Removal.Proposed.t,
      ) =>
    AppEvent.makeCustodianRemovalEndorsed(
      ~processId,
      ~supporterId=supporter.userId,
    )
    |> AppEvent.getCustodianRemovalEndorsedExn;
  let custodianRemovalAccepted = AppEvent.Custodian.Removal.Accepted.fromProposal;
  let custodianKeyChainUpdated = AppEvent.CustodianKeyChainUpdated.make;
  let accountKeyChainUpdated = AppEvent.AccountKeyChainUpdated.make;
};

module Log = {
  type t = {
    ventureId,
    systemIssuer: Bitcoin.ECPair.t,
    lastItem: EventLog.item,
    log: EventLog.t,
  };
  let reduce = (f, s, {log}) => EventLog.reduce(f, s, log);
  let ventureId = ({ventureId}) => ventureId;
  let systemIssuer = ({systemIssuer}) => systemIssuer;
  let lastItem = ({lastItem}) => lastItem;
  let lastEvent = ({lastItem: {event}}) => event;
  let eventLog = ({log}) => log;
  let appendEvent = (issuer, event, {log} as l) => {
    let (lastItem, log) = log |> EventLog.append(issuer, event);
    {...l, lastItem, log};
  };
  let appendSystemEvent = (event, {systemIssuer} as log) =>
    appendEvent(systemIssuer, event, log);
  let make = (session: Session.Data.t, ventureCreated) => {
    let (lastItem, log) =
      EventLog.make()
      |> EventLog.append(
           session.issuerKeyPair,
           VentureCreated(ventureCreated),
         );
    {
      ventureId: ventureCreated.ventureId,
      systemIssuer: ventureCreated.systemIssuer,
      lastItem,
      log,
    };
  };
  let createVenture = (session: Session.Data.t) =>
    make(session, Event.createVenture(session));
  let withPartnerProposed =
      (
        ~withLastRemoval=true,
        ~issuer=?,
        ~policy=Policy.unanimous,
        ~supporter: Session.Data.t,
        ~prospect: Session.Data.t,
        {log} as l,
      ) => {
    let issuer =
      switch (issuer) {
      | None => supporter.issuerKeyPair
      | Some(key) => key
      };
    let lastRemovalAccepted =
      withLastRemoval ?
        log
        |> EventLog.reduce(
             (res, {event}) =>
               switch (event) {
               | PartnerRemovalAccepted({data: {id}} as event)
                   when UserId.eq(id, prospect.userId) =>
                 Some(event)
               | _ => res
               },
             None,
           ) :
        None;
    appendEvent(
      issuer,
      PartnerProposed(
        Event.partnerProposed(
          ~policy,
          ~lastRemovalAccepted,
          supporter,
          prospect,
        ),
      ),
      l,
    );
  };
  let withPartnerEndorsed = (~issuer=?, supporter: Session.Data.t, proposal) => {
    let issuer =
      switch (issuer) {
      | None => supporter.issuerKeyPair
      | Some(key) => key
      };
    appendEvent(
      issuer,
      PartnerEndorsed(Event.partnerEndorsed(supporter, proposal)),
    );
  };
  let withPartnerRejected = (~issuer=?, supporter: Session.Data.t, proposal) => {
    let issuer =
      switch (issuer) {
      | None => supporter.issuerKeyPair
      | Some(key) => key
      };
    appendEvent(
      issuer,
      PartnerRejected(Event.partnerRejected(supporter, proposal)),
    );
  };
  let withPartnerAccepted = proposal =>
    appendSystemEvent(PartnerAccepted(Event.partnerAccepted(proposal)));
  let withPartner = (user, ~supporters, log) =>
    switch (supporters) {
    | [first, ...rest] =>
      let log = log |> withPartnerProposed(~supporter=first, ~prospect=user);
      let proposal = log |> lastEvent |> AppEvent.getPartnerProposedExn;
      rest
      |> List.fold_left(
           (log, supporter) =>
             log |> withPartnerEndorsed(supporter, proposal),
           log,
         )
      |> withPartnerAccepted(proposal);
    | _ => %assert
           "withPartner"
    };
  let withFirstPartner = user => withPartner(user, ~supporters=[user]);
  let withPartnerRemovalProposed = (~supporter: Session.Data.t, ~toBeRemoved) =>
    appendEvent(
      supporter.issuerKeyPair,
      PartnerRemovalProposed(
        Event.partnerRemovalProposed(supporter, toBeRemoved),
      ),
    );
  let withPartnerRemovalEndorsed = (supporter: Session.Data.t, proposal) =>
    appendEvent(
      supporter.issuerKeyPair,
      PartnerRemovalEndorsed(
        Event.partnerRemovalEndorsed(supporter, proposal),
      ),
    );
  let withPartnerRemovalAccepted = proposal =>
    appendSystemEvent(
      PartnerRemovalAccepted(Event.partnerRemovalAccepted(proposal)),
    );
  let withPartnerRemoved = (user, ~supporters, log) =>
    switch (supporters) {
    | [first, ...rest] =>
      let log =
        log |> withPartnerRemovalProposed(~supporter=first, ~toBeRemoved=user);
      let proposal = log |> lastEvent |> AppEvent.getPartnerRemovalProposedExn;
      rest
      |> List.fold_left(
           (log, supporter) =>
             log |> withPartnerRemovalEndorsed(supporter, proposal),
           log,
         )
      |> withPartnerRemovalAccepted(proposal);
    | _ => %assert
           "withPartner"
    };
  let withAccountCreationProposed = (~supporter: Session.Data.t) =>
    appendEvent(
      supporter.issuerKeyPair,
      AccountCreationProposed(Event.accountCreationProposed(supporter)),
    );
  let withAccountCreationAccepted = proposal =>
    appendSystemEvent(
      AccountCreationAccepted(Event.accountCreationAccepted(proposal)),
    );
  let withAccount = (~supporter, log) => {
    let log = log |> withAccountCreationProposed(~supporter);
    let proposal = log |> lastEvent |> AppEvent.getAccountCreationProposedExn;
    log |> withAccountCreationAccepted(proposal);
  };
  let withCustodianProposed =
      (~supporter: Session.Data.t, ~custodian: Session.Data.t, {log} as l) => {
    let partnerProposed =
      log
      |> EventLog.reduce(
           (partnerProposal, {event}) =>
             switch (partnerProposal, event) {
             | (Some(p), _) => Some(p)
             | (_, PartnerProposed(proposal))
                 when UserId.eq(proposal.data.id, custodian.userId) =>
               Some(proposal)
             | _ => partnerProposal
             },
           None,
         );
    switch (partnerProposed) {
    | Some(proposal) =>
      appendEvent(
        supporter.issuerKeyPair,
        CustodianProposed(Event.custodianProposed(supporter, proposal)),
        l,
      )
    | None => raise(Not_found)
    };
  };
  let withCustodianEndorsed = (supporter: Session.Data.t, proposal) =>
    appendEvent(
      supporter.issuerKeyPair,
      CustodianEndorsed(Event.custodianEndorsed(supporter, proposal)),
    );
  let withCustodianAccepted = proposal =>
    appendSystemEvent(CustodianAccepted(Event.custodianAccepted(proposal)));
  let withCustodian = (user, ~supporters, log) =>
    switch (supporters) {
    | [first, ...rest] =>
      let log =
        log |> withCustodianProposed(~supporter=first, ~custodian=user);
      let proposal = log |> lastEvent |> AppEvent.getCustodianProposedExn;
      rest
      |> List.fold_left(
           (log, supporter) =>
             log |> withCustodianEndorsed(supporter, proposal),
           log,
         )
      |> withCustodianAccepted(proposal);
    | _ => %assert
           "withPartner"
    };
  let withCustodianRemovalProposed =
      (~supporter: Session.Data.t, ~toBeRemoved: Session.Data.t, {log} as l) => {
    let custodianAccepted =
      log
      |> EventLog.reduce(
           (res, {event}) =>
             switch (event) {
             | CustodianAccepted({data: {partnerId}} as event)
                 when UserId.eq(partnerId, toBeRemoved.userId) =>
               Some(event)
             | _ => res
             },
           None,
         )
      |> Js.Option.getExn;
    l
    |> appendEvent(
         supporter.issuerKeyPair,
         CustodianRemovalProposed(
           Event.custodianRemovalProposed(
             ~custodianAccepted,
             supporter,
             toBeRemoved,
           ),
         ),
       );
  };
  let withCustodianRemovalEndorsed = (supporter: Session.Data.t, proposal) =>
    appendEvent(
      supporter.issuerKeyPair,
      CustodianRemovalEndorsed(
        Event.custodianRemovalEndorsed(supporter, proposal),
      ),
    );
  let withCustodianRemovalAccepted = proposal =>
    appendSystemEvent(
      CustodianRemovalAccepted(Event.custodianRemovalAccepted(proposal)),
    );
  let withCustodianRemoved = (user, ~supporters, log) =>
    switch (supporters) {
    | [first, ...rest] =>
      let log =
        log
        |> withCustodianRemovalProposed(~supporter=first, ~toBeRemoved=user);
      let proposal =
        log |> lastEvent |> AppEvent.getCustodianRemovalProposedExn;
      rest
      |> List.fold_left(
           (log, supporter) =>
             log |> withCustodianRemovalEndorsed(supporter, proposal),
           log,
         )
      |> withCustodianRemovalAccepted(proposal);
    | _ => %assert
           "withCustodian"
    };
  let withAccountKeyChain =
      (~keyChainIdx=0, custodians, {log, ventureId} as l) => {
    let custodianProcesses =
      log
      |> EventLog.reduce(
           (res, {event}) =>
             switch (event) {
             | CustodianAccepted({processId, data: {partnerId}}) => [
                 (partnerId, processId),
                 ...res,
               ]
             | _ => res
             },
           [],
         );
    let accountKeyChain =
      accountKeyChain(~ventureId, ~keyChainIdx, custodians);
    accountKeyChain.custodianKeyChains
    |> List.map(((custodianId, keyChain)) =>
         Event.custodianKeyChainUpdated(
           ~custodianApprovalProcess=
             custodianProcesses |> List.assoc(custodianId),
           ~custodianId,
           ~keyChain,
         )
       )
    |> List.fold_left(
         (l, event: AppEvent.CustodianKeyChainUpdated.t) =>
           l
           |> appendEvent(
                (
                  custodians
                  |> List.find(({userId}: Session.Data.t) =>
                       UserId.eq(userId, event.custodianId)
                     )
                ).
                  issuerKeyPair,
                CustodianKeyChainUpdated(event),
              ),
         l,
       )
    |> appendSystemEvent(
         AccountKeyChainUpdated(
           Event.accountKeyChainUpdated(~keyChain=accountKeyChain),
         ),
       );
  };
};
