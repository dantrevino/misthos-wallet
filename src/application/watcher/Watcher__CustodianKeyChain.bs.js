// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Event = require("../events/Event.bs.js");
var Utils = require("../../utils/Utils.bs.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var EventLog = require("../events/EventLog.bs.js");
var WalletTypes = require("../wallet/WalletTypes.bs.js");
var Caml_oo_curry = require("bs-platform/lib/js/caml_oo_curry.js");
var CamlinternalOO = require("bs-platform/lib/js/camlinternalOO.js");
var PrimitiveTypes = require("../PrimitiveTypes.bs.js");
var CustodianKeyChain = require("../wallet/CustodianKeyChain.bs.js");

var class_tables = [
  0,
  0,
  0
];

function make(param, param$1, log) {
  var match = param$1[/* data */3];
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
                      /* ventureId */$$event[0][/* ventureId */0],
                      /* pendingEvent */init[/* pendingEvent */1],
                      /* selfRemoved */init[/* selfRemoved */2],
                      /* nextKeyChainIdx */init[/* nextKeyChainIdx */3]
                    ];
                    break;
                case 8 : 
                    var match = $$event[0][/* data */3];
                    if (PrimitiveTypes.UserId[/* eq */5](env$1[1], match[/* id */0]) && PrimitiveTypes.ProcessId[/* eq */5](match[/* lastPartnerProcess */1], env$1[5])) {
                      var init$1 = self$1[state][0];
                      tmp = /* record */[
                        /* ventureId */init$1[/* ventureId */0],
                        /* pendingEvent : None */0,
                        /* selfRemoved */true,
                        /* nextKeyChainIdx */init$1[/* nextKeyChainIdx */3]
                      ];
                    } else {
                      var init$2 = self$1[state][0];
                      tmp = /* record */[
                        /* ventureId */init$2[/* ventureId */0],
                        /* pendingEvent : Some */[/* tuple */[
                            env$1[2],
                            /* CustodianKeyChainUpdated */Block.__(29, [Event.CustodianKeyChainUpdated[/* make */0](env$1[4], env$1[1], CustodianKeyChain.toPublicKeyChain(CustodianKeyChain.make(self$1[state][0][/* ventureId */0], env$1[6], self$1[state][0][/* nextKeyChainIdx */3], env$1[3])))])
                          ]],
                        /* selfRemoved */init$2[/* selfRemoved */2],
                        /* nextKeyChainIdx */init$2[/* nextKeyChainIdx */3]
                      ];
                    }
                    break;
                case 12 : 
                    if (Caml_obj.caml_equal($$event[0][/* data */3][/* accountIdx */0], env$1[6])) {
                      var init$3 = self$1[state][0];
                      tmp = /* record */[
                        /* ventureId */init$3[/* ventureId */0],
                        /* pendingEvent : Some */[/* tuple */[
                            env$1[2],
                            /* CustodianKeyChainUpdated */Block.__(29, [Event.CustodianKeyChainUpdated[/* make */0](env$1[4], env$1[1], CustodianKeyChain.toPublicKeyChain(CustodianKeyChain.make(self$1[state][0][/* ventureId */0], env$1[6], self$1[state][0][/* nextKeyChainIdx */3], env$1[3])))])
                          ]],
                        /* selfRemoved */init$3[/* selfRemoved */2],
                        /* nextKeyChainIdx */init$3[/* nextKeyChainIdx */3]
                      ];
                    } else {
                      tmp = self$1[state][0];
                    }
                    break;
                case 20 : 
                    var match$1 = $$event[0][/* data */3];
                    if (PrimitiveTypes.UserId[/* eq */5](match$1[/* custodianId */0], env$1[1]) && PrimitiveTypes.ProcessId[/* eq */5](match$1[/* lastCustodianProcess */2], env$1[4]) && WalletTypes.AccountIndex[/* eq */7](match$1[/* accountIdx */1], env$1[6])) {
                      var init$4 = self$1[state][0];
                      tmp = /* record */[
                        /* ventureId */init$4[/* ventureId */0],
                        /* pendingEvent : None */0,
                        /* selfRemoved */true,
                        /* nextKeyChainIdx */init$4[/* nextKeyChainIdx */3]
                      ];
                    } else {
                      tmp = self$1[state][0];
                    }
                    break;
                case 29 : 
                    var match$2 = $$event[0];
                    var keyChain = match$2[/* keyChain */2];
                    var custodian = match$2[/* custodianId */1];
                    if (PrimitiveTypes.UserId[/* eq */5](custodian, env$1[1]) && PrimitiveTypes.ProcessId[/* eq */5](env$1[4], match$2[/* custodianApprovalProcess */0]) && WalletTypes.AccountIndex[/* eq */7](CustodianKeyChain.accountIdx(keyChain), env$1[6])) {
                      var init$5 = self$1[state][0];
                      tmp = /* record */[
                        /* ventureId */init$5[/* ventureId */0],
                        /* pendingEvent : None */0,
                        /* selfRemoved */init$5[/* selfRemoved */2],
                        /* nextKeyChainIdx */WalletTypes.CustodianKeyChainIndex[/* next */2](self$1[state][0][/* nextKeyChainIdx */3])
                      ];
                    } else if (PrimitiveTypes.UserId[/* eq */5](custodian, env$1[1]) && WalletTypes.AccountIndex[/* eq */7](CustodianKeyChain.accountIdx(keyChain), env$1[6])) {
                      var init$6 = self$1[state][0];
                      tmp = /* record */[
                        /* ventureId */init$6[/* ventureId */0],
                        /* pendingEvent */Utils.mapOption((function () {
                                return /* tuple */[
                                        env$1[2],
                                        /* CustodianKeyChainUpdated */Block.__(29, [Event.CustodianKeyChainUpdated[/* make */0](env$1[4], env$1[1], CustodianKeyChain.toPublicKeyChain(CustodianKeyChain.make(self$1[state][0][/* ventureId */0], env$1[6], WalletTypes.CustodianKeyChainIndex[/* next */2](self$1[state][0][/* nextKeyChainIdx */3]), env$1[3])))])
                                      ];
                              }), self$1[state][0][/* pendingEvent */1]),
                        /* selfRemoved */init$6[/* selfRemoved */2],
                        /* nextKeyChainIdx */WalletTypes.CustodianKeyChainIndex[/* next */2](self$1[state][0][/* nextKeyChainIdx */3])
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
          (function (self$1, _) {
              var env$1 = self$1[env];
              if (PrimitiveTypes.UserId[/* neq */6](env$1[0], env$1[1])) {
                return true;
              } else {
                return self$1[state][0][/* selfRemoved */2];
              }
            }),
          pendingEvent,
          (function (self$1, _) {
              return Utils.mapOption((function (prim) {
                            return Promise.resolve(prim);
                          }), self$1[state][0][/* pendingEvent */1]);
            })
        ]);
    var env_init = function (env$1) {
      var self = CamlinternalOO.create_object_opt(0, $$class);
      self[state] = [/* record */[
          /* ventureId */PrimitiveTypes.VentureId[/* fromString */1](""),
          /* pendingEvent : None */0,
          /* selfRemoved */false,
          /* nextKeyChainIdx */WalletTypes.CustodianKeyChainIndex[/* first */8]
        ]];
      self[env] = env$1;
      return self;
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  var envs_000 = param[/* userId */0];
  var envs_001 = match[/* partnerId */0];
  var envs_002 = param[/* issuerKeyPair */2];
  var envs_003 = param[/* masterKeyChain */4];
  var envs_004 = param$1[/* processId */0];
  var envs_005 = match[/* partnerApprovalProcess */1];
  var envs_006 = match[/* accountIdx */3];
  var envs = [
    envs_000,
    envs_001,
    envs_002,
    envs_003,
    envs_004,
    envs_005,
    envs_006
  ];
  var $$process = Curry._1(class_tables[0], envs);
  Curry._3(EventLog.reduce, (function (_, item) {
          return Caml_oo_curry.js2(710435299, 1, $$process, item);
        }), /* () */0, log);
  return $$process;
}

exports.make = make;
/* Event Not a pure module */
