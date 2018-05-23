// Generated by BUCKLESCRIPT VERSION 3.1.1, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Event = require("../events/Event.bs.js");
var Utils = require("../../utils/Utils.bs.js");
var EventLog = require("../events/EventLog.bs.js");
var Caml_oo_curry = require("bs-platform/lib/js/caml_oo_curry.js");
var CamlinternalOO = require("bs-platform/lib/js/camlinternalOO.js");
var PrimitiveTypes = require("../PrimitiveTypes.bs.js");

var class_tables = [
  0,
  0,
  0
];

function make(param, param$1, log) {
  var acceptedPartnerId = param$1[/* data */2][/* id */1];
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
              var match = PrimitiveTypes.UserId[/* eq */5](env$1[3], env$1[0]);
              var tmp;
              if (match) {
                switch ($$event.tag | 0) {
                  case 14 : 
                      var match$1 = $$event[0];
                      var data = match$1[/* data */6];
                      var processId = match$1[/* processId */0];
                      if (PrimitiveTypes.UserId[/* eq */5](match$1[/* supporterId */4], env$1[0])) {
                        var init = self$1[state][0];
                        tmp = /* record */[
                          /* pendingEvent */init[/* pendingEvent */0],
                          /* custodianProcessId */init[/* custodianProcessId */1],
                          /* completed */true
                        ];
                      } else if (PrimitiveTypes.UserId[/* eq */5](data[/* partnerId */0], env$1[0]) && PrimitiveTypes.ProcessId[/* eq */5](data[/* partnerApprovalProcess */1], env$1[2])) {
                        var init$1 = self$1[state][0];
                        tmp = /* record */[
                          /* pendingEvent : Some */[/* tuple */[
                              env$1[1],
                              Event.makeCustodianEndorsed(processId, env$1[0])
                            ]],
                          /* custodianProcessId */processId,
                          /* completed */init$1[/* completed */2]
                        ];
                      } else {
                        tmp = self$1[state][0];
                      }
                      break;
                  case 16 : 
                      var match$2 = $$event[0];
                      if (PrimitiveTypes.ProcessId[/* eq */5](match$2[/* processId */0], self$1[state][0][/* custodianProcessId */1]) && PrimitiveTypes.UserId[/* eq */5](match$2[/* supporterId */1], env$1[0])) {
                        var init$2 = self$1[state][0];
                        tmp = /* record */[
                          /* pendingEvent : None */0,
                          /* custodianProcessId */init$2[/* custodianProcessId */1],
                          /* completed */true
                        ];
                      } else {
                        tmp = self$1[state][0];
                      }
                      break;
                  case 17 : 
                      if (PrimitiveTypes.ProcessId[/* eq */5]($$event[0][/* processId */0], self$1[state][0][/* custodianProcessId */1])) {
                        var init$3 = self$1[state][0];
                        tmp = /* record */[
                          /* pendingEvent : None */0,
                          /* custodianProcessId */init$3[/* custodianProcessId */1],
                          /* completed */true
                        ];
                      } else {
                        tmp = self$1[state][0];
                      }
                      break;
                  default:
                    tmp = self$1[state][0];
                }
              } else {
                var init$4 = self$1[state][0];
                tmp = /* record */[
                  /* pendingEvent : None */0,
                  /* custodianProcessId */init$4[/* custodianProcessId */1],
                  /* completed */true
                ];
              }
              self$1[state][0] = tmp;
              return /* () */0;
            }),
          processCompleted,
          (function (self$1, _) {
              return self$1[state][0][/* completed */2];
            }),
          pendingEvent,
          (function (self$1, _) {
              return Utils.mapOption((function (prim) {
                            return Promise.resolve(prim);
                          }), self$1[state][0][/* pendingEvent */0]);
            })
        ]);
    var env_init = function (env$1) {
      var self = CamlinternalOO.create_object_opt(0, $$class);
      self[state] = [/* record */[
          /* pendingEvent : None */0,
          /* custodianProcessId */PrimitiveTypes.ProcessId[/* make */10](/* () */0),
          /* completed */false
        ]];
      self[env] = env$1;
      return self;
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  var envs_000 = param[/* userId */0];
  var envs_001 = param[/* issuerKeyPair */2];
  var envs_002 = param$1[/* processId */0];
  var envs = [
    envs_000,
    envs_001,
    envs_002,
    acceptedPartnerId
  ];
  var $$process = Curry._1(class_tables[0], envs);
  Curry._3(EventLog.reduce, (function (_, item) {
          return Caml_oo_curry.js2(710435299, 1, $$process, item);
        }), /* () */0, log);
  return $$process;
}

exports.make = make;
/* Event Not a pure module */
