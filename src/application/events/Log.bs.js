// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Json = require("bs-json/src/Json.js");
var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("../../utils/Utils.bs.js");
var Json_decode = require("bs-json/src/Json_decode.js");
var Json_encode = require("bs-json/src/Json_encode.js");
var BitcoinjsLib = require("bitcoinjs-lib");

function Make(funarg) {
  var make = function () {
    return /* [] */0;
  };
  var makeItemHash = function (issuerPubKey, $$event) {
    var issuerPubKeyHash = BitcoinjsLib.crypto.sha256(issuerPubKey);
    var eventHash = BitcoinjsLib.crypto.sha256(Json.stringify(Curry._1(funarg[/* encode */0], $$event)));
    return BitcoinjsLib.crypto.sha256(Buffer.concat(/* array */[
                      issuerPubKeyHash,
                      eventHash
                    ]).toString());
  };
  var makeItem = function (issuerKeyPair, $$event) {
    var issuerPubKey = Utils.publicKeyFromKeyPair(issuerKeyPair);
    var hashBuffer = makeItemHash(issuerPubKey, $$event);
    return /* record */[
            /* event */$$event,
            /* hash */Utils.bufToHex(hashBuffer),
            /* issuerPubKey */issuerPubKey,
            /* signature */issuerKeyPair.sign(hashBuffer)
          ];
  };
  var append = function (issuer, $$event, log) {
    var item = makeItem(issuer, $$event);
    return /* tuple */[
            item,
            /* :: */[
              item,
              log
            ]
          ];
  };
  var appendItem = function (item, log) {
    return /* :: */[
            item,
            log
          ];
  };
  var reduce = function (reducer, start, log) {
    return List.fold_left(reducer, start, List.rev(log));
  };
  var findNewItems = function (others, log) {
    var existingHashes = List.rev_map((function (param) {
            return param[/* hash */1];
          }), log);
    return List.find_all((function (param) {
                    var issuerPubKey = param[/* issuerPubKey */2];
                    var hashCheck = makeItemHash(issuerPubKey, param[/* event */0]);
                    if (Utils.bufToHex(hashCheck) !== param[/* hash */1]) {
                      return false;
                    } else {
                      return Utils.keyFromPublicKey(issuerPubKey).verify(hashCheck, param[/* signature */3]);
                    }
                  }))(List.rev_map((function (param) {
                      return param[1];
                    }), List.fold_left((function (found, other) {
                          return List.fold_left((function (found, item) {
                                        var hash = item[/* hash */1];
                                        if (List.mem_assoc(hash, found) || List.mem(hash, existingHashes)) {
                                          return found;
                                        } else {
                                          return /* :: */[
                                                  /* tuple */[
                                                    hash,
                                                    item
                                                  ],
                                                  found
                                                ];
                                        }
                                      }), found, List.rev(other));
                        }), /* [] */0, others)));
  };
  var getSummary = function (log) {
    return /* record */[/* knownItems */List.fold_left((function (items, param) {
                    return /* :: */[
                            param[/* hash */1],
                            items
                          ];
                  }), /* [] */0, log)];
  };
  var encodeSummary = function (summary) {
    return Json_encode.object_(/* :: */[
                /* tuple */[
                  "knownItems",
                  Json_encode.list((function (prim) {
                          return prim;
                        }), summary[/* knownItems */0])
                ],
                /* [] */0
              ]);
  };
  var item = function (item$1) {
    return Json_encode.object_(/* :: */[
                /* tuple */[
                  "event",
                  Curry._1(funarg[/* encode */0], item$1[/* event */0])
                ],
                /* :: */[
                  /* tuple */[
                    "issuerPubKey",
                    item$1[/* issuerPubKey */2]
                  ],
                  /* :: */[
                    /* tuple */[
                      "hash",
                      item$1[/* hash */1]
                    ],
                    /* :: */[
                      /* tuple */[
                        "signature",
                        Utils.signatureToString(item$1[/* signature */3])
                      ],
                      /* [] */0
                    ]
                  ]
                ]
              ]);
  };
  var log = function (param) {
    return Json_encode.list(item, param);
  };
  var ecSig = function (ecSig$1) {
    return Utils.signatureFromString(Json_decode.string(ecSig$1));
  };
  var item$1 = function (item$2) {
    return /* record */[
            /* event */Json_decode.field("event", funarg[/* decode */1], item$2),
            /* hash */Json_decode.field("hash", Json_decode.string, item$2),
            /* issuerPubKey */Json_decode.field("issuerPubKey", Json_decode.string, item$2),
            /* signature */Json_decode.field("signature", ecSig, item$2)
          ];
  };
  var log$1 = function (param) {
    return Json_decode.list(item$1, param);
  };
  return [
          make,
          append,
          appendItem,
          reduce,
          findNewItems,
          List.length,
          log,
          log$1,
          getSummary,
          encodeSummary
        ];
}

exports.Make = Make;
/* Utils Not a pure module */
