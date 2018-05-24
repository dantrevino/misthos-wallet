open PrimitiveTypes;

open WalletTypes;

module ItemsSet = Belt.Set.String;

module PartnersCollector = ViewModel__PartnersCollector;

module BalanceCollector = ViewModel__BalanceCollector;

module TransactionCollector = ViewModel__TransactionCollector;

module TxDetailsCollector = ViewModel__TxDetailsCollector;

type t = {
  localUser: userId,
  ventureId,
  lastResponse:
    option((WebWorker.correlationId, VentureWorkerMessage.cmdResponse)),
  name: string,
  processedItems: ItemsSet.t,
  metaPolicy: Policy.t,
  balanceCollector: BalanceCollector.t,
  partnersCollector: PartnersCollector.t,
  transactionCollector: TransactionCollector.t,
  txDetailsCollector: TxDetailsCollector.t,
  walletInfoCollector: WalletInfoCollector.t,
};

let readOnly = ({localUser, partnersCollector}) =>
  partnersCollector |> PartnersCollector.isPartner(localUser) == false;

let captureResponse = (correlationId, response, state) => {
  ...state,
  lastResponse: Some((correlationId, response)),
};

let lastResponse = ({lastResponse}) => lastResponse;

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

let managePartnersModal = ManagePartnersView.fromViewModelState;

module ViewPartnerView = {
  type voteStatus = ProcessCollector.voteStatus;
  type voter = ProcessCollector.voter;
  type t = PartnersCollector.partnerProcess;
  let fromViewModelState = (userId, {partnersCollector}) =>
    partnersCollector |> PartnersCollector.getProspect(userId);
};

let viewPartnerModal = ViewPartnerView.fromViewModelState;

module CreatePayoutView = {
  type balance = BalanceCollector.balance;
  type t = {
    allowCreation: bool,
    balance,
    ventureId,
    ventureName: string,
    initialSummary: PayoutTransaction.summary,
    isAddressValid: string => bool,
    max: (string, list((string, BTC.t)), BTC.t) => BTC.t,
    summary: (list((string, BTC.t)), BTC.t) => PayoutTransaction.summary,
  };
  let fromViewModelState =
      ({ventureId, localUser, name, balanceCollector, walletInfoCollector}) => {
    let balance =
      balanceCollector
      |> BalanceCollector.accountBalance(AccountIndex.default);
    {
      ventureId,
      balance,
      allowCreation: balance.currentSpendable |> BTC.gt(BTC.zero),
      ventureName: name,
      initialSummary: {
        reserved: BTC.zero,
        destinations: [],
        spentWithFees: BTC.zero,
        misthosFee: BTC.zero,
        networkFee: BTC.zero,
      },
      isAddressValid: address =>
        try (
          {
            Bitcoin.Address.toOutputScript(
              address,
              walletInfoCollector.network |> Network.bitcoinNetwork,
            )
            |> ignore;
            true;
          }
        ) {
        | _ => false
        },
      max: (targetDestination, destinations, fee) =>
        PayoutTransaction.max(
          ~allInputs=walletInfoCollector.unused,
          ~targetDestination,
          ~destinations,
          ~satsPerByte=fee,
          ~network=walletInfoCollector.network,
        ),
      summary: (destinations, fee) =>
        PayoutTransaction.build(
          ~mandatoryInputs=
            walletInfoCollector
            |> WalletInfoCollector.oldInputs(AccountIndex.default, localUser),
          ~allInputs=walletInfoCollector.unused,
          ~destinations,
          ~satsPerByte=fee,
          ~changeAddress=
            walletInfoCollector
            |> WalletInfoCollector.nextChangeAddress(
                 AccountIndex.default,
                 localUser,
               ),
          ~network=walletInfoCollector.network,
        )
        |> PayoutTransaction.summary(walletInfoCollector.network),
    };
  };
};

let createPayoutModal = CreatePayoutView.fromViewModelState;

module ViewPayoutView = {
  type payoutStatus = TxDetailsCollector.payoutStatus;
  type voteStatus = ProcessCollector.voteStatus;
  type voter = ProcessCollector.voter;
  type t = TxDetailsCollector.payoutProcess;
  let fromViewModelState = (processId, {txDetailsCollector}) =>
    txDetailsCollector |> TxDetailsCollector.getPayout(processId);
};

let viewPayoutModal = ViewPayoutView.fromViewModelState;

module SelectedVentureView = {
  type partner = PartnersCollector.partner;
  type prospect = PartnersCollector.partnerProcess;
  type txType = TransactionCollector.txType;
  type txStatus = TransactionCollector.txStatus;
  type txData = TransactionCollector.txData;
  type payoutStatus = TxDetailsCollector.payoutStatus;
  type payoutProcess = TxDetailsCollector.payoutProcess;
  type balance = BalanceCollector.balance;
  type t = {
    ventureId,
    ventureName: string,
    readOnly: bool,
    partners: list(partner),
    prospects: list(prospect),
    unconfirmedTxs: list(txData),
    confirmedTxs: list(txData),
    payoutsPendingApproval: list(payoutProcess),
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
          txDetailsCollector,
          balanceCollector,
        },
      ) => {
    ventureId,
    ventureName: name,
    readOnly:
      partnersCollector |> PartnersCollector.isPartner(localUser) == false,
    partners: partnersCollector.partners,
    prospects: partnersCollector |> PartnersCollector.prospectsPendingApproval,
    payoutsPendingApproval:
      txDetailsCollector |> TxDetailsCollector.payoutsPendingApproval,
    confirmedTxs: transactionCollector.confirmedTxs,
    unconfirmedTxs: transactionCollector.unconfirmedTxs,
    balance:
      balanceCollector
      |> BalanceCollector.accountBalance(AccountIndex.default),
  };
};

let selectedVenture = SelectedVentureView.fromViewModelState;

let make = localUser => {
  localUser,
  lastResponse: None,
  name: "",
  processedItems: ItemsSet.empty,
  ventureId: VentureId.fromString(""),
  metaPolicy: Policy.unanimous,
  balanceCollector: BalanceCollector.make(),
  partnersCollector: PartnersCollector.make(localUser),
  transactionCollector: TransactionCollector.make(),
  txDetailsCollector: TxDetailsCollector.make(localUser),
  walletInfoCollector: WalletInfoCollector.make(),
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
      txDetailsCollector:
        state.txDetailsCollector |> TxDetailsCollector.apply(event),
      walletInfoCollector:
        state.walletInfoCollector |> WalletInfoCollector.apply(event),
      processedItems: processedItems |. ItemsSet.add(hash),
    };
    switch (event) {
    | VentureCreated({ventureName, metaPolicy, ventureId}) => {
        ...state,
        ventureId,
        name: ventureName,
        metaPolicy,
      }
    | _ => state
    };
  };

let init = localUser =>
  EventLog.reduce((m, item) => m |> apply(item), make(localUser));

let applyAll = (events, model) =>
  events |> Array.fold_left((m, item) => m |> apply(item), model);
