// Generated by BUCKLESCRIPT VERSION 4.0.3, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Event = require("./Event.bs.js");
var Utils = require("../../utils/Utils.bs.js");
var EventLog = require("./EventLog.bs.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var CamlinternalOO = require("bs-platform/lib/js/camlinternalOO.js");
var PrimitiveTypes = require("../PrimitiveTypes.bs.js");
var PayoutTransaction = require("../wallet/PayoutTransaction.bs.js");

var class_tables = [
  0,
  0,
  0
];

function make(param, log) {
  var payoutTx = param[/* data */2][/* payoutTx */1];
  var payoutProcess = param[/* processId */0];
  var match = Curry._3(EventLog.reduce, (function (param, param$1) {
          var $$event = param$1[/* event */0];
          var systemIssuer = param[2];
          var txs = param[1];
          var broadcast = param[0];
          switch ($$event.tag | 0) {
            case 0 : 
                return /* tuple */[
                        broadcast,
                        txs,
                        $$event[0][/* systemIssuer */5]
                      ];
            case 32 : 
                var match = $$event[0];
                if (PrimitiveTypes.ProcessId[/* eq */5](match[/* processId */0], payoutProcess)) {
                  return /* tuple */[
                          broadcast,
                          /* :: */[
                            match[/* payoutTx */2],
                            txs
                          ],
                          systemIssuer
                        ];
                } else {
                  return /* tuple */[
                          broadcast,
                          txs,
                          systemIssuer
                        ];
                }
            case 33 : 
                if (PrimitiveTypes.ProcessId[/* eq */5]($$event[0][/* processId */0], payoutProcess)) {
                  return /* tuple */[
                          false,
                          txs,
                          systemIssuer
                        ];
                } else {
                  return /* tuple */[
                          broadcast,
                          txs,
                          systemIssuer
                        ];
                }
            default:
              return /* tuple */[
                      broadcast,
                      txs,
                      systemIssuer
                    ];
          }
        }), /* tuple */[
        true,
        /* :: */[
          payoutTx,
          /* [] */0
        ],
        BitcoinjsLib.ECPair.makeRandom()
      ], log);
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
        ], [
          "finalTransaction",
          "delivered"
        ]);
    var receive = ids[0];
    var processCompleted = ids[1];
    var pendingEvent = ids[2];
    var finalTransaction = ids[3];
    var delivered = ids[4];
    CamlinternalOO.set_methods($$class, /* array */[
          receive,
          (function (self$1, param) {
              var $$event = param[/* event */0];
              if ($$event.tag === 33 && PrimitiveTypes.ProcessId[/* eq */5]($$event[0][/* processId */0], self$1[env][0])) {
                self$1[finalTransaction][0] = undefined;
                return /* () */0;
              } else {
                return /* () */0;
              }
            }),
          processCompleted,
          (function (self$1, _) {
              if (self$1[delivered][0]) {
                return true;
              } else {
                return Js_option.isNone(self$1[finalTransaction][0]);
              }
            }),
          pendingEvent,
          (function (self$1, _) {
              var env$1 = self$1[env];
              return Utils.mapOption((function (tx) {
                            return /* tuple */[
                                    env$1[4],
                                    /* PayoutFinalized */Block.__(33, [Curry._3(Event.Payout[/* Finalized */10][/* make */0], env$1[0], tx.getId(), /* record */[
                                              /* txHex */tx.toHex(),
                                              /* usedInputs */env$1[1],
                                              /* misthosFeeAddress */env$1[2],
                                              /* changeAddress */env$1[3]
                                            ])])
                                  ];
                          }), self$1[finalTransaction][0]);
            })
        ]);
    var env_init = function (env$1) {
      var self = CamlinternalOO.create_object_opt(0, $$class);
      self[finalTransaction] = /* record */[/* contents */env$1[1] ? Js_primitive.some(PayoutTransaction.finalize(env$1[2])) : undefined];
      self[delivered] = /* record */[/* contents */false];
      self[env] = env$1[0];
      return self;
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  return Curry._1(class_tables[0], [
              [
                payoutProcess,
                payoutTx[/* usedInputs */1],
                payoutTx[/* misthosFeeAddress */2],
                payoutTx[/* changeAddress */3],
                match[2]
              ],
              match[0],
              match[1]
            ]);
}

exports.make = make;
/* Event Not a pure module */
