// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("../../application/wallet/BTC.bs.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("../../utils/Utils.bs.js");
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
var ViewModel__PartnersCollector = require("./ViewModel__PartnersCollector.bs.js");
var ViewModel__TxDetailsCollector = require("./ViewModel__TxDetailsCollector.bs.js");
var ViewModel__TransactionCollector = require("./ViewModel__TransactionCollector.bs.js");

function readOnly(param) {
  return ViewModel__PartnersCollector.isPartner(param[/* localUser */0], param[/* partnersCollector */6]) === false;
}

function captureResponse(correlationId, response, state) {
  return /* record */[
          /* localUser */state[/* localUser */0],
          /* ventureId */state[/* ventureId */1],
          /* lastResponse : Some */[/* tuple */[
              correlationId,
              response
            ]],
          /* ventureName */state[/* ventureName */3],
          /* processedItems */state[/* processedItems */4],
          /* metaPolicy */state[/* metaPolicy */5],
          /* partnersCollector */state[/* partnersCollector */6],
          /* transactionCollector */state[/* transactionCollector */7],
          /* txDetailsCollector */state[/* txDetailsCollector */8],
          /* walletInfoCollector */state[/* walletInfoCollector */9]
        ];
}

function lastResponse(param) {
  return param[/* lastResponse */2];
}

function fromViewModelState(param) {
  var localUser = param[/* localUser */0];
  return /* record */[
          /* ventureName */param[/* ventureName */3],
          /* localUser */localUser,
          /* partners */param[/* partnersCollector */6][/* partners */1],
          /* joinVentureUrl */window.location.origin + Router.Config[/* routeToUrl */1](/* JoinVenture */Block.__(1, [
                  param[/* ventureId */1],
                  localUser
                ]))
        ];
}

var ManagePartnersView = /* module */[/* fromViewModelState */fromViewModelState];

function fromViewModelState$1(userId, param) {
  return ViewModel__PartnersCollector.getProspect(userId, param[/* partnersCollector */6]);
}

var ViewPartnerView = /* module */[/* fromViewModelState */fromViewModelState$1];

function fromViewModelState$2(param) {
  var walletInfoCollector = param[/* walletInfoCollector */9];
  var localUser = param[/* localUser */0];
  var reserved = WalletInfoCollector.totalReservedBTC(walletInfoCollector);
  var balance_000 = /* currentSpendable */WalletInfoCollector.totalUnusedBTC(walletInfoCollector).minus(reserved);
  var balance = /* record */[
    balance_000,
    /* reserved */reserved
  ];
  var network = WalletInfoCollector.network(walletInfoCollector);
  var allInputs = WalletInfoCollector.unusedInputs(walletInfoCollector);
  var mandatoryInputs = WalletInfoCollector.nonReservedOldInputs(WalletTypes.AccountIndex[/* default */9], localUser, walletInfoCollector);
  return /* record */[
          /* allowCreation */balance_000.gt(BTC.zero),
          /* balance */balance,
          /* ventureId */param[/* ventureId */1],
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
          /* summary */(function (destinations, fee) {
              return PayoutTransaction.summary(network, PayoutTransaction.build(mandatoryInputs, allInputs, destinations, fee, WalletInfoCollector.nextChangeAddress(WalletTypes.AccountIndex[/* default */9], localUser, walletInfoCollector), network));
            })
        ];
}

var CreatePayoutView = /* module */[/* fromViewModelState */fromViewModelState$2];

function fromViewModelState$3(processId, param) {
  var walletInfoCollector = param[/* walletInfoCollector */9];
  return Utils.mapOption((function (payout) {
                return /* record */[
                        /* payout */payout,
                        /* collidesWith */WalletInfoCollector.collidingProcesses(processId, walletInfoCollector)
                      ];
              }), ViewModel__TxDetailsCollector.getPayout(processId, param[/* txDetailsCollector */8]));
}

var ViewPayoutView = /* module */[/* fromViewModelState */fromViewModelState$3];

function fromViewModelState$4(txId, param) {
  return ViewModel__TxDetailsCollector.getIncome(txId, param[/* txDetailsCollector */8]);
}

var ViewIncomeView = /* module */[/* fromViewModelState */fromViewModelState$4];

function fromViewModelState$5(param) {
  var walletInfoCollector = param[/* walletInfoCollector */9];
  var transactionCollector = param[/* transactionCollector */7];
  var partnersCollector = param[/* partnersCollector */6];
  var reserved = WalletInfoCollector.totalReservedBTC(walletInfoCollector);
  var balance_000 = /* currentSpendable */WalletInfoCollector.totalUnusedBTC(walletInfoCollector).minus(reserved);
  var balance = /* record */[
    balance_000,
    /* reserved */reserved
  ];
  return /* record */[
          /* ventureId */param[/* ventureId */1],
          /* ventureName */param[/* ventureName */3],
          /* readOnly */ViewModel__PartnersCollector.isPartner(param[/* localUser */0], partnersCollector) === false,
          /* partners */partnersCollector[/* partners */1],
          /* prospects */ViewModel__PartnersCollector.prospectsPendingApproval(partnersCollector),
          /* unconfirmedTxs */transactionCollector[/* unconfirmedTxs */2],
          /* confirmedTxs */transactionCollector[/* confirmedTxs */3],
          /* payoutsPendingApproval */ViewModel__TxDetailsCollector.payoutsPendingApproval(param[/* txDetailsCollector */8]),
          /* balance */balance
        ];
}

var SelectedVentureView = /* module */[/* fromViewModelState */fromViewModelState$5];

function make(localUser) {
  return /* record */[
          /* localUser */localUser,
          /* ventureId */PrimitiveTypes.VentureId[/* fromString */1](""),
          /* lastResponse : None */0,
          /* ventureName */"",
          /* processedItems */Belt_SetString.empty,
          /* metaPolicy */Policy.unanimous,
          /* partnersCollector */ViewModel__PartnersCollector.make(localUser),
          /* transactionCollector */ViewModel__TransactionCollector.make(/* () */0),
          /* txDetailsCollector */ViewModel__TxDetailsCollector.make(localUser),
          /* walletInfoCollector */WalletInfoCollector.make(/* () */0)
        ];
}

function apply(param, state) {
  var processedItems = state[/* processedItems */4];
  var hash = param[/* hash */1];
  var $$event = param[/* event */0];
  if (Belt_SetString.has(processedItems, hash)) {
    return state;
  } else {
    var state_000 = /* localUser */state[/* localUser */0];
    var state_001 = /* ventureId */state[/* ventureId */1];
    var state_002 = /* lastResponse */state[/* lastResponse */2];
    var state_003 = /* ventureName */state[/* ventureName */3];
    var state_004 = /* processedItems */Belt_SetString.add(processedItems, hash);
    var state_005 = /* metaPolicy */state[/* metaPolicy */5];
    var state_006 = /* partnersCollector */ViewModel__PartnersCollector.apply($$event, state[/* partnersCollector */6]);
    var state_007 = /* transactionCollector */ViewModel__TransactionCollector.apply($$event, state[/* transactionCollector */7]);
    var state_008 = /* txDetailsCollector */ViewModel__TxDetailsCollector.apply($$event, state[/* txDetailsCollector */8]);
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
    if ($$event.tag) {
      return state$1;
    } else {
      var match = $$event[0];
      return /* record */[
              state_000,
              /* ventureId */match[/* ventureId */0],
              state_002,
              /* ventureName */match[/* ventureName */1],
              state_004,
              /* metaPolicy */match[/* metaPolicy */4],
              state_006,
              state_007,
              state_008,
              state_009
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

var managePartnersModal = fromViewModelState;

var viewPartnerModal = fromViewModelState$1;

var createPayoutModal = fromViewModelState$2;

var viewPayoutModal = fromViewModelState$3;

var viewIncomeModal = fromViewModelState$4;

var selectedVenture = fromViewModelState$5;

exports.ItemsSet = ItemsSet;
exports.PartnersCollector = PartnersCollector;
exports.TransactionCollector = TransactionCollector;
exports.TxDetailsCollector = TxDetailsCollector;
exports.readOnly = readOnly;
exports.captureResponse = captureResponse;
exports.lastResponse = lastResponse;
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
/* BTC Not a pure module */
