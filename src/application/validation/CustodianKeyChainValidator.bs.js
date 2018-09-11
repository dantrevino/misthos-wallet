// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var CustodianKeyChain = require("../wallet/CustodianKeyChain.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function make() {
  return /* record */[
          /* keyChains : [] */0,
          /* allExist */(function (_, _$1) {
              return false;
            })
        ];
}

function update($$event, param) {
  var keyChains = param[/* keyChains */0];
  var keyChains$1;
  switch ($$event.tag | 0) {
    case 16 : 
        keyChains$1 = /* :: */[
          /* tuple */[
            $$event[0][/* data */2][/* accountIdx */0],
            /* [] */0
          ],
          keyChains
        ];
        break;
    case 38 : 
        var match = $$event[0];
        var keyChain = match[/* keyChain */2];
        var custodianId = match[/* custodianId */1];
        var accountIdx = CustodianKeyChain.accountIdx(keyChain);
        var accountChains = List.assoc(accountIdx, keyChains);
        var userChains;
        try {
          userChains = List.assoc(custodianId, accountChains);
        }
        catch (exn){
          if (exn === Caml_builtin_exceptions.not_found) {
            userChains = /* [] */0;
          } else {
            throw exn;
          }
        }
        keyChains$1 = /* :: */[
          /* tuple */[
            CustodianKeyChain.accountIdx(keyChain),
            /* :: */[
              /* tuple */[
                custodianId,
                /* :: */[
                  keyChain,
                  userChains
                ]
              ],
              List.remove_assoc(custodianId, accountChains)
            ]
          ],
          List.remove_assoc(accountIdx, keyChains)
        ];
        break;
    default:
      keyChains$1 = keyChains;
  }
  return /* record */[
          /* keyChains */keyChains$1,
          /* allExist */(function (accountIdx, testChains) {
              try {
                var accountChains = List.assoc(accountIdx, keyChains$1);
                return List.fold_left((function (r, v) {
                              if (r) {
                                return v;
                              } else {
                                return false;
                              }
                            }), true, List.map((function (param) {
                                  var chain = param[1];
                                  return List.exists((function (param) {
                                                return CustodianKeyChain.eq(chain, param);
                                              }), List.assoc(param[0], accountChains));
                                }), testChains));
              }
              catch (exn){
                if (exn === Caml_builtin_exceptions.not_found) {
                  return false;
                } else {
                  throw exn;
                }
              }
            })
        ];
}

exports.make = make;
exports.update = update;
/* CustodianKeyChain Not a pure module */
