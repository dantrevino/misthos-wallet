// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Event = require("../application/events/Event.bs.js");
var Utils = require("../utils/Utils.bs.js");
var Network = require("../application/wallet/Network.bs.js");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var EventLog = require("../application/events/EventLog.bs.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var WorkerUtils = require("./WorkerUtils.bs.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var Belt_MapString = require("bs-platform/lib/js/belt_MapString.js");
var Belt_SetString = require("bs-platform/lib/js/belt_SetString.js");
var PrimitiveTypes = require("../application/PrimitiveTypes.bs.js");
var AddressCollector = require("../application/wallet/AddressCollector.bs.js");
var WalletInfoCollector = require("../application/wallet/WalletInfoCollector.bs.js");
var TransactionCollector = require("../application/wallet/TransactionCollector.bs.js");
var VentureWorkerMessage = require("./VentureWorkerMessage.bs.js");

function postMessage$1(msg) {
  postMessage({
        payload: VentureWorkerMessage.encodeIncoming(msg),
        correlationId: ""
      });
  return /* () */0;
}

var logLabel = "[Wallet Sync]";

function logMessage(param) {
  return WorkerUtils.logMessage(logLabel, param);
}

function catchAndLogError(param) {
  return WorkerUtils.catchAndLogError(logLabel, param);
}

function notifyOfUnlockedInputs(ventureId, blockHeight, param, walletInfo) {
  var confirmedTransactions = param[/* confirmedTransactions */4];
  var events = Belt_Set.reduceU(WalletInfoCollector.temporarilyInaccessibleInputs(walletInfo), /* [] */0, (function (res, input) {
          var sequence = input[/* sequence */7];
          var match = Belt_MapString.get(confirmedTransactions, input[/* txId */0]);
          if (sequence && match && blockHeight > (sequence[0] + (match[0] | 0) | 0)) {
            return /* :: */[
                    Curry._1(Event.Income[/* Unlocked */2][/* make */0], /* record */[
                          /* txId */input[/* txId */0],
                          /* txOutputN */input[/* txOutputN */1],
                          /* address */input[/* address */2],
                          /* value */input[/* value */3],
                          /* nCoSigners */input[/* nCoSigners */4],
                          /* nPubKeys */input[/* nPubKeys */5],
                          /* coordinates */input[/* coordinates */6],
                          /* sequence */input[/* sequence */7],
                          /* unlocked */true
                        ]),
                    res
                  ];
          } else {
            return res;
          }
        }));
  if (events) {
    return postMessage$1(/* SyncWallet */Block.__(15, [
                  ventureId,
                  /* [] */0,
                  /* [] */0,
                  /* [] */0,
                  events,
                  /* [] */0
                ]));
  } else {
    return /* () */0;
  }
}

function broadcastPayouts(param) {
  var ventureId = param[/* ventureId */1];
  var network = param[/* network */0];
  return Belt_Map.forEachU(param[/* notYetBroadcastPayouts */5], (function (processId, param) {
                var txId = param[/* txId */1];
                return catchAndLogError(Curry._1(Network.broadcastTransaction(network), BitcoinjsLib.Transaction.fromHex(param[/* payoutTx */2][/* txHex */0])).then((function (result) {
                                  var tmp;
                                  if (typeof result === "number") {
                                    tmp = postMessage$1(/* SyncWallet */Block.__(15, [
                                            ventureId,
                                            /* :: */[
                                              Curry._2(Event.Payout[/* Broadcast */11][/* make */0], processId, txId),
                                              /* [] */0
                                            ],
                                            /* [] */0,
                                            /* [] */0,
                                            /* [] */0,
                                            /* [] */0
                                          ]));
                                  } else {
                                    switch (result.tag | 0) {
                                      case 0 : 
                                          tmp = postMessage$1(/* SyncWallet */Block.__(15, [
                                                  ventureId,
                                                  /* :: */[
                                                    Curry._2(Event.Payout[/* Broadcast */11][/* make */0], processId, result[0]),
                                                    /* [] */0
                                                  ],
                                                  /* [] */0,
                                                  /* [] */0,
                                                  /* [] */0,
                                                  /* [] */0
                                                ]));
                                          break;
                                      case 1 : 
                                          var errorMessage = result[0];
                                          Utils.printError("Broadcasting transaction failed", errorMessage);
                                          tmp = postMessage$1(/* SyncWallet */Block.__(15, [
                                                  ventureId,
                                                  /* [] */0,
                                                  /* :: */[
                                                    Curry._2(Event.Payout[/* BroadcastFailed */13][/* make */0], processId, errorMessage),
                                                    /* [] */0
                                                  ],
                                                  /* [] */0,
                                                  /* [] */0,
                                                  /* [] */0
                                                ]));
                                          break;
                                      case 2 : 
                                          tmp = /* () */0;
                                          break;
                                      
                                    }
                                  }
                                  return Promise.resolve(tmp);
                                })));
              }));
}

function make() {
  return /* record */[
          /* addresses */AddressCollector.make(/* () */0),
          /* transactions */TransactionCollector.make(/* () */0),
          /* walletInfo */WalletInfoCollector.make(/* () */0)
        ];
}

function scanTransactions(collector) {
  var transactions = collector[/* transactions */1];
  var addresses = collector[/* addresses */0];
  return Promise.all(/* tuple */[
                Network.transactionInputs(addresses[/* network */0])(addresses[/* exposedAddresses */2]),
                Curry._1(Network.currentBlockHeight(addresses[/* network */0]), /* () */0)
              ]).then((function (param) {
                var blockHeight = param[1];
                var utxos = param[0];
                return Curry._1(Network.transactionInfo(addresses[/* network */0]), Belt_SetString.diff(Belt_SetString.mergeMany(transactions[/* transactionsOfInterest */2], Belt_List.toArray(Belt_List.mapU(utxos, (function (param) {
                                                return param[/* txId */0];
                                              })))), Belt_SetString.mergeMany(Belt_SetString.empty, Belt_MapString.keysToArray(transactions[/* confirmedTransactions */4])))).then((function (txInfos) {
                              return Promise.resolve(/* tuple */[
                                          utxos,
                                          txInfos,
                                          blockHeight,
                                          collector
                                        ]);
                            }));
              }));
}

function collectData(log) {
  return Curry._3(EventLog.reduce, (function (param, param$1) {
                var $$event = param$1[/* event */0];
                return /* record */[
                        /* addresses */AddressCollector.apply($$event, param[/* addresses */0]),
                        /* transactions */TransactionCollector.apply($$event, param[/* transactions */1]),
                        /* walletInfo */WalletInfoCollector.apply($$event, param[/* walletInfo */2])
                      ];
              }), make(/* () */0), log);
}

function filterUTXOs(knownTxs, utxos) {
  return Belt_List.keepMapU(utxos, (function (utxo) {
                var match = Belt_SetString.has(knownTxs, utxo[/* txId */0]);
                if (match) {
                  return /* None */0;
                } else {
                  return /* Some */[utxo];
                }
              }));
}

function detectIncomeFromVenture(ventureId, eventLog) {
  logMessage("Sychronizing wallet state for venture '" + (PrimitiveTypes.VentureId[/* toString */0](ventureId) + "'"));
  return scanTransactions(collectData(eventLog)).then((function (param) {
                var match = param[3];
                var transactions = match[/* transactions */1];
                notifyOfUnlockedInputs(ventureId, param[2], transactions, match[/* walletInfo */2]);
                broadcastPayouts(transactions);
                var utxos = filterUTXOs(transactions[/* knownIncomeTxs */3], param[0]);
                var events = Belt_List.mapU(utxos, (function (utxo) {
                        return Curry._5(Event.Income[/* Detected */1][/* make */0], utxo[/* txOutputN */1], utxo[/* coordinates */6], utxo[/* address */2], utxo[/* txId */0], utxo[/* value */3]);
                      }));
                var match$1 = Belt_List.keepMapU(param[1], (function (param) {
                        var unixTime = param[/* unixTime */2];
                        var blockHeight = param[/* blockHeight */1];
                        if (blockHeight && unixTime) {
                          return /* Some */[Curry._3(Event.Transaction[/* Confirmed */0][/* make */0], param[/* txId */0], blockHeight[0], unixTime[0])];
                        } else {
                          return /* None */0;
                        }
                      }));
                var tmp;
                var exit = 0;
                if (events || match$1) {
                  exit = 1;
                } else {
                  tmp = /* () */0;
                }
                if (exit === 1) {
                  tmp = postMessage$1(/* SyncWallet */Block.__(15, [
                          ventureId,
                          /* [] */0,
                          /* [] */0,
                          events,
                          /* [] */0,
                          match$1
                        ]));
                }
                return Promise.resolve(tmp);
              }));
}

function syncWallets(ventures) {
  return Belt_Map.forEachU(ventures, (function (id, log) {
                return catchAndLogError(detectIncomeFromVenture(id, log));
              }));
}

exports.postMessage = postMessage$1;
exports.logLabel = logLabel;
exports.logMessage = logMessage;
exports.catchAndLogError = catchAndLogError;
exports.notifyOfUnlockedInputs = notifyOfUnlockedInputs;
exports.broadcastPayouts = broadcastPayouts;
exports.make = make;
exports.scanTransactions = scanTransactions;
exports.collectData = collectData;
exports.filterUTXOs = filterUTXOs;
exports.detectIncomeFromVenture = detectIncomeFromVenture;
exports.syncWallets = syncWallets;
/* Event Not a pure module */
