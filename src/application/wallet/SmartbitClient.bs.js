// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("./BTC.bs.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Fetch = require("bs-fetch/src/Fetch.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Caml_int64 = require("bs-platform/lib/js/caml_int64.js");
var Json_decode = require("bs-json/src/Json_decode.js");

function decodeUTXO(address, raw) {
  return /* record */[
          /* txId */Json_decode.field("txid", Json_decode.string, raw),
          /* txOutputN */Json_decode.field("n", Json_decode.$$int, raw),
          /* address */address,
          /* amount */BTC.fromSatoshis(Caml_int64.of_float(Json_decode.field("value_int", Json_decode.$$float, raw))),
          /* confirmations */Json_decode.field("confirmations", Json_decode.$$int, raw)
        ];
}

function decodeUTXOs(address, raw) {
  return Json_decode.withDefault(/* [] */0, (function (param) {
                return Json_decode.field("unspent", (function (param) {
                              return Json_decode.withDefault(/* [] */0, (function (param) {
                                            return Json_decode.list((function (param) {
                                                          return decodeUTXO(address, param);
                                                        }), param);
                                          }), param);
                            }), param);
              }), raw);
}

function decodeNextLink(raw) {
  return Json_decode.optional((function (param) {
                return Json_decode.field("paging", (function (param) {
                              return Json_decode.field("next_link", Json_decode.string, param);
                            }), param);
              }), raw);
}

function fetchAll(address, link, utxos) {
  if (link) {
    return fetch(link[0]).then((function (prim) {
                    return prim.json();
                  })).then((function (res) {
                  return fetchAll(address, decodeNextLink(res), List.append(decodeUTXOs(address, res), utxos));
                }));
  } else {
    return Promise.resolve(utxos);
  }
}

function getUTXOs(config, addresses) {
  return Promise.all($$Array.of_list(List.map((function (address) {
                          return fetchAll(address, /* Some */["https://" + (config[/* subdomain */0] + (".smartbit.com.au/v1/blockchain/address/" + (address + "/unspent?limit=1000")))], /* [] */0);
                        }), addresses))).then((function (all) {
                return Promise.resolve(List.flatten($$Array.to_list(all)));
              }));
}

function broadcastTransaction(config, transaction) {
  var txHex = transaction.toHex();
  return fetch("https://" + (config[/* subdomain */0] + ".smartbit.com.au/v1/blockchain/pushtx"), Fetch.RequestInit[/* make */0](/* Some */[/* Post */2], /* None */0, /* Some */["{\"hex\":\"" + (String(txHex) + "\"}")], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)).then((function (prim) {
                  return prim.json();
                })).then((function (res) {
                var err = Json_decode.optional((function (param) {
                        return Json_decode.field("error", (function (param) {
                                      return Json_decode.field("message", Json_decode.string, param);
                                    }), param);
                      }), res);
                var tmp;
                if (err) {
                  var err$1 = err[0];
                  tmp = (/transaction already in block chain/).test(err$1) ? /* AlreadyInBlockchain */0 : /* Error */Block.__(1, [err$1]);
                } else {
                  tmp = /* Ok */Block.__(0, [Json_decode.field("txId", Json_decode.string, res)]);
                }
                return Promise.resolve(tmp);
              }));
}

function make(config, network) {
  var getUTXOs$1 = function (param) {
    return getUTXOs(config, param);
  };
  var broadcastTransaction$1 = function (param) {
    return broadcastTransaction(config, param);
  };
  return /* module */[
          /* network */network,
          /* getUTXOs */getUTXOs$1,
          /* broadcastTransaction */broadcastTransaction$1
        ];
}

function decodeTransaction(raw) {
  return /* record */[
          /* txId */Json_decode.field("txid", Json_decode.string, raw),
          /* outputs */$$Array.to_list(Json_decode.field("outputs", (function (param) {
                      return Json_decode.array((function (output) {
                                    return /* record */[
                                            /* address */Caml_array.caml_array_get(Json_decode.field("addresses", (function (param) {
                                                        return Json_decode.array(Json_decode.string, param);
                                                      }), output), 0),
                                            /* amount */BTC.fromString(Json_decode.field("value", Json_decode.string, output))
                                          ];
                                  }), param);
                    }), raw))
        ];
}

var testnetConfig = /* record */[/* subdomain */"testnet-api"];

var mainnetConfig = /* record */[/* subdomain */"api"];

var float_ = Json_decode.$$float;

exports.testnetConfig = testnetConfig;
exports.mainnetConfig = mainnetConfig;
exports.float_ = float_;
exports.decodeUTXO = decodeUTXO;
exports.decodeUTXOs = decodeUTXOs;
exports.decodeNextLink = decodeNextLink;
exports.fetchAll = fetchAll;
exports.getUTXOs = getUTXOs;
exports.broadcastTransaction = broadcastTransaction;
exports.make = make;
exports.decodeTransaction = decodeTransaction;
/* BTC Not a pure module */
