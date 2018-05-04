// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("../wallet/BTC.bs.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Policy = require("../Policy.bs.js");
var Network = require("../wallet/Network.bs.js");
var EventTypes = require("./EventTypes.bs.js");
var Json_decode = require("bs-json/src/Json_decode.js");
var Json_encode = require("bs-json/src/Json_encode.js");
var WalletTypes = require("../wallet/WalletTypes.bs.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var PrimitiveTypes = require("../PrimitiveTypes.bs.js");
var AccountKeyChain = require("../wallet/AccountKeyChain.bs.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var CustodianKeyChain = require("../wallet/CustodianKeyChain.bs.js");
var PayoutTransaction = require("../wallet/PayoutTransaction.bs.js");

function make(ventureName, creatorId, creatorPubKey, metaPolicy, network) {
  return /* record */[
          /* ventureId */PrimitiveTypes.VentureId[/* make */7](/* () */0),
          /* ventureName */ventureName,
          /* creatorId */creatorId,
          /* creatorPubKey */creatorPubKey,
          /* metaPolicy */metaPolicy,
          /* systemIssuer */BitcoinjsLib.ECPair.makeRandom(),
          /* network */network
        ];
}

function encode($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "VentureCreated"
              ],
              /* :: */[
                /* tuple */[
                  "ventureId",
                  PrimitiveTypes.VentureId[/* encode */2]($$event[/* ventureId */0])
                ],
                /* :: */[
                  /* tuple */[
                    "ventureName",
                    $$event[/* ventureName */1]
                  ],
                  /* :: */[
                    /* tuple */[
                      "creatorId",
                      PrimitiveTypes.UserId[/* encode */2]($$event[/* creatorId */2])
                    ],
                    /* :: */[
                      /* tuple */[
                        "creatorPubKey",
                        $$event[/* creatorPubKey */3]
                      ],
                      /* :: */[
                        /* tuple */[
                          "metaPolicy",
                          Policy.encode($$event[/* metaPolicy */4])
                        ],
                        /* :: */[
                          /* tuple */[
                            "systemIssuer",
                            $$event[/* systemIssuer */5].toWIF()
                          ],
                          /* :: */[
                            /* tuple */[
                              "network",
                              Network.encode($$event[/* network */6])
                            ],
                            /* [] */0
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]);
}

function decode(raw) {
  return /* record */[
          /* ventureId */Json_decode.field("ventureId", PrimitiveTypes.VentureId[/* decode */3], raw),
          /* ventureName */Json_decode.field("ventureName", Json_decode.string, raw),
          /* creatorId */Json_decode.field("creatorId", PrimitiveTypes.UserId[/* decode */3], raw),
          /* creatorPubKey */Json_decode.field("creatorPubKey", Json_decode.string, raw),
          /* metaPolicy */Json_decode.field("metaPolicy", Policy.decode, raw),
          /* systemIssuer */BitcoinjsLib.ECPair.fromWIF(Json_decode.field("systemIssuer", Json_decode.string, raw)),
          /* network */Json_decode.field("network", Network.decode, raw)
        ];
}

var VentureCreated = /* module */[
  /* make */make,
  /* encode */encode,
  /* decode */decode
];

function encode$1($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "id",
                PrimitiveTypes.UserId[/* encode */2]($$event[/* id */1])
              ],
              /* :: */[
                /* tuple */[
                  "pubKey",
                  $$event[/* pubKey */2]
                ],
                /* :: */[
                  /* tuple */[
                    "lastRemoval",
                    Json_encode.nullable(PrimitiveTypes.ProcessId[/* encode */2], $$event[/* lastRemoval */0])
                  ],
                  /* [] */0
                ]
              ]
            ]);
}

function decode$1(raw) {
  var partial_arg = PrimitiveTypes.ProcessId[/* decode */3];
  return /* record */[
          /* lastRemoval */Json_decode.field("lastRemoval", (function (param) {
                  return Json_decode.optional(partial_arg, param);
                }), raw),
          /* id */Json_decode.field("id", PrimitiveTypes.UserId[/* decode */3], raw),
          /* pubKey */Json_decode.field("pubKey", Json_decode.string, raw)
        ];
}

var Data = /* module */[
  /* encode */encode$1,
  /* decode */decode$1
];

var include = EventTypes.makeProcess("Partner")(Data);

var Proposed = include[1];

var Endorsed = include[2];

var Accepted = include[3];

function encode$2($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "id",
                PrimitiveTypes.UserId[/* encode */2]($$event[/* id */0])
              ],
              /* [] */0
            ]);
}

function decode$2(raw) {
  return /* record */[/* id */Json_decode.field("id", PrimitiveTypes.UserId[/* decode */3], raw)];
}

var Data$1 = /* module */[
  /* encode */encode$2,
  /* decode */decode$2
];

var include$1 = EventTypes.makeProcess("PartnerRemoval")(Data$1);

var Proposed$1 = include$1[1];

var Endorsed$1 = include$1[2];

var Accepted$1 = include$1[3];

var Removal_001 = /* processName */include$1[0];

var Removal = /* module */[
  /* Data */Data$1,
  Removal_001,
  /* Proposed */Proposed$1,
  /* Endorsed */Endorsed$1,
  /* Accepted */Accepted$1
];

var Partner_001 = /* processName */include[0];

var Partner = /* module */[
  /* Data */Data,
  Partner_001,
  /* Proposed */Proposed,
  /* Endorsed */Endorsed,
  /* Accepted */Accepted,
  /* Removal */Removal
];

function encode$3($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "accountIdx",
                WalletTypes.AccountIndex[/* encode */3]($$event[/* accountIdx */0])
              ],
              /* :: */[
                /* tuple */[
                  "name",
                  $$event[/* name */1]
                ],
                /* [] */0
              ]
            ]);
}

function decode$3(raw) {
  return /* record */[
          /* accountIdx */Json_decode.field("accountIdx", WalletTypes.AccountIndex[/* decode */4], raw),
          /* name */Json_decode.field("name", Json_decode.string, raw)
        ];
}

var Data$2 = /* module */[
  /* encode */encode$3,
  /* decode */decode$3
];

var include$2 = EventTypes.makeProcess("AccountCreation")(Data$2);

var Proposed$2 = include$2[1];

var Endorsed$2 = include$2[2];

var Accepted$2 = include$2[3];

var AccountCreation_001 = /* processName */include$2[0];

var AccountCreation = /* module */[
  /* Data */Data$2,
  AccountCreation_001,
  /* Proposed */Proposed$2,
  /* Endorsed */Endorsed$2,
  /* Accepted */Accepted$2
];

function encode$4($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "partnerId",
                PrimitiveTypes.UserId[/* encode */2]($$event[/* partnerId */0])
              ],
              /* :: */[
                /* tuple */[
                  "partnerApprovalProcess",
                  PrimitiveTypes.ProcessId[/* encode */2]($$event[/* partnerApprovalProcess */1])
                ],
                /* :: */[
                  /* tuple */[
                    "accountIdx",
                    WalletTypes.AccountIndex[/* encode */3]($$event[/* accountIdx */2])
                  ],
                  /* [] */0
                ]
              ]
            ]);
}

function decode$4(raw) {
  return /* record */[
          /* partnerId */Json_decode.field("partnerId", PrimitiveTypes.UserId[/* decode */3], raw),
          /* partnerApprovalProcess */Json_decode.field("partnerApprovalProcess", PrimitiveTypes.ProcessId[/* decode */3], raw),
          /* accountIdx */Json_decode.field("accountIdx", WalletTypes.AccountIndex[/* decode */4], raw)
        ];
}

var Data$3 = /* module */[
  /* encode */encode$4,
  /* decode */decode$4
];

var include$3 = EventTypes.makeProcess("Custodian")(Data$3);

var Proposed$3 = include$3[1];

var Endorsed$3 = include$3[2];

var Accepted$3 = include$3[3];

function encode$5($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "custodianId",
                PrimitiveTypes.UserId[/* encode */2]($$event[/* custodianId */0])
              ],
              /* :: */[
                /* tuple */[
                  "accountIdx",
                  WalletTypes.AccountIndex[/* encode */3]($$event[/* accountIdx */1])
                ],
                /* [] */0
              ]
            ]);
}

function decode$5(raw) {
  return /* record */[
          /* custodianId */Json_decode.field("custodianId", PrimitiveTypes.UserId[/* decode */3], raw),
          /* accountIdx */Json_decode.field("accountIdx", WalletTypes.AccountIndex[/* decode */4], raw)
        ];
}

var Data$4 = /* module */[
  /* encode */encode$5,
  /* decode */decode$5
];

var include$4 = EventTypes.makeProcess("CustodianRemoval")(Data$4);

var Proposed$4 = include$4[1];

var Endorsed$4 = include$4[2];

var Accepted$4 = include$4[3];

var Removal_001$1 = /* processName */include$4[0];

var Removal$1 = /* module */[
  /* Data */Data$4,
  Removal_001$1,
  /* Proposed */Proposed$4,
  /* Endorsed */Endorsed$4,
  /* Accepted */Accepted$4
];

var Custodian_001 = /* processName */include$3[0];

var Custodian = /* module */[
  /* Data */Data$3,
  Custodian_001,
  /* Proposed */Proposed$3,
  /* Endorsed */Endorsed$3,
  /* Accepted */Accepted$3,
  /* Removal */Removal$1
];

function encode$6($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "accountIdx",
                WalletTypes.AccountIndex[/* encode */3]($$event[/* accountIdx */0])
              ],
              /* :: */[
                /* tuple */[
                  "payoutTx",
                  PayoutTransaction.encode($$event[/* payoutTx */1])
                ],
                /* :: */[
                  /* tuple */[
                    "changeAddressCoordinates",
                    Json_encode.nullable(AccountKeyChain.Address[/* Coordinates */0][/* encode */7], $$event[/* changeAddressCoordinates */2])
                  ],
                  /* [] */0
                ]
              ]
            ]);
}

function decode$6(raw) {
  var partial_arg = AccountKeyChain.Address[/* Coordinates */0][/* decode */8];
  return /* record */[
          /* accountIdx */Json_decode.field("accountIdx", WalletTypes.AccountIndex[/* decode */4], raw),
          /* payoutTx */Json_decode.field("payoutTx", PayoutTransaction.decode, raw),
          /* changeAddressCoordinates */Json_decode.field("changeAddressCoordinates", (function (param) {
                  return Json_decode.optional(partial_arg, param);
                }), raw)
        ];
}

var Data$5 = /* module */[
  /* encode */encode$6,
  /* decode */decode$6
];

var include$5 = EventTypes.makeProcess("Payout")(Data$5);

var Proposed$5 = include$5[1];

var Endorsed$5 = include$5[2];

var Accepted$5 = include$5[3];

function make$1(processId, custodianId, payoutTx) {
  return /* record */[
          /* processId */processId,
          /* custodianId */custodianId,
          /* payoutTx */payoutTx
        ];
}

function encode$7($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "PayoutSigned"
              ],
              /* :: */[
                /* tuple */[
                  "processId",
                  PrimitiveTypes.ProcessId[/* encode */2]($$event[/* processId */0])
                ],
                /* :: */[
                  /* tuple */[
                    "custodianId",
                    PrimitiveTypes.UserId[/* encode */2]($$event[/* custodianId */1])
                  ],
                  /* :: */[
                    /* tuple */[
                      "payoutTx",
                      PayoutTransaction.encode($$event[/* payoutTx */2])
                    ],
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

function decode$7(raw) {
  return /* record */[
          /* processId */Json_decode.field("processId", PrimitiveTypes.ProcessId[/* decode */3], raw),
          /* custodianId */Json_decode.field("custodianId", PrimitiveTypes.UserId[/* decode */3], raw),
          /* payoutTx */Json_decode.field("payoutTx", PayoutTransaction.decode, raw)
        ];
}

var Signature = /* module */[
  /* make */make$1,
  /* encode */encode$7,
  /* decode */decode$7
];

function make$2(processId, transactionId) {
  return /* record */[
          /* processId */processId,
          /* transactionId */transactionId
        ];
}

function encode$8($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "PayoutBroadcast"
              ],
              /* :: */[
                /* tuple */[
                  "processId",
                  PrimitiveTypes.ProcessId[/* encode */2]($$event[/* processId */0])
                ],
                /* :: */[
                  /* tuple */[
                    "transactionId",
                    $$event[/* transactionId */1]
                  ],
                  /* [] */0
                ]
              ]
            ]);
}

function decode$8(raw) {
  return /* record */[
          /* processId */Json_decode.field("processId", PrimitiveTypes.ProcessId[/* decode */3], raw),
          /* transactionId */Json_decode.field("transactionId", Json_decode.string, raw)
        ];
}

var Broadcast = /* module */[
  /* make */make$2,
  /* encode */encode$8,
  /* decode */decode$8
];

function make$3(processId) {
  return /* record */[/* processId */processId];
}

function encode$9($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "PayoutBroadcastDuplicate"
              ],
              /* :: */[
                /* tuple */[
                  "processId",
                  PrimitiveTypes.ProcessId[/* encode */2]($$event[/* processId */0])
                ],
                /* [] */0
              ]
            ]);
}

function decode$9(raw) {
  return /* record */[/* processId */Json_decode.field("processId", PrimitiveTypes.ProcessId[/* decode */3], raw)];
}

var BroadcastDuplicate = /* module */[
  /* make */make$3,
  /* encode */encode$9,
  /* decode */decode$9
];

function make$4(processId, errorMessage) {
  return /* record */[
          /* processId */processId,
          /* errorMessage */errorMessage
        ];
}

function encode$10($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "PayoutBroadcastFailed"
              ],
              /* :: */[
                /* tuple */[
                  "processId",
                  PrimitiveTypes.ProcessId[/* encode */2]($$event[/* processId */0])
                ],
                /* :: */[
                  /* tuple */[
                    "errorMessage",
                    $$event[/* errorMessage */1]
                  ],
                  /* [] */0
                ]
              ]
            ]);
}

function decode$10(raw) {
  return /* record */[
          /* processId */Json_decode.field("processId", PrimitiveTypes.ProcessId[/* decode */3], raw),
          /* errorMessage */Json_decode.field("errorMessage", Json_decode.string, raw)
        ];
}

var BroadcastFailed = /* module */[
  /* make */make$4,
  /* encode */encode$10,
  /* decode */decode$10
];

var Payout_001 = /* processName */include$5[0];

var Payout = /* module */[
  /* Data */Data$5,
  Payout_001,
  /* Proposed */Proposed$5,
  /* Endorsed */Endorsed$5,
  /* Accepted */Accepted$5,
  /* Signature */Signature,
  /* Broadcast */Broadcast,
  /* BroadcastDuplicate */BroadcastDuplicate,
  /* BroadcastFailed */BroadcastFailed
];

function make$5(custodianApprovalProcess, partnerId, keyChain) {
  return /* record */[
          /* custodianApprovalProcess */custodianApprovalProcess,
          /* partnerId */partnerId,
          /* keyChain */keyChain
        ];
}

function encode$11($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "CustodianKeyChainUpdated"
              ],
              /* :: */[
                /* tuple */[
                  "custodianApprovalProcess",
                  PrimitiveTypes.ProcessId[/* encode */2]($$event[/* custodianApprovalProcess */0])
                ],
                /* :: */[
                  /* tuple */[
                    "partnerId",
                    PrimitiveTypes.UserId[/* encode */2]($$event[/* partnerId */1])
                  ],
                  /* :: */[
                    /* tuple */[
                      "keyChain",
                      CustodianKeyChain.encode($$event[/* keyChain */2])
                    ],
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

function decode$11(raw) {
  return /* record */[
          /* custodianApprovalProcess */Json_decode.field("custodianApprovalProcess", PrimitiveTypes.ProcessId[/* decode */3], raw),
          /* partnerId */Json_decode.field("partnerId", PrimitiveTypes.UserId[/* decode */3], raw),
          /* keyChain */Json_decode.field("keyChain", CustodianKeyChain.decode, raw)
        ];
}

var CustodianKeyChainUpdated = /* module */[
  /* make */make$5,
  /* encode */encode$11,
  /* decode */decode$11
];

function make$6(keyChain) {
  return /* record */[/* keyChain */keyChain];
}

function encode$12($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "AccountKeyChainUpdated"
              ],
              /* :: */[
                /* tuple */[
                  "keyChain",
                  AccountKeyChain.encode($$event[/* keyChain */0])
                ],
                /* [] */0
              ]
            ]);
}

function decode$12(raw) {
  return /* record */[/* keyChain */Json_decode.field("keyChain", AccountKeyChain.decode, raw)];
}

var AccountKeyChainUpdated = /* module */[
  /* make */make$6,
  /* encode */encode$12,
  /* decode */decode$12
];

function make$7(coordinates, address) {
  return /* record */[
          /* coordinates */coordinates,
          /* address */address
        ];
}

function encode$13($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "IncomeAddressExposed"
              ],
              /* :: */[
                /* tuple */[
                  "coordinates",
                  Curry._1(AccountKeyChain.Address[/* Coordinates */0][/* encode */7], $$event[/* coordinates */0])
                ],
                /* :: */[
                  /* tuple */[
                    "address",
                    $$event[/* address */1]
                  ],
                  /* [] */0
                ]
              ]
            ]);
}

function decode$13(raw) {
  return /* record */[
          /* coordinates */Json_decode.field("coordinates", AccountKeyChain.Address[/* Coordinates */0][/* decode */8], raw),
          /* address */Json_decode.field("address", Json_decode.string, raw)
        ];
}

var IncomeAddressExposed = /* module */[
  /* make */make$7,
  /* encode */encode$13,
  /* decode */decode$13
];

function make$8(address, txId, amount) {
  return /* record */[
          /* address */address,
          /* txId */txId,
          /* amount */amount
        ];
}

function encode$14($$event) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "IncomeDetected"
              ],
              /* :: */[
                /* tuple */[
                  "address",
                  $$event[/* address */0]
                ],
                /* :: */[
                  /* tuple */[
                    "txId",
                    $$event[/* txId */1]
                  ],
                  /* :: */[
                    /* tuple */[
                      "amount",
                      BTC.encode($$event[/* amount */2])
                    ],
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

function decode$14(raw) {
  return /* record */[
          /* address */Json_decode.field("address", Json_decode.string, raw),
          /* txId */Json_decode.field("txId", Json_decode.string, raw),
          /* amount */Json_decode.field("amount", BTC.decode, raw)
        ];
}

var IncomeDetected = /* module */[
  /* make */make$8,
  /* encode */encode$14,
  /* decode */decode$14
];

function makePartnerProposed(supporterId, prospectId, prospectPubKey, lastRemovalProcess, policy) {
  return /* PartnerProposed */Block.__(1, [Curry._4(Proposed[/* make */0], /* Some */[lastRemovalProcess], supporterId, policy, /* record */[
                  /* lastRemoval */lastRemovalProcess,
                  /* id */prospectId,
                  /* pubKey */prospectPubKey
                ])]);
}

function makePartnerRemovalProposed(supporterId, partnerId, policy) {
  return /* PartnerRemovalProposed */Block.__(4, [Curry._4(Proposed$1[/* make */0], /* None */0, supporterId, policy, /* record */[/* id */partnerId])]);
}

function makeAccountCreationProposed(supporterId, name, accountIdx, policy) {
  return /* AccountCreationProposed */Block.__(7, [Curry._4(Proposed$2[/* make */0], /* None */0, supporterId, policy, /* record */[
                  /* accountIdx */accountIdx,
                  /* name */name
                ])]);
}

function makeCustodianProposed(partnerApprovalProcess, supporterId, partnerId, accountIdx, policy) {
  return /* CustodianProposed */Block.__(10, [Curry._4(Proposed$3[/* make */0], /* Some */[/* Some */[partnerApprovalProcess]], supporterId, policy, /* record */[
                  /* partnerId */partnerId,
                  /* partnerApprovalProcess */partnerApprovalProcess,
                  /* accountIdx */accountIdx
                ])]);
}

function makeCustodianRemovalProposed(custodianApprovalProcess, supporterId, custodianId, accountIdx, policy) {
  return /* CustodianRemovalProposed */Block.__(13, [Curry._4(Proposed$4[/* make */0], /* Some */[/* Some */[custodianApprovalProcess]], supporterId, policy, /* record */[
                  /* custodianId */custodianId,
                  /* accountIdx */accountIdx
                ])]);
}

function makePartnerEndorsed(processId, supporterId) {
  return /* PartnerEndorsed */Block.__(2, [Curry._2(Endorsed[/* make */0], processId, supporterId)]);
}

function makePartnerRemovalEndorsed(processId, supporterId) {
  return /* PartnerRemovalEndorsed */Block.__(5, [Curry._2(Endorsed$1[/* make */0], processId, supporterId)]);
}

function makeCustodianEndorsed(processId, supporterId) {
  return /* CustodianEndorsed */Block.__(11, [Curry._2(Endorsed$3[/* make */0], processId, supporterId)]);
}

function makeCustodianRemovalEndorsed(processId, supporterId) {
  return /* CustodianRemovalEndorsed */Block.__(14, [Curry._2(Endorsed$4[/* make */0], processId, supporterId)]);
}

function makePayoutEndorsed(processId, supporterId) {
  return /* PayoutEndorsed */Block.__(17, [Curry._2(Endorsed$5[/* make */0], processId, supporterId)]);
}

function encode$15(param) {
  switch (param.tag | 0) {
    case 0 : 
        return encode(param[0]);
    case 1 : 
        return Curry._1(Proposed[/* encode */1], param[0]);
    case 2 : 
        return Curry._1(Endorsed[/* encode */1], param[0]);
    case 3 : 
        return Curry._1(Accepted[/* encode */1], param[0]);
    case 4 : 
        return Curry._1(Proposed$1[/* encode */1], param[0]);
    case 5 : 
        return Curry._1(Endorsed$1[/* encode */1], param[0]);
    case 6 : 
        return Curry._1(Accepted$1[/* encode */1], param[0]);
    case 7 : 
        return Curry._1(Proposed$2[/* encode */1], param[0]);
    case 8 : 
        return Curry._1(Endorsed$2[/* encode */1], param[0]);
    case 9 : 
        return Curry._1(Accepted$2[/* encode */1], param[0]);
    case 10 : 
        return Curry._1(Proposed$3[/* encode */1], param[0]);
    case 11 : 
        return Curry._1(Endorsed$3[/* encode */1], param[0]);
    case 12 : 
        return Curry._1(Accepted$3[/* encode */1], param[0]);
    case 13 : 
        return Curry._1(Proposed$4[/* encode */1], param[0]);
    case 14 : 
        return Curry._1(Endorsed$4[/* encode */1], param[0]);
    case 15 : 
        return Curry._1(Accepted$4[/* encode */1], param[0]);
    case 16 : 
        return Curry._1(Proposed$5[/* encode */1], param[0]);
    case 17 : 
        return Curry._1(Endorsed$5[/* encode */1], param[0]);
    case 18 : 
        return Curry._1(Accepted$5[/* encode */1], param[0]);
    case 19 : 
        return encode$7(param[0]);
    case 20 : 
        return encode$8(param[0]);
    case 21 : 
        return encode$9(param[0]);
    case 22 : 
        return encode$10(param[0]);
    case 23 : 
        return encode$11(param[0]);
    case 24 : 
        return encode$12(param[0]);
    case 25 : 
        return encode$13(param[0]);
    case 26 : 
        return encode$14(param[0]);
    
  }
}

function isSystemEvent(param) {
  switch (param.tag | 0) {
    case 3 : 
    case 6 : 
    case 9 : 
    case 12 : 
    case 15 : 
    case 18 : 
    case 20 : 
    case 21 : 
    case 22 : 
    case 24 : 
    case 25 : 
    case 26 : 
        return true;
    default:
      return false;
  }
}

var UnknownEvent = Caml_exceptions.create("Event.UnknownEvent");

function decode$15(raw) {
  var type_ = Json_decode.field("type", Json_decode.string, raw);
  switch (type_) {
    case "AccountCreationAccepted" : 
        return /* AccountCreationAccepted */Block.__(9, [Curry._1(Accepted$2[/* decode */2], raw)]);
    case "AccountCreationEndorsed" : 
        return /* AccountCreationEndorsed */Block.__(8, [Curry._1(Endorsed$2[/* decode */2], raw)]);
    case "AccountCreationProposed" : 
        return /* AccountCreationProposed */Block.__(7, [Curry._1(Proposed$2[/* decode */2], raw)]);
    case "AccountKeyChainUpdated" : 
        return /* AccountKeyChainUpdated */Block.__(24, [decode$12(raw)]);
    case "CustodianAccepted" : 
        return /* CustodianAccepted */Block.__(12, [Curry._1(Accepted$3[/* decode */2], raw)]);
    case "CustodianEndorsed" : 
        return /* CustodianEndorsed */Block.__(11, [Curry._1(Endorsed$3[/* decode */2], raw)]);
    case "CustodianKeyChainUpdated" : 
        return /* CustodianKeyChainUpdated */Block.__(23, [decode$11(raw)]);
    case "CustodianProposed" : 
        return /* CustodianProposed */Block.__(10, [Curry._1(Proposed$3[/* decode */2], raw)]);
    case "CustodianRemovalAccepted" : 
        return /* CustodianRemovalAccepted */Block.__(15, [Curry._1(Accepted$4[/* decode */2], raw)]);
    case "CustodianRemovalEndorsed" : 
        return /* CustodianRemovalEndorsed */Block.__(14, [Curry._1(Endorsed$4[/* decode */2], raw)]);
    case "CustodianRemovalProposed" : 
        return /* CustodianRemovalProposed */Block.__(13, [Curry._1(Proposed$4[/* decode */2], raw)]);
    case "IncomeAddressExposed" : 
        return /* IncomeAddressExposed */Block.__(25, [decode$13(raw)]);
    case "IncomeDetected" : 
        return /* IncomeDetected */Block.__(26, [decode$14(raw)]);
    case "PartnerAccepted" : 
        return /* PartnerAccepted */Block.__(3, [Curry._1(Accepted[/* decode */2], raw)]);
    case "PartnerEndorsed" : 
        return /* PartnerEndorsed */Block.__(2, [Curry._1(Endorsed[/* decode */2], raw)]);
    case "PartnerProposed" : 
        return /* PartnerProposed */Block.__(1, [Curry._1(Proposed[/* decode */2], raw)]);
    case "PartnerRemovalAccepted" : 
        return /* PartnerRemovalAccepted */Block.__(6, [Curry._1(Accepted$1[/* decode */2], raw)]);
    case "PartnerRemovalEndorsed" : 
        return /* PartnerRemovalEndorsed */Block.__(5, [Curry._1(Endorsed$1[/* decode */2], raw)]);
    case "PartnerRemovalProposed" : 
        return /* PartnerRemovalProposed */Block.__(4, [Curry._1(Proposed$1[/* decode */2], raw)]);
    case "PayoutAccepted" : 
        return /* PayoutAccepted */Block.__(18, [Curry._1(Accepted$5[/* decode */2], raw)]);
    case "PayoutBroadcast" : 
        return /* PayoutBroadcast */Block.__(20, [decode$8(raw)]);
    case "PayoutBroadcastDuplicate" : 
        return /* PayoutBroadcastDuplicate */Block.__(21, [decode$9(raw)]);
    case "PayoutBroadcastFailed" : 
        return /* PayoutBroadcastFailed */Block.__(22, [decode$10(raw)]);
    case "PayoutEndorsed" : 
        return /* PayoutEndorsed */Block.__(17, [Curry._1(Endorsed$5[/* decode */2], raw)]);
    case "PayoutProposed" : 
        return /* PayoutProposed */Block.__(16, [Curry._1(Proposed$5[/* decode */2], raw)]);
    case "PayoutSigned" : 
        return /* PayoutSigned */Block.__(19, [decode$7(raw)]);
    case "VentureCreated" : 
        return /* VentureCreated */Block.__(0, [decode(raw)]);
    default:
      throw [
            UnknownEvent,
            raw
          ];
  }
}

function getIncomeAddressExposedExn($$event) {
  if ($$event.tag === 25) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getIncomeAddressExposedExn");
  }
}

function getAccountKeyChainUpdatedExn($$event) {
  if ($$event.tag === 24) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getAccountKeyChainUpdatedExn");
  }
}

function getCustodianKeyChainUpdatedExn($$event) {
  if ($$event.tag === 23) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getCustodianKeyChainUpdatedExn");
  }
}

function getPayoutBroadcastFailedExn($$event) {
  if ($$event.tag === 22) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPayoutBroadcastFailedExn");
  }
}

function getPayoutBroadcastExn($$event) {
  if ($$event.tag === 20) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPayoutBroadcastExn");
  }
}

function getPayoutSignedExn($$event) {
  if ($$event.tag === 19) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPayoutSignedExn");
  }
}

function getPayoutAcceptedExn($$event) {
  if ($$event.tag === 18) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPayoutAcceptedExn");
  }
}

function getPayoutEndorsedExn($$event) {
  if ($$event.tag === 17) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPayoutEndorsedExn");
  }
}

function getPayoutProposedExn($$event) {
  if ($$event.tag === 16) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPayoutProposedExn");
  }
}

function getCustodianAcceptedExn($$event) {
  if ($$event.tag === 12) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getCustodianAcceptedExn");
  }
}

function getCustodianEndorsedExn($$event) {
  if ($$event.tag === 11) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getCustodianEndorsedExn");
  }
}

function getCustodianProposedExn($$event) {
  if ($$event.tag === 10) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getCustodianProposedExn");
  }
}

function getAccountCreationAcceptedExn($$event) {
  if ($$event.tag === 9) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getAccountCreationAcceptedExn");
  }
}

function getAccountCreationEndorsedExn($$event) {
  if ($$event.tag === 8) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getAccountCreationEndorsedExn");
  }
}

function getAccountCreationProposedExn($$event) {
  if ($$event.tag === 7) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getAccountCreationProposedExn");
  }
}

function getPartnerAcceptedExn($$event) {
  if ($$event.tag === 3) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPartnerAcceptedExn");
  }
}

function getPartnerEndorsedExn($$event) {
  if ($$event.tag === 2) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPartnerEndorsedExn");
  }
}

function getPartnerProposedExn($$event) {
  if ($$event.tag === 1) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPartnerProposedExn");
  }
}

function getPartnerRemovalAcceptedExn($$event) {
  if ($$event.tag === 6) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPartnerRemovalAcceptedExn");
  }
}

function getPartnerRemovalEndorsedExn($$event) {
  if ($$event.tag === 5) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPartnerRemovalEndorsedExn");
  }
}

function getPartnerRemovalProposedExn($$event) {
  if ($$event.tag === 4) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getPartnerRemovalProposedExn");
  }
}

function getCustodianRemovalProposedExn($$event) {
  if ($$event.tag === 13) {
    return $$event[0];
  } else {
    return Js_exn.raiseError("getCustodianRemovalProposedExn");
  }
}

function getVentureCreatedExn($$event) {
  if ($$event.tag) {
    return Js_exn.raiseError("getVentureCreatedExn");
  } else {
    return $$event[0];
  }
}

exports.VentureCreated = VentureCreated;
exports.Partner = Partner;
exports.AccountCreation = AccountCreation;
exports.Custodian = Custodian;
exports.Payout = Payout;
exports.CustodianKeyChainUpdated = CustodianKeyChainUpdated;
exports.AccountKeyChainUpdated = AccountKeyChainUpdated;
exports.IncomeAddressExposed = IncomeAddressExposed;
exports.IncomeDetected = IncomeDetected;
exports.makePartnerProposed = makePartnerProposed;
exports.makePartnerRemovalProposed = makePartnerRemovalProposed;
exports.makeAccountCreationProposed = makeAccountCreationProposed;
exports.makeCustodianProposed = makeCustodianProposed;
exports.makeCustodianRemovalProposed = makeCustodianRemovalProposed;
exports.makePartnerEndorsed = makePartnerEndorsed;
exports.makePartnerRemovalEndorsed = makePartnerRemovalEndorsed;
exports.makeCustodianEndorsed = makeCustodianEndorsed;
exports.makeCustodianRemovalEndorsed = makeCustodianRemovalEndorsed;
exports.makePayoutEndorsed = makePayoutEndorsed;
exports.encode = encode$15;
exports.isSystemEvent = isSystemEvent;
exports.UnknownEvent = UnknownEvent;
exports.decode = decode$15;
exports.getIncomeAddressExposedExn = getIncomeAddressExposedExn;
exports.getAccountKeyChainUpdatedExn = getAccountKeyChainUpdatedExn;
exports.getCustodianKeyChainUpdatedExn = getCustodianKeyChainUpdatedExn;
exports.getPayoutBroadcastFailedExn = getPayoutBroadcastFailedExn;
exports.getPayoutBroadcastExn = getPayoutBroadcastExn;
exports.getPayoutSignedExn = getPayoutSignedExn;
exports.getPayoutAcceptedExn = getPayoutAcceptedExn;
exports.getPayoutEndorsedExn = getPayoutEndorsedExn;
exports.getPayoutProposedExn = getPayoutProposedExn;
exports.getCustodianAcceptedExn = getCustodianAcceptedExn;
exports.getCustodianEndorsedExn = getCustodianEndorsedExn;
exports.getCustodianProposedExn = getCustodianProposedExn;
exports.getAccountCreationAcceptedExn = getAccountCreationAcceptedExn;
exports.getAccountCreationEndorsedExn = getAccountCreationEndorsedExn;
exports.getAccountCreationProposedExn = getAccountCreationProposedExn;
exports.getPartnerAcceptedExn = getPartnerAcceptedExn;
exports.getPartnerEndorsedExn = getPartnerEndorsedExn;
exports.getPartnerProposedExn = getPartnerProposedExn;
exports.getPartnerRemovalAcceptedExn = getPartnerRemovalAcceptedExn;
exports.getPartnerRemovalEndorsedExn = getPartnerRemovalEndorsedExn;
exports.getPartnerRemovalProposedExn = getPartnerRemovalProposedExn;
exports.getCustodianRemovalProposedExn = getCustodianRemovalProposedExn;
exports.getVentureCreatedExn = getVentureCreatedExn;
/* include Not a pure module */
