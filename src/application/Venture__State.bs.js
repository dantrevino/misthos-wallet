// Generated by BUCKLESCRIPT VERSION 4.0.4, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Event = require("./events/Event.bs.js");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var PrimitiveTypes = require("./PrimitiveTypes.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function make() {
  return /* record */[
          /* ventureName */"",
          /* systemIssuer */BitcoinjsLib.ECPair.makeRandom(),
          /* policies : [] */0,
          /* activePartnerProcesses */PrimitiveTypes.ProcessId[/* makeMap */8](/* () */0),
          /* currentPartners */PrimitiveTypes.UserId[/* emptySet */9],
          /* custodianProcesses : [] */0,
          /* partnerRemovalProcesses : [] */0,
          /* custodianRemovalProcesses : [] */0,
          /* custodianAccepted : [] */0,
          /* partnerRemovals : [] */0,
          /* custodianRemovals : [] */0,
          /* partnerAccepted : [] */0
        ];
}

function systemIssuer(param) {
  return param[/* systemIssuer */1];
}

function ventureName(param) {
  return param[/* ventureName */0];
}

function currentPartners(param) {
  return param[/* currentPartners */4];
}

function isPartner(userId, param) {
  return Belt_Set.has(param[/* currentPartners */4], userId);
}

function isPartnerProposalUnique(proposal, param) {
  return Belt_Map.someU(param[/* activePartnerProcesses */3], (function (_, param) {
                return PrimitiveTypes.UserId[/* eq */5](param[/* data */6][/* id */1], proposal[/* data */6][/* id */1]);
              })) === false;
}

function currentPolicy(processName, param) {
  return List.assoc(processName, param[/* policies */2]);
}

function custodianProcessForPartnerProcess(processId, param) {
  return List.find((function (param) {
                  return PrimitiveTypes.ProcessId[/* eq */5](processId, param[1]);
                }), param[/* custodianProcesses */5])[0];
}

function custodianAcceptedFor(partnerId, param) {
  try {
    return List.assoc(partnerId, param[/* custodianAccepted */8]);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return undefined;
    } else {
      throw exn;
    }
  }
}

function custodianRemovalProcessForPartnerRemovalProcess(processId, param) {
  try {
    var custodianId = List.assoc(processId, param[/* partnerRemovalProcesses */6]);
    return Js_primitive.some(List.assoc(custodianId, param[/* custodianRemovalProcesses */7]));
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return undefined;
    } else {
      throw exn;
    }
  }
}

function lastRemovalOfPartner(partnerId, param) {
  try {
    return List.assoc(partnerId, param[/* partnerRemovals */9]);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return undefined;
    } else {
      throw exn;
    }
  }
}

function lastRemovalOfCustodian(partnerId, param) {
  try {
    return List.assoc(partnerId, param[/* custodianRemovals */10]);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return undefined;
    } else {
      throw exn;
    }
  }
}

function lastPartnerAccepted(partnerId, param) {
  return List.assoc(partnerId, param[/* partnerAccepted */11]);
}

function apply($$event, state) {
  switch ($$event.tag | 0) {
    case 0 : 
        var match = $$event[0];
        var metaPolicy = match[/* metaPolicy */5];
        return /* record */[
                /* ventureName */match[/* ventureName */1],
                /* systemIssuer */match[/* systemIssuer */6],
                /* policies : :: */[
                  /* tuple */[
                    Event.Partner[/* Removal */9][/* processName */1],
                    /* UnanimousMinusOne */1
                  ],
                  /* :: */[
                    /* tuple */[
                      Event.Custodian[/* Removal */9][/* processName */1],
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
                /* activePartnerProcesses */state[/* activePartnerProcesses */3],
                /* currentPartners */state[/* currentPartners */4],
                /* custodianProcesses */state[/* custodianProcesses */5],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */6],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */7],
                /* custodianAccepted */state[/* custodianAccepted */8],
                /* partnerRemovals */state[/* partnerRemovals */9],
                /* custodianRemovals */state[/* custodianRemovals */10],
                /* partnerAccepted */state[/* partnerAccepted */11]
              ];
    case 1 : 
        var proposal = $$event[0];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* activePartnerProcesses */Belt_Map.set(state[/* activePartnerProcesses */3], proposal[/* processId */0], proposal),
                /* currentPartners */state[/* currentPartners */4],
                /* custodianProcesses */state[/* custodianProcesses */5],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */6],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */7],
                /* custodianAccepted */state[/* custodianAccepted */8],
                /* partnerRemovals */state[/* partnerRemovals */9],
                /* custodianRemovals */state[/* custodianRemovals */10],
                /* partnerAccepted */state[/* partnerAccepted */11]
              ];
    case 4 : 
        var $$event$1 = $$event[0];
        var id = $$event$1[/* data */2][/* id */1];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* activePartnerProcesses */Belt_Map.remove(state[/* activePartnerProcesses */3], $$event$1[/* processId */0]),
                /* currentPartners */Belt_Set.add(state[/* currentPartners */4], id),
                /* custodianProcesses */state[/* custodianProcesses */5],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */6],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */7],
                /* custodianAccepted */state[/* custodianAccepted */8],
                /* partnerRemovals */state[/* partnerRemovals */9],
                /* custodianRemovals */state[/* custodianRemovals */10],
                /* partnerAccepted : :: */[
                  /* tuple */[
                    id,
                    $$event$1
                  ],
                  state[/* partnerAccepted */11]
                ]
              ];
    case 5 : 
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* activePartnerProcesses */Belt_Map.remove(state[/* activePartnerProcesses */3], $$event[0][/* processId */0]),
                /* currentPartners */state[/* currentPartners */4],
                /* custodianProcesses */state[/* custodianProcesses */5],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */6],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */7],
                /* custodianAccepted */state[/* custodianAccepted */8],
                /* partnerRemovals */state[/* partnerRemovals */9],
                /* custodianRemovals */state[/* custodianRemovals */10],
                /* partnerAccepted */state[/* partnerAccepted */11]
              ];
    case 7 : 
        var match$1 = $$event[0];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* activePartnerProcesses */state[/* activePartnerProcesses */3],
                /* currentPartners */state[/* currentPartners */4],
                /* custodianProcesses */state[/* custodianProcesses */5],
                /* partnerRemovalProcesses : :: */[
                  /* tuple */[
                    match$1[/* processId */0],
                    match$1[/* data */6][/* id */0]
                  ],
                  state[/* partnerRemovalProcesses */6]
                ],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */7],
                /* custodianAccepted */state[/* custodianAccepted */8],
                /* partnerRemovals */state[/* partnerRemovals */9],
                /* custodianRemovals */state[/* custodianRemovals */10],
                /* partnerAccepted */state[/* partnerAccepted */11]
              ];
    case 10 : 
        var $$event$2 = $$event[0];
        var id$1 = $$event$2[/* data */2][/* id */0];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* activePartnerProcesses */state[/* activePartnerProcesses */3],
                /* currentPartners */Belt_Set.remove(state[/* currentPartners */4], id$1),
                /* custodianProcesses */state[/* custodianProcesses */5],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */6],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */7],
                /* custodianAccepted */state[/* custodianAccepted */8],
                /* partnerRemovals : :: */[
                  /* tuple */[
                    id$1,
                    $$event$2
                  ],
                  state[/* partnerRemovals */9]
                ],
                /* custodianRemovals */state[/* custodianRemovals */10],
                /* partnerAccepted */state[/* partnerAccepted */11]
              ];
    case 16 : 
        var match$2 = $$event[0];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* activePartnerProcesses */state[/* activePartnerProcesses */3],
                /* currentPartners */state[/* currentPartners */4],
                /* custodianProcesses : :: */[
                  /* tuple */[
                    match$2[/* processId */0],
                    match$2[/* data */6][/* partnerApprovalProcess */1]
                  ],
                  state[/* custodianProcesses */5]
                ],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */6],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */7],
                /* custodianAccepted */state[/* custodianAccepted */8],
                /* partnerRemovals */state[/* partnerRemovals */9],
                /* custodianRemovals */state[/* custodianRemovals */10],
                /* partnerAccepted */state[/* partnerAccepted */11]
              ];
    case 19 : 
        var $$event$3 = $$event[0];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* activePartnerProcesses */state[/* activePartnerProcesses */3],
                /* currentPartners */state[/* currentPartners */4],
                /* custodianProcesses */state[/* custodianProcesses */5],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */6],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */7],
                /* custodianAccepted : :: */[
                  /* tuple */[
                    $$event$3[/* data */2][/* partnerId */0],
                    $$event$3
                  ],
                  state[/* custodianAccepted */8]
                ],
                /* partnerRemovals */state[/* partnerRemovals */9],
                /* custodianRemovals */state[/* custodianRemovals */10],
                /* partnerAccepted */state[/* partnerAccepted */11]
              ];
    case 21 : 
        var match$3 = $$event[0];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* activePartnerProcesses */state[/* activePartnerProcesses */3],
                /* currentPartners */state[/* currentPartners */4],
                /* custodianProcesses */state[/* custodianProcesses */5],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */6],
                /* custodianRemovalProcesses : :: */[
                  /* tuple */[
                    match$3[/* data */6][/* custodianId */0],
                    match$3[/* processId */0]
                  ],
                  state[/* custodianRemovalProcesses */7]
                ],
                /* custodianAccepted */state[/* custodianAccepted */8],
                /* partnerRemovals */state[/* partnerRemovals */9],
                /* custodianRemovals */state[/* custodianRemovals */10],
                /* partnerAccepted */state[/* partnerAccepted */11]
              ];
    case 24 : 
        var $$event$4 = $$event[0];
        var match$4 = $$event$4[/* data */2];
        var lastCustodianProcess = match$4[/* lastCustodianProcess */2];
        return /* record */[
                /* ventureName */state[/* ventureName */0],
                /* systemIssuer */state[/* systemIssuer */1],
                /* policies */state[/* policies */2],
                /* activePartnerProcesses */state[/* activePartnerProcesses */3],
                /* currentPartners */state[/* currentPartners */4],
                /* custodianProcesses */state[/* custodianProcesses */5],
                /* partnerRemovalProcesses */state[/* partnerRemovalProcesses */6],
                /* custodianRemovalProcesses */state[/* custodianRemovalProcesses */7],
                /* custodianAccepted */List.filter((function (param) {
                          return PrimitiveTypes.ProcessId[/* neq */6](param[1][/* processId */0], lastCustodianProcess);
                        }))(state[/* custodianAccepted */8]),
                /* partnerRemovals */state[/* partnerRemovals */9],
                /* custodianRemovals : :: */[
                  /* tuple */[
                    match$4[/* custodianId */0],
                    $$event$4
                  ],
                  state[/* custodianRemovals */10]
                ],
                /* partnerAccepted */state[/* partnerAccepted */11]
              ];
    default:
      return state;
  }
}

exports.make = make;
exports.systemIssuer = systemIssuer;
exports.ventureName = ventureName;
exports.currentPolicy = currentPolicy;
exports.currentPartners = currentPartners;
exports.isPartner = isPartner;
exports.isPartnerProposalUnique = isPartnerProposalUnique;
exports.custodianAcceptedFor = custodianAcceptedFor;
exports.lastRemovalOfPartner = lastRemovalOfPartner;
exports.lastRemovalOfCustodian = lastRemovalOfCustodian;
exports.lastPartnerAccepted = lastPartnerAccepted;
exports.custodianProcessForPartnerProcess = custodianProcessForPartnerProcess;
exports.custodianRemovalProcessForPartnerRemovalProcess = custodianRemovalProcessForPartnerRemovalProcess;
exports.apply = apply;
/* Event Not a pure module */
