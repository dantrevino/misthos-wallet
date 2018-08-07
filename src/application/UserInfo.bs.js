// Generated by BUCKLESCRIPT VERSION 4.0.3, PLEASE EDIT WITH CARE
'use strict';

var Json = require("@glennsl/bs-json/src/Json.bs.js");
var Utils = require("../utils/Utils.bs.js");
var $$String = require("bs-platform/lib/js/string.js");
var Bitcoin = require("../ffi/Bitcoin.bs.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Network = require("./wallet/Network.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Blockstack = require("../ffi/Blockstack.bs.js");
var Blockstack$1 = require("blockstack");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var Belt_MapString = require("bs-platform/lib/js/belt_MapString.js");
var PrimitiveTypes = require("./PrimitiveTypes.bs.js");

var infoFileName = "public.json";

function encode(data) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "appPubKey",
                data[/* appPubKey */0]
              ],
              /* :: */[
                /* tuple */[
                  "termsAndConditions",
                  Js_dict.fromArray(Belt_Array.mapU(Belt_MapString.toArray(data[/* termsAndConditions */1]), (function (param) {
                              return /* tuple */[
                                      param[0],
                                      param[1]
                                    ];
                            })))
                ],
                /* [] */0
              ]
            ]);
}

function decode(raw) {
  return /* record */[
          /* appPubKey */Json_decode.field("appPubKey", Json_decode.string, raw),
          /* termsAndConditions */Json_decode.withDefault(Belt_MapString.empty, (function (raw) {
                  return Belt_MapString.fromArray(Js_dict.entries(Json_decode.field("termsAndConditions", (function (param) {
                                        return Json_decode.dict(Json_decode.string, param);
                                      }), raw)));
                }), raw)
        ];
}

function init(appPubKey) {
  var res = /* record */[
    /* appPubKey */appPubKey,
    /* termsAndConditions */Belt_MapString.empty
  ];
  return Blockstack$1.putFile(infoFileName, Json.stringify(encode(res)), ( {"encrypt": false} )).then((function () {
                return Promise.resolve(res);
              }));
}

function read(username) {
  return Blockstack.getFileFromUser(infoFileName, username).then((function (nullFile) {
                  if (nullFile == null) {
                    return Promise.resolve(/* NotFound */0);
                  } else {
                    return Promise.resolve(/* Ok */[decode(Json.parseOrRaise(nullFile))]);
                  }
                })).catch((function (error) {
                Utils.printError("Couldn't fetch public.json", error);
                return Promise.resolve(/* NotFound */0);
              }));
}

function hasSignedTAC(tacHash, userInfo) {
  var match = Belt_MapString.get(userInfo[/* termsAndConditions */1], tacHash);
  if (match !== undefined) {
    var signature = Utils.signatureFromDER(match);
    return Utils.keyFromPublicKey(userInfo[/* appPubKey */0]).verify(Utils.bufFromHex(tacHash), signature);
  } else {
    return false;
  }
}

function signTAC(tacHash, privateKey, network, userInfo) {
  var keyPair = Utils.keyPairFromPrivateKey(Network.bitcoinNetwork(network), privateKey);
  var signature = Utils.signatureToDER(keyPair.sign(Utils.bufFromHex(tacHash)));
  var info = /* record */[
    /* appPubKey */userInfo[/* appPubKey */0],
    /* termsAndConditions */Belt_MapString.set(userInfo[/* termsAndConditions */1], tacHash, signature)
  ];
  return Blockstack$1.putFile(infoFileName, Json.stringify(encode(info)), ( {"encrypt": false} )).then((function () {
                return Promise.resolve(info);
              }));
}

var infoFileName$1 = "private.json";

function encode$1(data) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "chainCode",
                Utils.bufToHex(data[/* chainCode */0])
              ],
              /* [] */0
            ]);
}

function decode$1(raw) {
  return /* record */[/* chainCode */Utils.bufFromHex(Json_decode.field("chainCode", Json_decode.string, raw))];
}

function persist(chainCode) {
  return Blockstack$1.putFile(infoFileName$1, Json.stringify(encode$1(/* record */[/* chainCode */chainCode]))).then((function () {
                return Promise.resolve(/* record */[/* chainCode */chainCode]);
              }));
}

function read$1() {
  return Blockstack$1.getFile(infoFileName$1).then((function (nullFile) {
                  if (nullFile == null) {
                    return Promise.resolve(/* NotFound */0);
                  } else {
                    return Promise.resolve(/* Ok */[decode$1(Json.parseOrRaise(nullFile))]);
                  }
                })).catch((function (error) {
                Utils.printError("Couldn't fetch private.json", error);
                return Promise.resolve(/* NotFound */0);
              }));
}

function getOrInit(appPubKey, userId) {
  return Promise.all(/* tuple */[
                read$1(/* () */0),
                read(PrimitiveTypes.UserId[/* toString */0](userId))
              ]).then((function (param) {
                var match = param[0];
                var exit = 0;
                if (match) {
                  var match$1 = param[1];
                  if (match$1) {
                    return Promise.resolve(/* tuple */[
                                match[0],
                                match$1[0]
                              ]);
                  } else {
                    exit = 1;
                  }
                } else {
                  exit = 1;
                }
                if (exit === 1) {
                  return init(appPubKey).then((function (pub) {
                                return persist(Utils.bufFromHex($$String.sub(appPubKey, 0, 64))).then((function (priv) {
                                              return Promise.resolve(/* tuple */[
                                                          priv,
                                                          pub
                                                        ]);
                                            }));
                              }));
                }
                
              }));
}

function storagePrefix(appPubKey) {
  return Bitcoin.Address[/* fromKeyPair */1](BitcoinjsLib.ECPair.fromPublicKey(Utils.bufFromHex(appPubKey)));
}

var Public = [read];

var Private = [];

exports.Public = Public;
exports.hasSignedTAC = hasSignedTAC;
exports.signTAC = signTAC;
exports.Private = Private;
exports.storagePrefix = storagePrefix;
exports.getOrInit = getOrInit;
/* Utils Not a pure module */
