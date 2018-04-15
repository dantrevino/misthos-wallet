open PrimitiveTypes;

open WalletTypes;

module Index: {
  type item = {
    id: ventureId,
    name: string,
  };
  type t = list(item);
  let load: unit => Js.Promise.t(t);
};

module Validation: {
  type result =
    | Ok
    | InvalidIssuer
    | UnknownProcessId
    | BadData(string)
    | DuplicateEndorsement
    | PolicyMissmatch
    | PolicyNotFulfilled
    | DependencyNotMet;
};

exception InvalidEvent(Validation.result);

exception CouldNotLoadVenture;

type listener('a) = (Event.t, 'a) => 'a;

type t('a);

let join:
  (
    Session.Data.t,
    ~userId: string,
    ~ventureId: string,
    ~listenerState: 'a,
    ~listener: listener('a)
  ) =>
  Js.Promise.t((Index.t, t('a)));

let load:
  (
    Session.Data.t,
    ~ventureId: ventureId,
    ~listenerState: 'a,
    ~listener: listener('a)
  ) =>
  Js.Promise.t(t('a));

let getId: t('a) => string;

let getSummary: t('a) => EventLog.summary;

let getListenerState: t('a) => 'a;

let getPartnerHistoryUrls: t('a) => Js.Promise.t(array(string));

module Wallet: {
  type balance = {
    total: BTC.t,
    reserved: BTC.t,
  };
  let balance: t('a) => Js.Promise.t(balance);
};

module Cmd: {
  module Create: {
    type result('a) = (Index.t, t('a));
    let exec:
      (
        Session.Data.t,
        ~name: string,
        ~listenerState: 'a,
        ~listener: listener('a)
      ) =>
      Js.Promise.t(result('a));
  };
  module Synchronize: {
    type result('a) =
      | Ok(t('a))
      | Error(t('a), EventLog.item, Validation.result);
    let exec: (list(EventLog.t), t('a)) => Js.Promise.t(result('a));
  };
  module ProposePartner: {
    type result('a) =
      | Ok(t('a))
      | NoUserInfo;
    let exec: (~prospectId: userId, t('a)) => Js.Promise.t(result('a));
  };
  module EndorsePartner: {
    type result('a) =
      | Ok(t('a));
    let exec: (~processId: processId, t('a)) => Js.Promise.t(result('a));
  };
  module ExposeIncomeAddress: {
    type result('a) =
      | Ok(string, t('a));
    let exec: (~accountIdx: accountIdx, t('a)) => Js.Promise.t(result('a));
  };
  module ProposePayout: {
    type result('a) =
      | Ok(t('a));
    let exec:
      (
        ~accountIdx: accountIdx,
        ~destinations: list((string, BTC.t)),
        ~fee: BTC.t,
        t('a)
      ) =>
      Js.Promise.t(result('a));
  };
  module EndorsePayout: {
    type result('a) =
      | Ok(t('a));
    let exec: (~processId: processId, t('a)) => Js.Promise.t(result('a));
  };
};
