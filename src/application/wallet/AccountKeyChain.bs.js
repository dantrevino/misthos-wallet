// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Utils = require("../../utils/Utils.bs.js");
var Json_decode = require("bs-json/src/Json_decode.js");
var Json_encode = require("bs-json/src/Json_encode.js");
var WalletTypes = require("./WalletTypes.bs.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var Caml_primitive = require("bs-platform/lib/js/caml_primitive.js");
var PrimitiveTypes = require("../PrimitiveTypes.bs.js");
var CustodianKeyChain = require("./CustodianKeyChain.bs.js");

var defaultCosignerList = /* array */[
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6
];

function make(accountIdx, keyChainIdx, nCoSigners, custodianKeyChains) {
  return /* record */[
          /* accountIdx */accountIdx,
          /* keyChainIdx */keyChainIdx,
          /* nCoSigners */nCoSigners,
          /* custodianKeyChains */custodianKeyChains
        ];
}

function firstExternal(param) {
  return /* tuple */[
          param[/* accountIdx */0],
          param[/* keyChainIdx */1],
          WalletTypes.ChainIndex[/* externalChain */8],
          WalletTypes.AddressIndex[/* first */1]
        ];
}

function firstInternal(param) {
  return /* tuple */[
          param[/* accountIdx */0],
          param[/* keyChainIdx */1],
          WalletTypes.ChainIndex[/* internalChain */9],
          WalletTypes.AddressIndex[/* first */1]
        ];
}

function next(param) {
  return /* tuple */[
          param[0],
          param[1],
          param[2],
          WalletTypes.AddressIndex[/* next */2](param[3])
        ];
}

function addressIdx(param) {
  return param[3];
}

function keyChainIdx(param) {
  return param[1];
}

function chainIdx(param) {
  return param[2];
}

function accountIdx(param) {
  return param[0];
}

var partial_arg = WalletTypes.AddressIndex[/* encode */3];

var partial_arg$1 = WalletTypes.ChainIndex[/* encode */3];

var partial_arg$2 = WalletTypes.AccountKeyChainIndex[/* encode */3];

var partial_arg$3 = WalletTypes.AccountIndex[/* encode */3];

function encode(param) {
  return Json_encode.tuple4(partial_arg$3, partial_arg$2, partial_arg$1, partial_arg, param);
}

var partial_arg$4 = WalletTypes.AddressIndex[/* decode */4];

var partial_arg$5 = WalletTypes.ChainIndex[/* decode */4];

var partial_arg$6 = WalletTypes.AccountKeyChainIndex[/* decode */4];

var partial_arg$7 = WalletTypes.AccountIndex[/* decode */4];

function decode(param) {
  return Json_decode.tuple4(partial_arg$7, partial_arg$6, partial_arg$5, partial_arg$4, param);
}

var Coordinates = /* module */[
  /* firstExternal */firstExternal,
  /* firstInternal */firstInternal,
  /* next */next,
  /* addressIdx */addressIdx,
  /* keyChainIdx */keyChainIdx,
  /* chainIdx */chainIdx,
  /* accountIdx */accountIdx,
  /* encode */encode,
  /* decode */decode
];

function make$1(coordinates, param) {
  var custodianKeyChains = param[/* custodianKeyChains */3];
  var nCoSigners = param[/* nCoSigners */2];
  var keys = List.map((function (node) {
          return node.keyPair;
        }), List.map((function (node) {
              return node.derive(CustodianKeyChain.defaultCosignerIdx).derive(WalletTypes.ChainIndex[/* toInt */0](chainIdx(coordinates))).derive(WalletTypes.AddressIndex[/* toInt */0](addressIdx(coordinates)));
            }), List.sort((function (chainA, chainB) {
                  return Caml_primitive.caml_string_compare(Utils.bufToHex(chainA.getPublicKeyBuffer()), Utils.bufToHex(chainB.getPublicKeyBuffer()));
                }), List.map((function (chain) {
                      return CustodianKeyChain.hdNode(chain[1]);
                    }), custodianKeyChains))));
  var witnessScript = BitcoinjsLib.script.multisig.output.encode(nCoSigners, $$Array.of_list(List.map((function (prim) {
                  return prim.getPublicKeyBuffer();
                }), keys)));
  var redeemScript = BitcoinjsLib.script.witnessScriptHash.output.encode(BitcoinjsLib.crypto.sha256(witnessScript));
  var outputScript = BitcoinjsLib.script.scriptHash.output.encode(BitcoinjsLib.crypto.hash160(redeemScript));
  var address = BitcoinjsLib.address.fromOutputScript(outputScript, List.hd(keys).getNetwork());
  return /* record */[
          /* nCoSigners */nCoSigners,
          /* nPubKeys */List.length(custodianKeyChains),
          /* coordinates */coordinates,
          /* witnessScript */Utils.bufToHex(witnessScript),
          /* redeemScript */Utils.bufToHex(redeemScript),
          /* address */address
        ];
}

var Address = /* module */[
  /* Coordinates */Coordinates,
  /* make */make$1
];

function custodianKeyChains(keyChain) {
  return keyChain[/* custodianKeyChains */3];
}

function lookupKeyChain(param, accounts) {
  return List.assoc(param[1], List.assoc(param[0], accounts));
}

function find(coordinates, keyChains) {
  return make$1(coordinates, lookupKeyChain(coordinates, keyChains));
}

function encode$1(keyChain) {
  var partial_arg = PrimitiveTypes.UserId[/* encode */2];
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "custodianKeyChains",
                Json_encode.list((function (param) {
                        return Json_encode.pair(partial_arg, CustodianKeyChain.encode, param);
                      }), keyChain[/* custodianKeyChains */3])
              ],
              /* :: */[
                /* tuple */[
                  "nCoSigners",
                  keyChain[/* nCoSigners */2]
                ],
                /* :: */[
                  /* tuple */[
                    "accountIdx",
                    WalletTypes.AccountIndex[/* encode */3](keyChain[/* accountIdx */0])
                  ],
                  /* :: */[
                    /* tuple */[
                      "keyChainIdx",
                      WalletTypes.AccountKeyChainIndex[/* encode */3](keyChain[/* keyChainIdx */1])
                    ],
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

function decode$1(raw) {
  var partial_arg = PrimitiveTypes.UserId[/* decode */3];
  var partial_arg$1 = function (param) {
    return Json_decode.pair(partial_arg, CustodianKeyChain.decode, param);
  };
  return /* record */[
          /* accountIdx */Json_decode.field("accountIdx", WalletTypes.AccountIndex[/* decode */4], raw),
          /* keyChainIdx */Json_decode.field("keyChainIdx", WalletTypes.AccountKeyChainIndex[/* decode */4], raw),
          /* nCoSigners */Json_decode.field("nCoSigners", Json_decode.$$int, raw),
          /* custodianKeyChains */Json_decode.field("custodianKeyChains", (function (param) {
                  return Json_decode.list(partial_arg$1, param);
                }), raw)
        ];
}

exports.defaultCosignerList = defaultCosignerList;
exports.make = make;
exports.Address = Address;
exports.custodianKeyChains = custodianKeyChains;
exports.lookupKeyChain = lookupKeyChain;
exports.find = find;
exports.encode = encode$1;
exports.decode = decode$1;
/* Utils Not a pure module */