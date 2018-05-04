// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Event = require("./events/Event.bs.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var PrimitiveTypes = require("./PrimitiveTypes.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function make() {
  return /* record */[
          /* ventureName */"",
          /* systemIssuer */BitcoinjsLib.ECPair.makeRandom(),
          /* policies : [] */0,
          /* partnerIds : [] */0,
          /* custodianProcesses : [] */0,
          /* partnerRemovalProcesses : [] */0,
          /* custodianRemovalProcesses : [] */0,
          /* completedPartnerRemovalProcesses : [] */0
        ];
}

function systemIssuer(param) {
  return param[/* systemIssuer */1];
}

function ventureName(param) {
  return param[/* ventureName */0];
}

function currentPolicy(processName, param) {
  return List.assoc(processName, param[/* policies */2]);
}

function isPartner(id, param) {
  return List.mem(id, param[/* partnerIds */3]);
}

function custodianProcessForPartnerProcess(processId, param) {
  return List.find((function (param) {
                  return PrimitiveTypes.ProcessId[/* eq */5](processId, param[1][1]);
                }), param[/* custodianProcesses */4])[0];
}

function custodianProcessForPartner(partnerId, param) {
  return List.find((function (param) {
                  return PrimitiveTypes.UserId[/* eq */5](partnerId, param[1][0]);
                }), param[/* custodianProcesses */4])[0];
}

function custodianRemovalProcessForPartnerRemovalProcess(processId, param) {
  var custodianId = List.assoc(processId, param[/* partnerRemovalProcesses */5]);
  return List.assoc(custodianId, param[/* custodianRemovalProcesses */6]);
}

function lastRemovalProcessOfPartner(partnerId, param) {
  try {
    return /* Some */[List.assoc(partnerId, param[/* completedPartnerRemovalProcesses */7])];
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return /* None */0;
    } else {
      throw exn;
    }
  }
}

function apply($$event, state) {
  switch ($$event.tag | 0) {
    case 0 : 
        var match = $$event[0];
        var metaPolicy = match[/* metaPolicy */4];
        return /* record */[
                /* ventureName */match[/* ventureName */1],
                /* systemIssuer */match[/* systemIssuer */5],
                /* policies : :: */[
                  /* tuple */[
                    Event.Partner[/* Removal */5][/* processName */1],
                    /* UnanimousMinusOne */1
                  ],
                  /* :: */[
                    /* tuple */[
                      Event.Custodian[/* Removal */5][/* processName */1],
                      /* UnanimousMinusOne */1
                    ],
                    List.map((function (n) {
                            return /* tuple */[
                                    n,
                                    metaPolicy
                                  ];
                          }), /* :: */[
                          Event.Partner[/* processName */1],
                          /* :: */[
                            Event.AccountCreation[/* processName */1],
                            /* :: */[
                              Event.Custodian[/* processName */1],
                              /* :: */[
                                Event.Payout[/* processName */1],
                                /* [] */0
                              ]
                            ]
                          ]
                        ])
                  ]
                ],
                /* partnerIds */state[/* partnerIds */3],
                /* custodianProcesses */state[/* custodianProcesses */4],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */5],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */6],
                /* completedPartnerRemovalProcesses */state[/* completedPartnerRemovalProcesses */7]
              ];
    case 3 : 
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* partnerIds : :: */[
                  $$event[0][/* data */2][/* id */1],
                  state[/* partnerIds */3]
                ],
                /* custodianProcesses */state[/* custodianProcesses */4],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */5],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */6],
                /* completedPartnerRemovalProcesses */state[/* completedPartnerRemovalProcesses */7]
              ];
    case 4 : 
        var match$1 = $$event[0];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* partnerIds */state[/* partnerIds */3],
                /* custodianProcesses */state[/* custodianProcesses */4],
                /* partnerRemovalProcesses : :: */[
                  /* tuple */[
                    match$1[/* processId */0],
                    match$1[/* data */4][/* id */0]
                  ],
                  state[/* partnerRemovalProcesses */5]
                ],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */6],
                /* completedPartnerRemovalProcesses */state[/* completedPartnerRemovalProcesses */7]
              ];
    case 6 : 
        var match$2 = $$event[0];
        var id = match$2[/* data */2][/* id */0];
        var partial_arg = PrimitiveTypes.UserId[/* neq */6];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* partnerIds */List.filter((function (param) {
                          return partial_arg(id, param);
                        }))(state[/* partnerIds */3]),
                /* custodianProcesses */state[/* custodianProcesses */4],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */5],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */6],
                /* completedPartnerRemovalProcesses : :: */[
                  /* tuple */[
                    id,
                    match$2[/* processId */0]
                  ],
                  state[/* completedPartnerRemovalProcesses */7]
                ]
              ];
    case 10 : 
        var match$3 = $$event[0];
        var match$4 = match$3[/* data */4];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* partnerIds */state[/* partnerIds */3],
                /* custodianProcesses : :: */[
                  /* tuple */[
                    match$3[/* processId */0],
                    /* tuple */[
                      match$4[/* partnerId */0],
                      match$4[/* partnerApprovalProcess */1]
                    ]
                  ],
                  state[/* custodianProcesses */4]
                ],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */5],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */6],
                /* completedPartnerRemovalProcesses */state[/* completedPartnerRemovalProcesses */7]
              ];
    case 13 : 
        var match$5 = $$event[0];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* partnerIds */state[/* partnerIds */3],
                /* custodianProcesses */state[/* custodianProcesses */4],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */5],
                /* custodianRemovalProcesses : :: */[
                  /* tuple */[
                    match$5[/* data */4][/* custodianId */0],
                    match$5[/* processId */0]
                  ],
                  state[/* custodianRemovalProcesses */6]
                ],
                /* completedPartnerRemovalProcesses */state[/* completedPartnerRemovalProcesses */7]
              ];
    default:
      return state;
  }
}

exports.make = make;
exports.systemIssuer = systemIssuer;
exports.ventureName = ventureName;
exports.currentPolicy = currentPolicy;
exports.isPartner = isPartner;
exports.custodianProcessForPartnerProcess = custodianProcessForPartnerProcess;
exports.custodianProcessForPartner = custodianProcessForPartner;
exports.custodianRemovalProcessForPartnerRemovalProcess = custodianRemovalProcessForPartnerRemovalProcess;
exports.lastRemovalProcessOfPartner = lastRemovalProcessOfPartner;
exports.apply = apply;
/* Event Not a pure module */
