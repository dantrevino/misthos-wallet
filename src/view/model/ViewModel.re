open PrimitiveTypes;

open WalletTypes;

module ItemsSet = Belt.Set.String;

module PartnersCollector = ViewModel__PartnersCollector;

module BalanceCollector = ViewModel__BalanceCollector;

module TransactionCollector = ViewModel__TransactionCollector;

type payoutStatus =
  | PayoutPending
  | PayoutCompleted(string)
  | PayoutFailed(string);

type payout = {
  processId,
  payoutTx: PayoutTransaction.t,
  endorsedBy: list(userId),
  rejectedBy: list(userId),
  status: payoutStatus,
};

type t = {
  localUser: userId,
  ventureId,
  name: string,
  processedItems: ItemsSet.t,
  metaPolicy: Policy.t,
  payouts: list(payout),
  balanceCollector: BalanceCollector.t,
  partnersCollector: PartnersCollector.t,
  transactionCollector: TransactionCollector.t,
};

module ManagePartnersView = {
  type partner = PartnersCollector.partner;
  type t = {
    partners: list(partner),
    joinVentureUrl: string,
  };
  let fromViewModelState = ({ventureId, localUser, partnersCollector}) => {
    partners: partnersCollector.partners,
    joinVentureUrl:
      Location.origin
      ++ Router.Config.routeToUrl(JoinVenture(ventureId, localUser)),
  };
};

module PayoutView = {
  type t = {
    balance: BTC.t,
    ventureName: string,
  };
  let fromViewModelState = ({name, balanceCollector}) => {
    balance:
      (
        balanceCollector
        |> BalanceCollector.accountBalance(AccountIndex.default)
      ).
        currentSpendable,
    ventureName: name,
  };
};

module SelectedVentureView = {
  type partner = PartnersCollector.partner;
  type prospect = PartnersCollector.prospect;
  type confirmedTx = TransactionCollector.confirmedTx;
  type unconfirmedTx = TransactionCollector.unconfirmedTx;
  type nonrec payoutStatus = payoutStatus;
  type nonrec payout = payout;
  type balance = BalanceCollector.balance;
  type t = {
    ventureId,
    ventureName: string,
    readOnly: bool,
    partners: list(partner),
    prospects: list(prospect),
    removalProspects: list(prospect),
    transactions: (list(confirmedTx), list(unconfirmedTx)),
    payouts: list(payout),
    balance,
  };
  let fromViewModelState =
      (
        {
          ventureId,
          name,
          localUser,
          partnersCollector,
          transactionCollector,
          payouts,
          balanceCollector,
        },
      ) => {
    ventureId,
    ventureName: name,
    readOnly:
      partnersCollector |> PartnersCollector.isPartner(localUser) == false,
    partners: partnersCollector.partners,
    prospects: partnersCollector.prospects,
    removalProspects: partnersCollector.removalProspects,
    transactions: (
      transactionCollector.confirmedTxs,
      transactionCollector.unconfirmedTxs,
    ),
    payouts,
    balance:
      balanceCollector
      |> BalanceCollector.accountBalance(AccountIndex.default),
  };
};

type balance = BalanceCollector.balance;

type prospect = PartnersCollector.prospect;

type partner = PartnersCollector.partner;

type confirmedTx = TransactionCollector.confirmedTx;

type unconfirmedTx = TransactionCollector.unconfirmedTx;

let make = localUser => {
  localUser,
  name: "",
  processedItems: ItemsSet.empty,
  ventureId: VentureId.fromString(""),
  metaPolicy: Policy.unanimous,
  payouts: [],
  balanceCollector: BalanceCollector.make(),
  partnersCollector: PartnersCollector.make(localUser),
  transactionCollector: TransactionCollector.make(),
};

let apply = ({event, hash}: EventLog.item, {processedItems} as state) =>
  if (processedItems |. ItemsSet.has(hash)) {
    state;
  } else {
    let state = {
      ...state,
      balanceCollector:
        state.balanceCollector |> BalanceCollector.apply(event),
      partnersCollector:
        state.partnersCollector |> PartnersCollector.apply(event),
      transactionCollector:
        state.transactionCollector |> TransactionCollector.apply(event),
      processedItems: processedItems |. ItemsSet.add(hash),
    };
    switch (event) {
    | VentureCreated({ventureName, metaPolicy, ventureId}) => {
        ...state,
        ventureId,
        name: ventureName,
        metaPolicy,
      }
    | PayoutProposed({processId, supporterId, data}) => {
        ...state,
        payouts: [
          {
            processId,
            payoutTx: data.payoutTx,
            endorsedBy: [supporterId],
            rejectedBy: [],
            status: PayoutPending,
          },
          ...state.payouts,
        ],
      }
    | PayoutRejected({processId, rejectorId}) => {
        ...state,
        payouts:
          state.payouts
          |> List.map((p: payout) =>
               ProcessId.eq(p.processId, processId) ?
                 {...p, rejectedBy: [rejectorId, ...p.rejectedBy]} : p
             ),
      }
    | PayoutEndorsed({processId, supporterId}) => {
        ...state,
        payouts:
          state.payouts
          |> List.map((p: payout) =>
               ProcessId.eq(p.processId, processId) ?
                 {...p, endorsedBy: [supporterId, ...p.endorsedBy]} : p
             ),
      }
    | PayoutBroadcast({processId, txId}) => {
        ...state,
        payouts:
          state.payouts
          |> List.map((p: payout) =>
               ProcessId.eq(p.processId, processId) ?
                 {...p, status: PayoutCompleted(txId)} : p
             ),
      }
    | PayoutBroadcastFailed({processId, errorMessage}) => {
        ...state,
        payouts:
          state.payouts
          |> List.map((p: payout) =>
               ProcessId.eq(p.processId, processId) ?
                 {...p, status: PayoutFailed(errorMessage)} : p
             ),
      }
    | _ => state
    };
  };

let init = localUser =>
  Array.fold_left((m, item) => m |> apply(item), make(localUser));

let applyAll = (events, model) =>
  events |> Array.fold_left((m, item) => m |> apply(item), model);

let managePartnersModal = ManagePartnersView.fromViewModelState;

let payoutModal = PayoutView.fromViewModelState;

let selectedVenture = SelectedVentureView.fromViewModelState;

let readOnly = ({localUser, partnersCollector}) =>
  partnersCollector |> PartnersCollector.isPartner(localUser) == false;
