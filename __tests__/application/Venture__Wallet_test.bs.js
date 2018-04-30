// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("../../src/application/wallet/BTC.bs.js");
var Jest = require("@glennsl/bs-jest/src/jest.js");
var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Event = require("../../src/application/events/Event.bs.js");
var Utils = require("../../src/utils/Utils.bs.js");
var Policy = require("../../src/application/Policy.bs.js");
var Helpers = require("../helpers/Helpers.bs.js");
var WalletTypes = require("../../src/application/wallet/WalletTypes.bs.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var PrimitiveTypes = require("../../src/application/PrimitiveTypes.bs.js");
var AccountKeyChain = require("../../src/application/wallet/AccountKeyChain.bs.js");
var Venture__Wallet = require("../../src/application/Venture__Wallet.bs.js");
var CustodianKeyChain = require("../../src/application/wallet/CustodianKeyChain.bs.js");
var PayoutTransaction = require("../../src/application/wallet/PayoutTransaction.bs.js");

Helpers.enableHttpRequests(/* () */0);

describe("interation", (function () {
        var userA = PrimitiveTypes.UserId[/* fromString */1]("userA");
        var userB = PrimitiveTypes.UserId[/* fromString */1]("userB");
        var keyA = BitcoinjsLib.ECPair.fromWIF("cUVTgxrs44T7zVon5dSDicBkBRjyfLwL7RF1RvR7n94ar3HEaLs1", BitcoinjsLib.networks.testnet);
        var keyB = BitcoinjsLib.ECPair.fromWIF("cPfdeLvhwvAVRRM5wiEWopWviGG65gbxQCHdtFL56PYUJXsTYixf", BitcoinjsLib.networks.testnet);
        var createdEvent = Event.VentureCreated[/* make */0]("test", userA, Utils.publicKeyFromKeyPair(keyA), Policy.absolute, /* Regtest */0);
        var chainCode = Utils.bufFromHex("c8bce5e6dac6f931af17863878cce2ca3b704c61b3d775fe56881cc8ff3ab1cb");
        var masterA = new BitcoinjsLib.HDNode(keyA, chainCode);
        var masterB = new BitcoinjsLib.HDNode(keyB, chainCode);
        var ventureId = createdEvent[/* ventureId */0];
        var accountIdx = WalletTypes.AccountIndex[/* default */8];
        var keyChainIdx = WalletTypes.CustodianKeyChainIndex[/* first */7];
        var cKeyChainA = CustodianKeyChain.toPublicKeyChain(CustodianKeyChain.make(ventureId, accountIdx, keyChainIdx, masterA));
        var cKeyChainB = CustodianKeyChain.toPublicKeyChain(CustodianKeyChain.make(ventureId, accountIdx, keyChainIdx, masterB));
        var accountKeyChain = AccountKeyChain.make(accountIdx, WalletTypes.AccountKeyChainIndex[/* first */1], 1, /* :: */[
              /* tuple */[
                userA,
                cKeyChainA
              ],
              /* :: */[
                /* tuple */[
                  userB,
                  cKeyChainB
                ],
                /* [] */0
              ]
            ]);
        var wallet = Venture__Wallet.apply(/* AccountKeyChainUpdated */Block.__(24, [Event.AccountKeyChainUpdated[/* make */0](accountKeyChain)]), Venture__Wallet.apply(/* AccountCreationAccepted */Block.__(9, [/* record */[
                      /* processId */PrimitiveTypes.ProcessId[/* make */7](/* () */0),
                      /* dependsOn : None */0,
                      /* data : record */[
                        /* accountIdx */accountIdx,
                        /* name */"default"
                      ]
                    ]]), Venture__Wallet.apply(/* VentureCreated */Block.__(0, [createdEvent]), Venture__Wallet.make(/* () */0))));
        var address1 = Venture__Wallet.exposeNextIncomeAddress(accountIdx, wallet);
        var wallet$1 = Venture__Wallet.apply(/* IncomeAddressExposed */Block.__(25, [address1]), wallet);
        var address2 = Venture__Wallet.exposeNextIncomeAddress(accountIdx, wallet$1);
        var wallet$2 = Venture__Wallet.apply(/* IncomeAddressExposed */Block.__(25, [address2]), wallet$1);
        var oneKeyChainWallet = [wallet$2];
        var accountKeyChain$1 = AccountKeyChain.make(accountIdx, WalletTypes.AccountKeyChainIndex[/* next */2](WalletTypes.AccountKeyChainIndex[/* first */1]), 2, /* :: */[
              /* tuple */[
                userA,
                cKeyChainA
              ],
              /* :: */[
                /* tuple */[
                  userB,
                  cKeyChainB
                ],
                /* [] */0
              ]
            ]);
        var wallet$3 = Venture__Wallet.apply(/* AccountKeyChainUpdated */Block.__(24, [Event.AccountKeyChainUpdated[/* make */0](accountKeyChain$1)]), wallet$2);
        var address3 = Venture__Wallet.exposeNextIncomeAddress(accountIdx, wallet$3);
        var wallet$4 = Venture__Wallet.apply(/* IncomeAddressExposed */Block.__(25, [address3]), wallet$3);
        var address4 = Venture__Wallet.exposeNextIncomeAddress(accountIdx, wallet$4);
        var wallet$5 = Venture__Wallet.apply(/* IncomeAddressExposed */Block.__(25, [address4]), wallet$4);
        var twoKeyChainWallet = [wallet$5];
        var address1Satoshis = BTC.fromSatoshis(/* int64 */[
              /* hi */0,
              /* lo */10000
            ]);
        var address2Satoshis = BTC.fromSatoshis(/* int64 */[
              /* hi */0,
              /* lo */10000
            ]);
        var address3Satoshis = BTC.fromSatoshis(/* int64 */[
              /* hi */0,
              /* lo */10000
            ]);
        var address4Satoshis = BTC.fromSatoshis(/* int64 */[
              /* hi */0,
              /* lo */15000
            ]);
        var oneKeyChainWalletTotal = address1Satoshis.plus(address2Satoshis);
        var oneKeyChainSpendAmount = BTC.fromSatoshis(/* int64 */[
              /* hi */0,
              /* lo */6000
            ]);
        var oneKeyChainExpectedFee = BTC.fromSatoshis(/* int64 */[
              /* hi */0,
              /* lo */1892
            ]);
        var twoKeyChainWalletTotal = oneKeyChainWalletTotal.plus(address3Satoshis).plus(address4Satoshis).minus(oneKeyChainSpendAmount).minus(oneKeyChainExpectedFee);
        var twoKeyChainSpendAmount = BTC.fromSatoshis(/* int64 */[
              /* hi */0,
              /* lo */25000
            ]);
        Jest.beforeAllPromise(/* Some */[40000], (function () {
                return Helpers.faucet(/* :: */[
                                  /* tuple */[
                                    address1[/* address */1],
                                    address1Satoshis
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      address2[/* address */1],
                                      address2Satoshis
                                    ],
                                    /* :: */[
                                      /* tuple */[
                                        address3[/* address */1],
                                        address3Satoshis
                                      ],
                                      /* :: */[
                                        /* tuple */[
                                          address4[/* address */1],
                                          address4Satoshis
                                        ],
                                        /* [] */0
                                      ]
                                    ]
                                  ]
                                ]).then((function () {
                                  return Venture__Wallet.preparePayoutTx(/* record */[
                                              /* userId */userA,
                                              /* appPrivateKey */"",
                                              /* issuerKeyPair */keyA,
                                              /* storagePrefix */keyA.getAddress(),
                                              /* masterKeyChain */masterA,
                                              /* network : Regtest */0
                                            ], accountIdx, /* :: */[
                                              /* tuple */[
                                                Helpers.faucetAddress,
                                                oneKeyChainSpendAmount
                                              ],
                                              /* [] */0
                                            ], BTC.fromSatoshis(/* int64 */[
                                                  /* hi */0,
                                                  /* lo */10
                                                ]), oneKeyChainWallet[0]);
                                })).then((function ($$event) {
                                oneKeyChainWallet[0] = Venture__Wallet.apply(/* PayoutProposed */Block.__(16, [$$event]), oneKeyChainWallet[0]);
                                twoKeyChainWallet[0] = Venture__Wallet.apply(/* PayoutProposed */Block.__(16, [$$event]), twoKeyChainWallet[0]);
                                return Promise.all(/* tuple */[
                                            Promise.resolve($$event[/* processId */0]),
                                            Helpers.broadcastTransaction(PayoutTransaction.finalize(/* :: */[
                                                      $$event[/* data */4][/* payoutTx */1],
                                                      /* [] */0
                                                    ], /* Regtest */0))
                                          ]);
                              })).then((function (param) {
                              var txId = param[1];
                              var processId = param[0];
                              oneKeyChainWallet[0] = Venture__Wallet.apply(/* PayoutBroadcast */Block.__(20, [Curry._2(Event.Payout[/* Broadcast */6][/* make */0], processId, txId)]), oneKeyChainWallet[0]);
                              twoKeyChainWallet[0] = Venture__Wallet.apply(/* PayoutBroadcast */Block.__(20, [Curry._2(Event.Payout[/* Broadcast */6][/* make */0], processId, txId)]), twoKeyChainWallet[0]);
                              return Promise.resolve(/* () */0);
                            }));
              }));
        Jest.testPromise(/* None */0, "1 of 2 wallet", (function () {
                return Helpers.getUTXOs(Venture__Wallet.getExposedAddresses(/* Some */[true], oneKeyChainWallet[0])).then((function (utxos) {
                              return Promise.resolve(Jest.Expect[/* toEqual */12](oneKeyChainWalletTotal.minus(oneKeyChainSpendAmount).minus(oneKeyChainExpectedFee), Jest.Expect[/* expect */0](List.fold_left((function (total, utxo) {
                                                        return total.plus(utxo[/* amount */3]);
                                                      }), BTC.zero, utxos))));
                            }));
              }));
        return Jest.testPromise(/* Some */[80000], "2 of 2 wallet", (function () {
                      return Venture__Wallet.preparePayoutTx(/* record */[
                                      /* userId */userA,
                                      /* appPrivateKey */"",
                                      /* issuerKeyPair */keyA,
                                      /* storagePrefix */keyA.getAddress(),
                                      /* masterKeyChain */masterA,
                                      /* network : Regtest */0
                                    ], accountIdx, /* :: */[
                                      /* tuple */[
                                        Helpers.faucetAddress,
                                        twoKeyChainSpendAmount
                                      ],
                                      /* [] */0
                                    ], BTC.fromSatoshis(/* int64 */[
                                          /* hi */0,
                                          /* lo */10
                                        ]), twoKeyChainWallet[0]).then((function ($$event) {
                                      var data = $$event[/* data */4];
                                      var payoutTx = PayoutTransaction.getSignedExn(PayoutTransaction.signPayout(ventureId, userB, masterB, wallet$5[/* accountKeyChains */3], data[/* payoutTx */1], /* Regtest */0));
                                      return Promise.all(/* tuple */[
                                                  Promise.resolve(Venture__Wallet.apply(/* PayoutProposed */Block.__(16, [$$event]), twoKeyChainWallet[0])),
                                                  Helpers.broadcastTransaction(PayoutTransaction.finalize(/* :: */[
                                                            data[/* payoutTx */1],
                                                            /* :: */[
                                                              payoutTx,
                                                              /* [] */0
                                                            ]
                                                          ], /* Regtest */0))
                                                ]);
                                    })).then((function (param) {
                                    var expectedFee = BTC.fromSatoshis(/* int64 */[
                                          /* hi */0,
                                          /* lo */5640
                                        ]);
                                    return Helpers.getUTXOs(Venture__Wallet.getExposedAddresses(/* Some */[true], param[0])).then((function (utxos) {
                                                  return Promise.resolve(Jest.Expect[/* toEqual */12](twoKeyChainWalletTotal.minus(twoKeyChainSpendAmount).minus(expectedFee), Jest.Expect[/* expect */0](List.fold_left((function (total, utxo) {
                                                                            return total.plus(utxo[/* amount */3]);
                                                                          }), BTC.zero, utxos))));
                                                }));
                                  }));
                    }));
      }));

var Wallet = 0;

exports.Wallet = Wallet;
/*  Not a pure module */
