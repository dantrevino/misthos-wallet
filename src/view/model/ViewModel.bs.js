// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("../../application/wallet/BTC.bs.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("../../utils/Utils.bs.js");
var Ledger = require("../../application/wallet/Ledger.bs.js");
var Router = require("../Router.bs.js");
var Network = require("../../application/wallet/Network.bs.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var EventLog = require("../../application/events/EventLog.bs.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Environment = require("../../web/Environment.bs.js");
var WalletTypes = require("../../application/wallet/WalletTypes.bs.js");
var NetworkClient = require("../../application/wallet/NetworkClient.bs.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var Belt_MapString = require("bs-platform/lib/js/belt_MapString.js");
var Belt_SetString = require("bs-platform/lib/js/belt_SetString.js");
var PrimitiveTypes = require("../../application/PrimitiveTypes.bs.js");
var AccountSettings = require("../../application/wallet/AccountSettings.bs.js");
var PayoutTransaction = require("../../application/wallet/PayoutTransaction.bs.js");
var LedgerInfoCollector = require("./LedgerInfoCollector.bs.js");
var WalletInfoCollector = require("../../application/wallet/WalletInfoCollector.bs.js");
var ViewModel__PartnersCollector = require("./ViewModel__PartnersCollector.bs.js");
var ViewModel__TxDetailsCollector = require("./ViewModel__TxDetailsCollector.bs.js");
var ViewModel__OldTxInputCollector = require("./ViewModel__OldTxInputCollector.bs.js");
var ViewModel__TransactionCollector = require("./ViewModel__TransactionCollector.bs.js");

function readOnly(param) {
  return ViewModel__PartnersCollector.isPartner(param[/* localUser */0], param[/* partnersCollector */6]) === false;
}

function captureResponse(correlationId, response, state) {
  return /* record */[
          /* localUser */state[/* localUser */0],
          /* ventureId */state[/* ventureId */1],
          /* lastResponse *//* tuple */[
            correlationId,
            response
          ],
          /* ventureName */state[/* ventureName */3],
          /* defaultAccountSettings */state[/* defaultAccountSettings */4],
          /* processedItems */state[/* processedItems */5],
          /* partnersCollector */state[/* partnersCollector */6],
          /* transactionCollector */state[/* transactionCollector */7],
          /* txDetailsCollector */state[/* txDetailsCollector */8],
          /* oldInputCollector */state[/* oldInputCollector */9],
          /* walletInfoCollector */state[/* walletInfoCollector */10],
          /* ledgerInfoCollector */state[/* ledgerInfoCollector */11]
        ];
}

function lastResponse(param) {
  return param[/* lastResponse */2];
}

function fromViewModel(param) {
  var ledgerInfoCollector = param[/* ledgerInfoCollector */11];
  var walletInfoCollector = param[/* walletInfoCollector */10];
  var ventureId = param[/* ventureId */1];
  return /* record */[
          /* ledgerId */LedgerInfoCollector.ledgerId(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector),
          /* ledgerUpToDate */LedgerInfoCollector.ledgerUpToDate(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector),
          /* getCustodianKeyChain */(function () {
              return Ledger.getCustodianKeyChain(WalletInfoCollector.network(walletInfoCollector), ventureId, LedgerInfoCollector.ledgerId(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector), WalletTypes.AccountIndex[/* default */11], LedgerInfoCollector.nextKeyChainIdx(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector));
            }),
          /* accountSettings */param[/* defaultAccountSettings */4]
        ];
}

var VentureSettingsView = /* module */[/* fromViewModel */fromViewModel];

function fromViewModelState(param) {
  var walletInfoCollector = param[/* walletInfoCollector */10];
  var oldInputCollector = param[/* oldInputCollector */9];
  var txDetailsCollector = param[/* txDetailsCollector */8];
  var partnersCollector = param[/* partnersCollector */6];
  var ventureId = param[/* ventureId */1];
  var infos = WalletInfoCollector.addressInfos(WalletTypes.AccountIndex[/* default */11], walletInfoCollector);
  return /* record */[
          /* infos */infos,
          /* ventureId */ventureId,
          /* atRiskWarning */Belt_List.reduceU(infos, false, (function (res, param) {
                  if (param[/* addressStatus */5] !== 1) {
                    return res;
                  } else if (res) {
                    return true;
                  } else {
                    return param[/* balance */6].gt(BTC.zero);
                  }
                })),
          /* addressDetails */(function (addressInfo) {
              return /* record */[
                      /* custodians */addressInfo[/* custodians */1],
                      /* usingHardwareKey */addressInfo[/* usingHardwareKey */2],
                      /* nCoSigners */addressInfo[/* nCoSigners */4],
                      /* nCustodians */Belt_Set.size(addressInfo[/* custodians */1]),
                      /* addressType */addressInfo[/* addressType */0],
                      /* addressStatus */addressInfo[/* addressStatus */5],
                      /* unspentIncome */Belt_List.mapU(WalletInfoCollector.inputsFor(WalletTypes.AccountIndex[/* default */11], addressInfo, walletInfoCollector), (function (param) {
                              var txId = param[/* txId */0];
                              var match = ViewModel__TxDetailsCollector.getDateAndStatus(txId, txDetailsCollector);
                              var match$1 = addressInfo[/* addressType */0];
                              var detailsLink = match$1 ? /* Venture */Block.__(0, [
                                    ventureId,
                                    /* Income */Block.__(2, [txId])
                                  ]) : /* Venture */Block.__(0, [
                                    ventureId,
                                    /* Payout */Block.__(1, [ViewModel__TxDetailsCollector.getProcessIdForTx(txId, txDetailsCollector)])
                                  ]);
                              return /* record */[
                                      /* status */match[1],
                                      /* unlocked */param[/* unlocked */8],
                                      /* date */match[0],
                                      /* txId */txId,
                                      /* amount */param[/* value */3],
                                      /* detailsLink */detailsLink
                                    ];
                            })),
                      /* spentIncome */Belt_List.mapU(ViewModel__OldTxInputCollector.inputsFor(addressInfo[/* address */3], oldInputCollector), (function (param) {
                              var txId = param[/* txId */0];
                              var match = ViewModel__TxDetailsCollector.getDateAndStatus(txId, txDetailsCollector);
                              var match$1 = addressInfo[/* addressType */0];
                              var detailsLink = match$1 ? /* Venture */Block.__(0, [
                                    ventureId,
                                    /* Income */Block.__(2, [txId])
                                  ]) : /* Venture */Block.__(0, [
                                    ventureId,
                                    /* Payout */Block.__(1, [ViewModel__TxDetailsCollector.getProcessIdForTx(txId, txDetailsCollector)])
                                  ]);
                              return /* record */[
                                      /* status */match[1],
                                      /* unlocked */param[/* unlocked */8],
                                      /* date */match[0],
                                      /* txId */txId,
                                      /* amount */param[/* value */3],
                                      /* detailsLink */detailsLink
                                    ];
                            })),
                      /* isPartner */(function (id) {
                          return ViewModel__PartnersCollector.isPartner(id, partnersCollector);
                        })
                    ];
            })
        ];
}

var AddressesView = /* module */[/* fromViewModelState */fromViewModelState];

function fromViewModelState$1(param) {
  var infos = WalletInfoCollector.addressInfos(WalletTypes.AccountIndex[/* default */11], param[/* walletInfoCollector */10]);
  return /* record */[
          /* ventureName */param[/* ventureName */3],
          /* partners */param[/* partnersCollector */6][/* partners */1],
          /* alertPartners */Belt_List.reduceU(infos, PrimitiveTypes.UserId[/* emptySet */9], (function (res, param) {
                  var addressStatus = param[/* addressStatus */5];
                  var exit = 0;
                  if (addressStatus !== 1 && addressStatus !== 3) {
                    return res;
                  } else {
                    exit = 1;
                  }
                  if (exit === 1) {
                    if (param[/* balance */6].gt(BTC.zero)) {
                      return Belt_Set.union(res, param[/* custodians */1]);
                    } else {
                      return res;
                    }
                  }
                  
                }))
        ];
}

var ManagePartnersView = /* module */[/* fromViewModelState */fromViewModelState$1];

var environment = Environment.get(/* () */0);

function fromViewModelState$2(processId, param) {
  var walletInfoCollector = param[/* walletInfoCollector */10];
  var partnersCollector = param[/* partnersCollector */6];
  var ventureName = param[/* ventureName */3];
  var ventureId = param[/* ventureId */1];
  var localUser = param[/* localUser */0];
  return Utils.mapOption((function (partnerProcess) {
                var match = partnerProcess[/* data */5][/* processType */1];
                return /* record */[
                        /* localUser */localUser,
                        /* ventureName */ventureName,
                        /* partnerProcess */partnerProcess,
                        /* currentPartners */ViewModel__PartnersCollector.currentPartners(partnersCollector),
                        /* atRiskWarning */match ? false : Belt_List.reduceU(WalletInfoCollector.addressInfos(WalletTypes.AccountIndex[/* default */11], walletInfoCollector), false, (function (res, param) {
                                  var addressStatus = param[/* addressStatus */5];
                                  var exit = 0;
                                  if (addressStatus !== 1 && addressStatus !== 3) {
                                    return res;
                                  } else {
                                    exit = 1;
                                  }
                                  if (exit === 1) {
                                    if (res) {
                                      return true;
                                    } else {
                                      return Belt_Set.has(param[/* custodians */1], partnerProcess[/* data */5][/* userId */0]);
                                    }
                                  }
                                  
                                })),
                        /* joinVentureUrl */environment[/* appDomain */2] + Router.Config[/* routeToUrl */1](/* JoinVenture */Block.__(1, [
                                ventureId,
                                localUser
                              ])),
                        /* webDomain */environment[/* webDomain */3]
                      ];
              }), ViewModel__PartnersCollector.getPartnerProcess(processId, partnersCollector));
}

var ViewPartnerView = /* module */[
  /* environment */environment,
  /* fromViewModelState */fromViewModelState$2
];

function fromViewModelState$3(param) {
  var ledgerInfoCollector = param[/* ledgerInfoCollector */11];
  var walletInfoCollector = param[/* walletInfoCollector */10];
  var ventureId = param[/* ventureId */1];
  var localUser = param[/* localUser */0];
  var reserved = WalletInfoCollector.totalReservedBTC(WalletTypes.AccountIndex[/* default */11], walletInfoCollector);
  var balance_000 = /* currentSpendable */WalletInfoCollector.totalUnusedBTC(WalletTypes.AccountIndex[/* default */11], walletInfoCollector).minus(reserved);
  var balance = /* record */[
    balance_000,
    /* reserved */reserved
  ];
  var network = WalletInfoCollector.network(walletInfoCollector);
  var optionalInputs = WalletInfoCollector.currentSpendableInputs(WalletTypes.AccountIndex[/* default */11], walletInfoCollector);
  var mandatoryInputs = WalletInfoCollector.oldSpendableInputs(WalletTypes.AccountIndex[/* default */11], walletInfoCollector);
  var unlockedInputs = WalletInfoCollector.unlockedInputs(WalletTypes.AccountIndex[/* default */11], walletInfoCollector);
  var allInputs = Belt_Set.union(Belt_Set.union(optionalInputs, mandatoryInputs), unlockedInputs);
  var changeAddress = WalletInfoCollector.nextChangeAddress(WalletTypes.AccountIndex[/* default */11], localUser, walletInfoCollector);
  return /* record */[
          /* allowCreation */balance_000.gt(BTC.zero),
          /* balance */balance,
          /* ventureId */ventureId,
          /* ventureName */param[/* ventureName */3],
          /* initialSummary : record */[
            /* reserved */BTC.zero,
            /* destinations : [] */0,
            /* spentWithFees */BTC.zero,
            /* misthosFee */BTC.zero,
            /* networkFee */BTC.zero
          ],
          /* isAddressValid */(function (address) {
              try {
                BitcoinjsLib.address.toOutputScript(address, Network.bitcoinNetwork(network));
                return true;
              }
              catch (exn){
                return false;
              }
            }),
          /* max */(function (targetDestination, destinations, fee) {
              return PayoutTransaction.max(allInputs, targetDestination, destinations, fee, network);
            }),
          /* summary */(function (param) {
              return PayoutTransaction.summary(network, param);
            }),
          /* createPayoutTx */(function (destinations, fee) {
              return PayoutTransaction.build(optionalInputs, mandatoryInputs, unlockedInputs, destinations, fee, changeAddress, network);
            }),
          /* requiresLedgerSig */Js_option.isSome(LedgerInfoCollector.ledgerId(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector)),
          /* collectInputHexs */(function (knownHexs, param) {
              var usedInputs = param[/* usedInputs */1];
              var inputs = Belt_SetString.fromArray(Belt_Array.mapU(usedInputs, (function (param) {
                          return param[/* txId */0];
                        })));
              var knownIds = Belt_SetString.fromArray(Belt_MapString.keysToArray(knownHexs));
              return Curry._1(NetworkClient.transactionHex(network), Belt_SetString.toArray(Belt_SetString.diff(inputs, knownIds))).then((function (txs) {
                            var knownHexs$1 = Belt_MapString.mergeMany(knownHexs, txs);
                            return Promise.resolve(/* tuple */[
                                        knownHexs$1,
                                        Belt_Array.mapU(usedInputs, (function (param) {
                                                return Js_option.getWithDefault("", Belt_MapString.get(knownHexs$1, param[/* txId */0]));
                                              }))
                                      ]);
                          }));
            }),
          /* signPayoutTx */(function (payoutTx, txHexs) {
              return Ledger.signPayout(ventureId, localUser, Js_option.getWithDefault("", LedgerInfoCollector.ledgerId(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector)), payoutTx, txHexs, WalletInfoCollector.accountKeyChains(walletInfoCollector));
            })
        ];
}

var CreatePayoutView = /* module */[/* fromViewModelState */fromViewModelState$3];

function fromViewModelState$4(processId, param) {
  var ledgerInfoCollector = param[/* ledgerInfoCollector */11];
  var walletInfoCollector = param[/* walletInfoCollector */10];
  var partnersCollector = param[/* partnersCollector */6];
  var ventureId = param[/* ventureId */1];
  var localUser = param[/* localUser */0];
  return Utils.mapOption((function (payout) {
                var payoutTx = payout[/* data */5][/* payoutTx */1];
                var txHexPromise = Curry._1(NetworkClient.transactionHex(WalletInfoCollector.network(walletInfoCollector)), Belt_Array.mapU(payoutTx[/* usedInputs */1], (function (param) {
                            return param[/* txId */0];
                          })));
                return /* record */[
                        /* requiresLedgerSig */Js_option.isSome(LedgerInfoCollector.ledgerId(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector)),
                        /* currentPartners */ViewModel__PartnersCollector.currentPartners(partnersCollector),
                        /* payout */payout,
                        /* collidesWith */WalletInfoCollector.collidingProcesses(WalletTypes.AccountIndex[/* default */11], processId, walletInfoCollector),
                        /* signPayout */(function () {
                            return txHexPromise.then((function (txHexs) {
                                          return Ledger.signPayout(ventureId, localUser, Js_option.getWithDefault("", LedgerInfoCollector.ledgerId(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector)), payoutTx, Belt_Array.map(txHexs, (function (prim) {
                                                            return prim[1];
                                                          })), WalletInfoCollector.accountKeyChains(walletInfoCollector));
                                        }));
                          })
                      ];
              }), ViewModel__TxDetailsCollector.getPayout(processId, param[/* txDetailsCollector */8]));
}

var ViewPayoutView = /* module */[/* fromViewModelState */fromViewModelState$4];

function fromViewModelState$5(txId, param) {
  return ViewModel__TxDetailsCollector.getIncome(txId, param[/* txDetailsCollector */8]);
}

var ViewIncomeView = /* module */[/* fromViewModelState */fromViewModelState$5];

function fromViewModelState$6(param) {
  var ledgerInfoCollector = param[/* ledgerInfoCollector */11];
  var walletInfoCollector = param[/* walletInfoCollector */10];
  var transactionCollector = param[/* transactionCollector */7];
  var partnersCollector = param[/* partnersCollector */6];
  var reserved = WalletInfoCollector.totalReservedBTC(WalletTypes.AccountIndex[/* default */11], walletInfoCollector);
  var balance_000 = /* currentSpendable */WalletInfoCollector.totalUnusedBTC(WalletTypes.AccountIndex[/* default */11], walletInfoCollector).minus(reserved);
  var balance = /* record */[
    balance_000,
    /* reserved */reserved
  ];
  var match = ViewModel__PartnersCollector.processesPendingApproval(partnersCollector);
  return /* record */[
          /* ventureId */param[/* ventureId */1],
          /* atRiskWarning */Belt_List.reduceU(WalletInfoCollector.addressInfos(WalletTypes.AccountIndex[/* default */11], walletInfoCollector), false, (function (res, param) {
                  if (param[/* addressStatus */5] !== 1) {
                    return res;
                  } else if (res) {
                    return true;
                  } else {
                    return param[/* balance */6].gt(BTC.zero);
                  }
                })),
          /* keyRotationWarning */Js_option.isSome(LedgerInfoCollector.ledgerId(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector)) && !LedgerInfoCollector.ledgerUpToDate(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector),
          /* ventureName */param[/* ventureName */3],
          /* readOnly */ViewModel__PartnersCollector.isPartner(param[/* localUser */0], partnersCollector) === false,
          /* partners */partnersCollector[/* partners */1],
          /* ledgerBacked */LedgerInfoCollector.ledgerConnected(WalletTypes.AccountIndex[/* default */11], ledgerInfoCollector),
          /* proposedAdditions */match[0],
          /* proposedRemovals */match[1],
          /* unconfirmedTxs */transactionCollector[/* unconfirmedTxs */2],
          /* confirmedTxs */transactionCollector[/* confirmedTxs */3],
          /* payoutsPendingBroadcast */ViewModel__TxDetailsCollector.payoutsPendingBroadcast(param[/* txDetailsCollector */8]),
          /* balance */balance
        ];
}

var SelectedVentureView = /* module */[/* fromViewModelState */fromViewModelState$6];

function make(localUser) {
  return /* record */[
          /* localUser */localUser,
          /* ventureId */PrimitiveTypes.VentureId[/* fromString */1](""),
          /* lastResponse */undefined,
          /* ventureName */"",
          /* defaultAccountSettings */AccountSettings.$$default,
          /* processedItems */Belt_SetString.empty,
          /* partnersCollector */ViewModel__PartnersCollector.make(localUser),
          /* transactionCollector */ViewModel__TransactionCollector.make(/* () */0),
          /* txDetailsCollector */ViewModel__TxDetailsCollector.make(localUser),
          /* oldInputCollector */ViewModel__OldTxInputCollector.make(/* () */0),
          /* walletInfoCollector */WalletInfoCollector.make(/* () */0),
          /* ledgerInfoCollector */LedgerInfoCollector.make(localUser)
        ];
}

function apply(param, state) {
  var processedItems = state[/* processedItems */5];
  var hash = param[/* hash */1];
  var $$event = param[/* event */0];
  if (Belt_SetString.has(processedItems, hash)) {
    return state;
  } else {
    var state_000 = /* localUser */state[/* localUser */0];
    var state_001 = /* ventureId */state[/* ventureId */1];
    var state_002 = /* lastResponse */state[/* lastResponse */2];
    var state_003 = /* ventureName */state[/* ventureName */3];
    var state_004 = /* defaultAccountSettings */state[/* defaultAccountSettings */4];
    var state_005 = /* processedItems */Belt_SetString.add(processedItems, hash);
    var state_006 = /* partnersCollector */ViewModel__PartnersCollector.apply($$event, state[/* partnersCollector */6]);
    var state_007 = /* transactionCollector */ViewModel__TransactionCollector.apply($$event, state[/* transactionCollector */7]);
    var state_008 = /* txDetailsCollector */ViewModel__TxDetailsCollector.apply($$event, state[/* txDetailsCollector */8]);
    var state_009 = /* oldInputCollector */ViewModel__OldTxInputCollector.apply($$event, state[/* oldInputCollector */9]);
    var state_010 = /* walletInfoCollector */WalletInfoCollector.apply($$event, state[/* walletInfoCollector */10]);
    var state_011 = /* ledgerInfoCollector */LedgerInfoCollector.apply($$event, state[/* ledgerInfoCollector */11]);
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
      state_009,
      state_010,
      state_011
    ];
    if ($$event.tag) {
      return state$1;
    } else {
      var match = $$event[0];
      return /* record */[
              state_000,
              /* ventureId */match[/* ventureId */0],
              state_002,
              /* ventureName */match[/* ventureName */1],
              /* defaultAccountSettings */Js_option.getWithDefault(AccountSettings.$$default, match[/* defaultAccountSettings */4]),
              state_005,
              state_006,
              state_007,
              state_008,
              state_009,
              state_010,
              state_011
            ];
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

var TransactionCollector = 0;

var TxDetailsCollector = 0;

var OldInputCollector = 0;

var ventureSettingsView = fromViewModel;

var viewAddressesModal = fromViewModelState;

var managePartnersModal = fromViewModelState$1;

var viewPartnerModal = fromViewModelState$2;

var createPayoutModal = fromViewModelState$3;

var viewPayoutModal = fromViewModelState$4;

var viewIncomeModal = fromViewModelState$5;

var selectedVenture = fromViewModelState$6;

exports.ItemsSet = ItemsSet;
exports.PartnersCollector = PartnersCollector;
exports.TransactionCollector = TransactionCollector;
exports.TxDetailsCollector = TxDetailsCollector;
exports.OldInputCollector = OldInputCollector;
exports.readOnly = readOnly;
exports.captureResponse = captureResponse;
exports.lastResponse = lastResponse;
exports.VentureSettingsView = VentureSettingsView;
exports.ventureSettingsView = ventureSettingsView;
exports.AddressesView = AddressesView;
exports.viewAddressesModal = viewAddressesModal;
exports.ManagePartnersView = ManagePartnersView;
exports.managePartnersModal = managePartnersModal;
exports.ViewPartnerView = ViewPartnerView;
exports.viewPartnerModal = viewPartnerModal;
exports.CreatePayoutView = CreatePayoutView;
exports.createPayoutModal = createPayoutModal;
exports.ViewPayoutView = ViewPayoutView;
exports.viewPayoutModal = viewPayoutModal;
exports.ViewIncomeView = ViewIncomeView;
exports.viewIncomeModal = viewIncomeModal;
exports.SelectedVentureView = SelectedVentureView;
exports.selectedVenture = selectedVenture;
exports.make = make;
exports.apply = apply;
exports.init = init;
exports.applyAll = applyAll;
/* environment Not a pure module */
