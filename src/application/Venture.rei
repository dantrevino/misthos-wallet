open PrimitiveTypes;

open WalletTypes;

module Index: {
  type item = {
    id: ventureId,
    name: string,
  };
  type t = {
    ventures: list(item),
    breakingChange: bool,
  };
  let load: unit => Js.Promise.t(t);
  let encode: t => Js.Json.t;
  let decode: Js.Json.t => t;
};

module Validation: {
  type result =
    | Ok
    | Ignore
    | InvalidIssuer
    | UnknownProcessId
    | NotEligible
    | AlreadyVoted
    | PolicyNotFulfilled
    | PrematureDenial
    | DependencyNotMet
    | BadData(string);
  let resultToString: result => string;
};

exception InvalidEvent(Validation.result);

exception NotPersistingNewEvents;

type t;

type loadResult =
  | Ok(t, array(EventLog.item))
  | CouldNotLoad(Js.Promise.error);

let load:
  (~persist: bool=?, SessionData.t, ~ventureId: ventureId) =>
  Js.Promise.t(loadResult);

type joinResult =
  | AlreadyLoaded(Index.t, t, array(EventLog.item))
  | Joined(Index.t, t)
  | CouldNotJoin(Js.Promise.error);

let join:
  (SessionData.t, ~userId: userId, ~ventureId: ventureId) =>
  Js.Promise.t(joinResult);

let getId: t => ventureId;

let getEventLog: t => EventLog.t;

let getSummary: t => EventLog.summary;

let reconstruct: (SessionData.t, EventLog.t) => (t, array(EventLog.item));

module Cmd: {
  module Create: {
    type result =
      | Ok(Index.t, t)
      | CouldNotPersist(Js.Promise.error);
    let exec:
      (
        SessionData.t,
        ~name: string,
        ~defaultAccountSettings: AccountSettings.t,
        ~initialPolicies: Policy.initialPolicies
      ) =>
      (ventureId, Js.Promise.t(result));
  };
  module SynchronizeLogs: {
    type result =
      | Ok(t, array(EventLog.item))
      | WithConflicts(
          t,
          array(EventLog.item),
          array((EventLog.item, Validation.result)),
        )
      | CouldNotPersist(Js.Promise.error);
    let exec:
      (~partnerId: userId=?, array(EventLog.item), t) => Js.Promise.t(result);
  };
  module SynchronizeWallet: {
    type result =
      | Ok(t, array(EventLog.item))
      | CouldNotPersist(Js.Promise.error);
    let exec:
      (
        list(Event.Payout.Broadcast.t),
        list(Event.Payout.BroadcastFailed.t),
        list(Event.Income.Detected.t),
        list(Event.Income.Unlocked.t),
        list(Event.Transaction.Confirmed.t),
        list(Event.Transaction.NoLongerDetected.t),
        t
      ) =>
      Js.Promise.t(result);
  };
  module SubmitCustodianKeyChain: {
    type result =
      | Ok(t, array(EventLog.item))
      | NotACustodian
      | CouldNotPersist(Js.Promise.error);
    let exec:
      (~keyChain: CustodianKeyChain.public, t) => Js.Promise.t(result);
  };
  module ProposePartner: {
    type result =
      | Ok(processId, t, array(EventLog.item))
      | MaxPartnersReached
      | ProposalAlreadyExists
      | PartnerAlreadyExists
      | UserIdDoesNotExist
      | CouldNotPersist(Js.Promise.error);
    let exec: (~prospectId: userId, t) => Js.Promise.t(result);
  };
  module RejectPartner: {
    type result =
      | Ok(t, array(EventLog.item))
      | CouldNotPersist(Js.Promise.error);
    let exec: (~processId: processId, t) => Js.Promise.t(result);
  };
  module EndorsePartner: {
    type result =
      | Ok(t, array(EventLog.item))
      | CouldNotPersist(Js.Promise.error);
    let exec: (~processId: processId, t) => Js.Promise.t(result);
  };
  module ProposePartnerRemoval: {
    type result =
      | Ok(processId, t, array(EventLog.item))
      | PartnerDoesNotExist
      | CouldNotPersist(Js.Promise.error);
    let exec: (~partnerId: userId, t) => Js.Promise.t(result);
  };
  module RejectPartnerRemoval: {
    type result =
      | Ok(t, array(EventLog.item))
      | CouldNotPersist(Js.Promise.error);
    let exec: (~processId: processId, t) => Js.Promise.t(result);
  };
  module EndorsePartnerRemoval: {
    type result =
      | Ok(t, array(EventLog.item))
      | CouldNotPersist(Js.Promise.error);
    let exec: (~processId: processId, t) => Js.Promise.t(result);
  };
  module ExposeIncomeAddress: {
    type result =
      | Ok(string, t, array(EventLog.item))
      | CouldNotPersist(Js.Promise.error);
    let exec: (~accountIdx: accountIdx, t) => Js.Promise.t(result);
  };
  module ProposePayout: {
    type result =
      | Ok(processId, t, array(EventLog.item))
      | NotEnoughFunds
      | CouldNotPersist(Js.Promise.error);
    let exec:
      (
        ~accountIdx: accountIdx,
        ~payoutTx: PayoutTransaction.t,
        ~signatures: array(option((string, string))),
        t
      ) =>
      Js.Promise.t(result);
  };
  module RejectPayout: {
    type result =
      | Ok(t, array(EventLog.item))
      | CouldNotPersist(Js.Promise.error);
    let exec: (~processId: processId, t) => Js.Promise.t(result);
  };
  module EndorsePayout: {
    type result =
      | Ok(t, array(EventLog.item))
      | CouldNotPersist(Js.Promise.error);
    let exec:
      (
        ~processId: processId,
        ~signatures: array(option((string, string))),
        t
      ) =>
      Js.Promise.t(result);
  };
  module SignPayout: {
    type result =
      | Ok(t, array(EventLog.item))
      | CouldNotPersist(Js.Promise.error);
    let exec:
      (
        ~processId: processId,
        ~signatures: array(option((string, string))),
        t
      ) =>
      Js.Promise.t(result);
  };
};
