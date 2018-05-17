// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("../../application/wallet/BTC.bs.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Policy = require("../../application/Policy.bs.js");
var Router = require("../Router.bs.js");
var Network = require("../../application/wallet/Network.bs.js");
var EventLog = require("../../application/events/EventLog.bs.js");
var WalletTypes = require("../../application/wallet/WalletTypes.bs.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var Belt_SetString = require("bs-platform/lib/js/belt_SetString.js");
var PrimitiveTypes = require("../../application/PrimitiveTypes.bs.js");
var PayoutTransaction = require("../../application/wallet/PayoutTransaction.bs.js");
var WalletInfoCollector = require("../../application/wallet/WalletInfoCollector.bs.js");
var ViewModel__BalanceCollector = require("./ViewModel__BalanceCollector.bs.js");
var ViewModel__PartnersCollector = require("./ViewModel__PartnersCollector.bs.js");
var ViewModel__TransactionCollector = require("./ViewModel__TransactionCollector.bs.js");

function readOnly(param) {
  return ViewModel__PartnersCollector.isPartner(param[/* localUser */0], param[/* partnersCollector */7]) === false;
}

function fromViewModelState(param) {
  return /* record */[
          /* partners */param[/* partnersCollector */7][/* partners */1],
          /* joinVentureUrl */window.location.origin + Router.Config[/* routeToUrl */1](/* JoinVenture */Block.__(1, [
                  param[/* ventureId */1],
                  param[/* localUser */0]
                ]))
        ];
}

var ManagePartnersView = /* module */[/* fromViewModelState */fromViewModelState];

function fromViewModelState$1(param) {
  var walletInfoCollector = param[/* walletInfoCollector */9];
  var localUser = param[/* localUser */0];
  return /* record */[
          /* ventureId */param[/* ventureId */1],
          /* ventureName */param[/* name */2],
          /* balance */ViewModel__BalanceCollector.accountBalance(WalletTypes.AccountIndex[/* default */9], param[/* balanceCollector */6])[/* currentSpendable */0],
          /* initialSummary : record */[
            /* reserved */BTC.zero,
            /* spentWithFees */BTC.zero,
            /* misthosFee */BTC.zero,
            /* networkFee */BTC.zero
          ],
          /* isAddressValid */(function (address) {
              try {
                BitcoinjsLib.address.toOutputScript(address, Network.bitcoinNetwork(walletInfoCollector[/* network */0]));
                return true;
              }
              catch (exn){
                return false;
              }
            }),
          /* max */(function (targetDestination, destinations, fee) {
              return PayoutTransaction.max(walletInfoCollector[/* unused */1], targetDestination, destinations, fee, walletInfoCollector[/* network */0]);
            }),
          /* summary */(function (destinations, fee) {
              return PayoutTransaction.summary(walletInfoCollector[/* network */0], PayoutTransaction.build(WalletInfoCollector.oldInputs(WalletTypes.AccountIndex[/* default */9], localUser, walletInfoCollector), walletInfoCollector[/* unused */1], destinations, fee, WalletInfoCollector.nextChangeAddress(WalletTypes.AccountIndex[/* default */9], localUser, walletInfoCollector), walletInfoCollector[/* network */0]));
            })
        ];
}

var PayoutView = /* module */[/* fromViewModelState */fromViewModelState$1];

function fromViewModelState$2(param) {
  var transactionCollector = param[/* transactionCollector */8];
  var partnersCollector = param[/* partnersCollector */7];
  return /* record */[
          /* ventureId */param[/* ventureId */1],
          /* ventureName */param[/* name */2],
          /* readOnly */ViewModel__PartnersCollector.isPartner(param[/* localUser */0], partnersCollector) === false,
          /* partners */partnersCollector[/* partners */1],
          /* prospects */partnersCollector[/* prospects */2],
          /* removalProspects */partnersCollector[/* removalProspects */3],
          /* transactions : tuple */[
            transactionCollector[/* confirmedTxs */1],
            transactionCollector[/* unconfirmedTxs */2]
          ],
          /* payouts */param[/* payouts */5],
          /* balance */ViewModel__BalanceCollector.accountBalance(WalletTypes.AccountIndex[/* default */9], param[/* balanceCollector */6])
        ];
}

var SelectedVentureView = /* module */[/* fromViewModelState */fromViewModelState$2];

function make(localUser) {
  return /* record */[
          /* localUser */localUser,
          /* ventureId */PrimitiveTypes.VentureId[/* fromString */1](""),
          /* name */"",
          /* processedItems */Belt_SetString.empty,
          /* metaPolicy */Policy.unanimous,
          /* payouts : [] */0,
          /* balanceCollector */ViewModel__BalanceCollector.make(/* () */0),
          /* partnersCollector */ViewModel__PartnersCollector.make(localUser),
          /* transactionCollector */ViewModel__TransactionCollector.make(/* () */0),
          /* walletInfoCollector */WalletInfoCollector.make(/* () */0)
        ];
}

function apply(param, state) {
  var processedItems = state[/* processedItems */3];
  var hash = param[/* hash */1];
  var $$event = param[/* event */0];
  if (Belt_SetString.has(processedItems, hash)) {
    return state;
  } else {
    var state_000 = /* localUser */state[/* localUser */0];
    var state_001 = /* ventureId */state[/* ventureId */1];
    var state_002 = /* name */state[/* name */2];
    var state_003 = /* processedItems */Belt_SetString.add(processedItems, hash);
    var state_004 = /* metaPolicy */state[/* metaPolicy */4];
    var state_005 = /* payouts */state[/* payouts */5];
    var state_006 = /* balanceCollector */ViewModel__BalanceCollector.apply($$event, state[/* balanceCollector */6]);
    var state_007 = /* partnersCollector */ViewModel__PartnersCollector.apply($$event, state[/* partnersCollector */7]);
    var state_008 = /* transactionCollector */ViewModel__TransactionCollector.apply($$event, state[/* transactionCollector */8]);
    var state_009 = /* walletInfoCollector */WalletInfoCollector.apply($$event, state[/* walletInfoCollector */9]);
    var state$1 = /* record */[
      state_000,
      state_001,
      state_002,
      state_003,
      state_004,
      state_005,
      state_006,
      state_007,
      state_008,
      state_009
    ];
    switch ($$event.tag | 0) {
      case 0 : 
          var match = $$event[0];
          return /* record */[
                  state_000,
                  /* ventureId */match[/* ventureId */0],
                  /* name */match[/* ventureName */1],
                  state_003,
                  /* metaPolicy */match[/* metaPolicy */4],
                  state_005,
                  state_006,
                  state_007,
                  state_008,
                  state_009
                ];
      case 21 : 
          var match$1 = $$event[0];
          return /* record */[
                  state_000,
                  state_001,
                  state_002,
                  state_003,
                  state_004,
                  /* payouts : :: */[
                    /* record */[
                      /* processId */match$1[/* processId */0],
                      /* payoutTx */match$1[/* data */6][/* payoutTx */1],
                      /* endorsedBy : :: */[
                        match$1[/* supporterId */4],
                        /* [] */0
                      ],
                      /* rejectedBy : [] */0,
                      /* status : PayoutPending */0
                    ],
                    state_005
                  ],
                  state_006,
                  state_007,
                  state_008,
                  state_009
                ];
      case 22 : 
          var match$2 = $$event[0];
          var rejectorId = match$2[/* rejectorId */1];
          var processId = match$2[/* processId */0];
          return /* record */[
                  state_000,
                  state_001,
                  state_002,
                  state_003,
                  state_004,
                  /* payouts */List.map((function (p) {
                          var match = PrimitiveTypes.ProcessId[/* eq */5](p[/* processId */0], processId);
                          if (match) {
                            return /* record */[
                                    /* processId */p[/* processId */0],
                                    /* payoutTx */p[/* payoutTx */1],
                                    /* endorsedBy */p[/* endorsedBy */2],
                                    /* rejectedBy : :: */[
                                      rejectorId,
                                      p[/* rejectedBy */3]
                                    ],
                                    /* status */p[/* status */4]
                                  ];
                          } else {
                            return p;
                          }
                        }), state_005),
                  state_006,
                  state_007,
                  state_008,
                  state_009
                ];
      case 23 : 
          var match$3 = $$event[0];
          var supporterId = match$3[/* supporterId */1];
          var processId$1 = match$3[/* processId */0];
          return /* record */[
                  state_000,
                  state_001,
                  state_002,
                  state_003,
                  state_004,
                  /* payouts */List.map((function (p) {
                          var match = PrimitiveTypes.ProcessId[/* eq */5](p[/* processId */0], processId$1);
                          if (match) {
                            return /* record */[
                                    /* processId */p[/* processId */0],
                                    /* payoutTx */p[/* payoutTx */1],
                                    /* endorsedBy : :: */[
                                      supporterId,
                                      p[/* endorsedBy */2]
                                    ],
                                    /* rejectedBy */p[/* rejectedBy */3],
                                    /* status */p[/* status */4]
                                  ];
                          } else {
                            return p;
                          }
                        }), state_005),
                  state_006,
                  state_007,
                  state_008,
                  state_009
                ];
      case 26 : 
          var match$4 = $$event[0];
          var txId = match$4[/* txId */1];
          var processId$2 = match$4[/* processId */0];
          return /* record */[
                  state_000,
                  state_001,
                  state_002,
                  state_003,
                  state_004,
                  /* payouts */List.map((function (p) {
                          var match = PrimitiveTypes.ProcessId[/* eq */5](p[/* processId */0], processId$2);
                          if (match) {
                            return /* record */[
                                    /* processId */p[/* processId */0],
                                    /* payoutTx */p[/* payoutTx */1],
                                    /* endorsedBy */p[/* endorsedBy */2],
                                    /* rejectedBy */p[/* rejectedBy */3],
                                    /* status : PayoutCompleted */Block.__(0, [txId])
                                  ];
                          } else {
                            return p;
                          }
                        }), state_005),
                  state_006,
                  state_007,
                  state_008,
                  state_009
                ];
      case 28 : 
          var match$5 = $$event[0];
          var errorMessage = match$5[/* errorMessage */1];
          var processId$3 = match$5[/* processId */0];
          return /* record */[
                  state_000,
                  state_001,
                  state_002,
                  state_003,
                  state_004,
                  /* payouts */List.map((function (p) {
                          var match = PrimitiveTypes.ProcessId[/* eq */5](p[/* processId */0], processId$3);
                          if (match) {
                            return /* record */[
                                    /* processId */p[/* processId */0],
                                    /* payoutTx */p[/* payoutTx */1],
                                    /* endorsedBy */p[/* endorsedBy */2],
                                    /* rejectedBy */p[/* rejectedBy */3],
                                    /* status : PayoutFailed */Block.__(1, [errorMessage])
                                  ];
                          } else {
                            return p;
                          }
                        }), state_005),
                  state_006,
                  state_007,
                  state_008,
                  state_009
                ];
      default:
        return state$1;
    }
  }
}

function init(localUser) {
  return Curry._2(EventLog.reduce, (function (m, item) {
                return apply(item, m);
              }), make(localUser));
}

function applyAll(events, model) {
  return $$Array.fold_left((function (m, item) {
                return apply(item, m);
              }), model, events);
}

var ItemsSet = 0;

var PartnersCollector = 0;

var BalanceCollector = 0;

var TransactionCollector = 0;

var managePartnersModal = fromViewModelState;

var payoutModal = fromViewModelState$1;

var selectedVenture = fromViewModelState$2;

exports.ItemsSet = ItemsSet;
exports.PartnersCollector = PartnersCollector;
exports.BalanceCollector = BalanceCollector;
exports.TransactionCollector = TransactionCollector;
exports.readOnly = readOnly;
exports.ManagePartnersView = ManagePartnersView;
exports.managePartnersModal = managePartnersModal;
exports.PayoutView = PayoutView;
exports.payoutModal = payoutModal;
exports.SelectedVentureView = SelectedVentureView;
exports.selectedVenture = selectedVenture;
exports.make = make;
exports.apply = apply;
exports.init = init;
exports.applyAll = applyAll;
/* BTC Not a pure module */
