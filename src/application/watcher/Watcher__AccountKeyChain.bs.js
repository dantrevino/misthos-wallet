// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Event = require("../events/Event.bs.js");
var Utils = require("../../utils/Utils.bs.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var EventLog = require("../events/EventLog.bs.js");
var WalletTypes = require("../wallet/WalletTypes.bs.js");
var Caml_oo_curry = require("bs-platform/lib/js/caml_oo_curry.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var CamlinternalOO = require("bs-platform/lib/js/camlinternalOO.js");
var AccountKeyChain = require("../wallet/AccountKeyChain.bs.js");
var CustodianKeyChain = require("../wallet/CustodianKeyChain.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var class_tables = [
  0,
  0,
  0
];

function make(param, log) {
  var accountIdx = param[/* data */2][/* accountIdx */0];
  if (!class_tables[0]) {
    var $$class = CamlinternalOO.create_table([
          "processCompleted",
          "receive",
          "pendingEvent"
        ]);
    var env = CamlinternalOO.new_variable($$class, "");
    var ids = CamlinternalOO.new_methods_variables($$class, [
          "receive",
          "processCompleted",
          "pendingEvent"
        ], ["state"]);
    var receive = ids[0];
    var processCompleted = ids[1];
    var pendingEvent = ids[2];
    var state = ids[3];
    CamlinternalOO.set_methods($$class, /* array */[
          receive,
          (function (self$1, param) {
              var env$1 = self$1[env];
              var $$event = param[/* event */0];
              var tmp;
              switch ($$event.tag | 0) {
                case 0 : 
                    var init = self$1[state][0];
                    tmp = /* record */[
                      /* systemIssuer */$$event[0][/* systemIssuer */5],
                      /* custodianKeyChains */init[/* custodianKeyChains */1],
                      /* nextKeyChainIdx */init[/* nextKeyChainIdx */2],
                      /* pendingEvent */init[/* pendingEvent */3]
                    ];
                    break;
                case 20 : 
                    var match = $$event[0][/* data */2];
                    var removedAccount = match[/* accountIdx */1];
                    if (WalletTypes.AccountIndex[/* eq */7](removedAccount, removedAccount)) {
                      try {
                        var custodianKeyChains = List.remove_assoc(match[/* custodianId */0], self$1[state][0][/* custodianKeyChains */1]);
                        var init$1 = self$1[state][0];
                        tmp = /* record */[
                          /* systemIssuer */init$1[/* systemIssuer */0],
                          /* custodianKeyChains */custodianKeyChains,
                          /* nextKeyChainIdx */init$1[/* nextKeyChainIdx */2],
                          /* pendingEvent : Some */[/* tuple */[
                              self$1[state][0][/* systemIssuer */0],
                              /* AccountKeyChainUpdated */Block.__(30, [Event.AccountKeyChainUpdated[/* make */0](AccountKeyChain.make(removedAccount, self$1[state][0][/* nextKeyChainIdx */2], custodianKeyChains))])
                            ]]
                        ];
                      }
                      catch (exn){
                        if (exn === Caml_builtin_exceptions.not_found) {
                          tmp = self$1[state][0];
                        } else {
                          throw exn;
                        }
                      }
                    } else {
                      tmp = self$1[state][0];
                    }
                    break;
                case 29 : 
                    var match$1 = $$event[0];
                    var keyChain = match$1[/* keyChain */2];
                    var partnerId = match$1[/* partnerId */1];
                    if (Caml_obj.caml_equal(CustodianKeyChain.accountIdx(keyChain), env$1[0])) {
                      var custodianKeyChains_000 = /* tuple */[
                        partnerId,
                        keyChain
                      ];
                      var custodianKeyChains_001 = List.remove_assoc(partnerId, self$1[state][0][/* custodianKeyChains */1]);
                      var custodianKeyChains$1 = /* :: */[
                        custodianKeyChains_000,
                        custodianKeyChains_001
                      ];
                      var init$2 = self$1[state][0];
                      tmp = /* record */[
                        /* systemIssuer */init$2[/* systemIssuer */0],
                        /* custodianKeyChains */custodianKeyChains$1,
                        /* nextKeyChainIdx */init$2[/* nextKeyChainIdx */2],
                        /* pendingEvent : Some */[/* tuple */[
                            self$1[state][0][/* systemIssuer */0],
                            /* AccountKeyChainUpdated */Block.__(30, [Event.AccountKeyChainUpdated[/* make */0](AccountKeyChain.make(env$1[0], self$1[state][0][/* nextKeyChainIdx */2], custodianKeyChains$1))])
                          ]]
                      ];
                    } else {
                      tmp = self$1[state][0];
                    }
                    break;
                case 30 : 
                    if (Caml_obj.caml_equal($$event[0][/* keyChain */0][/* accountIdx */0], env$1[0])) {
                      var init$3 = self$1[state][0];
                      tmp = /* record */[
                        /* systemIssuer */init$3[/* systemIssuer */0],
                        /* custodianKeyChains */init$3[/* custodianKeyChains */1],
                        /* nextKeyChainIdx */WalletTypes.AccountKeyChainIndex[/* next */3](self$1[state][0][/* nextKeyChainIdx */2]),
                        /* pendingEvent : None */0
                      ];
                    } else {
                      tmp = self$1[state][0];
                    }
                    break;
                default:
                  tmp = self$1[state][0];
              }
              self$1[state][0] = tmp;
              return /* () */0;
            }),
          processCompleted,
          (function (_, _$1) {
              return false;
            }),
          pendingEvent,
          (function (self$1, _) {
              return Utils.mapOption((function (prim) {
                            return Promise.resolve(prim);
                          }), self$1[state][0][/* pendingEvent */3]);
            })
        ]);
    var env_init = function (env$1) {
      var self = CamlinternalOO.create_object_opt(0, $$class);
      self[state] = [/* record */[
          /* systemIssuer */BitcoinjsLib.ECPair.makeRandom(),
          /* custodianKeyChains : [] */0,
          /* nextKeyChainIdx */WalletTypes.AccountKeyChainIndex[/* first */2],
          /* pendingEvent : None */0
        ]];
      self[env] = env$1;
      return self;
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  var envs = [accountIdx];
  var $$process = Curry._1(class_tables[0], envs);
  Curry._3(EventLog.reduce, (function (_, item) {
          return Caml_oo_curry.js2(710435299, 1, $$process, item);
        }), /* () */0, log);
  return $$process;
}

exports.make = make;
/* Event Not a pure module */
