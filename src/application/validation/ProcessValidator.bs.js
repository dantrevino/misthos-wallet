// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("../../utils/Utils.bs.js");
var Policy = require("../Policy.bs.js");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var PrimitiveTypes = require("../PrimitiveTypes.bs.js");

function make() {
  return /* record */[
          /* processes */PrimitiveTypes.ProcessId[/* makeMap */8](/* () */0),
          /* currentPartners */PrimitiveTypes.UserId[/* emptySet */9],
          /* exists */(function () {
              return false;
            }),
          /* completed */(function () {
              return false;
            }),
          /* isEligible */(function (_, _$1) {
              return false;
            }),
          /* didVote */(function (_, _$1) {
              return false;
            }),
          /* policyFulfilled */(function () {
              return false;
            }),
          /* canPolicyBeFulfilled */(function () {
              return false;
            })
        ];
}

function addProposal(param, map) {
  return Belt_Map.set(map, param[/* processId */0], /* record */[
              /* status : InProgress */0,
              /* supporterIds */PrimitiveTypes.UserId[/* emptySet */9],
              /* rejectorIds */PrimitiveTypes.UserId[/* emptySet */9],
              /* eligibleWhenProposing */param[/* eligibleWhenProposing */3],
              /* policy */param[/* policy */5]
            ]);
}

function addEndorsement(param, map) {
  var supporterId = param[/* supporterId */1];
  return Belt_Map.update(map, param[/* processId */0], (function (param) {
                return Utils.mapOption((function ($$process) {
                              return /* record */[
                                      /* status */$$process[/* status */0],
                                      /* supporterIds */Belt_Set.add($$process[/* supporterIds */1], supporterId),
                                      /* rejectorIds */$$process[/* rejectorIds */2],
                                      /* eligibleWhenProposing */$$process[/* eligibleWhenProposing */3],
                                      /* policy */$$process[/* policy */4]
                                    ];
                            }), param);
              }));
}

function addRejection(param, map) {
  var rejectorId = param[/* rejectorId */1];
  return Belt_Map.update(map, param[/* processId */0], (function (param) {
                return Utils.mapOption((function ($$process) {
                              return /* record */[
                                      /* status */$$process[/* status */0],
                                      /* supporterIds */$$process[/* supporterIds */1],
                                      /* rejectorIds */Belt_Set.add($$process[/* rejectorIds */2], rejectorId),
                                      /* eligibleWhenProposing */$$process[/* eligibleWhenProposing */3],
                                      /* policy */$$process[/* policy */4]
                                    ];
                            }), param);
              }));
}

function addAcceptance(param, map) {
  return Belt_Map.update(map, param[/* processId */0], (function (param) {
                return Utils.mapOption((function ($$process) {
                              return /* record */[
                                      /* status : Accepted */1,
                                      /* supporterIds */$$process[/* supporterIds */1],
                                      /* rejectorIds */$$process[/* rejectorIds */2],
                                      /* eligibleWhenProposing */$$process[/* eligibleWhenProposing */3],
                                      /* policy */$$process[/* policy */4]
                                    ];
                            }), param);
              }));
}

function addDenial(param, map) {
  return Belt_Map.update(map, param[/* processId */0], (function (param) {
                return Utils.mapOption((function ($$process) {
                              return /* record */[
                                      /* status : Denied */2,
                                      /* supporterIds */$$process[/* supporterIds */1],
                                      /* rejectorIds */$$process[/* rejectorIds */2],
                                      /* eligibleWhenProposing */$$process[/* eligibleWhenProposing */3],
                                      /* policy */$$process[/* policy */4]
                                    ];
                            }), param);
              }));
}

function update($$event, state) {
  var currentPartners = state[/* currentPartners */1];
  var processes = state[/* processes */0];
  var match;
  var exit = 0;
  switch ($$event.tag | 0) {
    case 5 : 
        var acceptance = $$event[0];
        match = /* record */[
          /* processes */addAcceptance(acceptance, processes),
          /* currentPartners */Belt_Set.add(currentPartners, acceptance[/* data */2][/* id */1]),
          /* exists */state[/* exists */2],
          /* completed */state[/* completed */3],
          /* isEligible */state[/* isEligible */4],
          /* didVote */state[/* didVote */5],
          /* policyFulfilled */state[/* policyFulfilled */6],
          /* canPolicyBeFulfilled */state[/* canPolicyBeFulfilled */7]
        ];
        break;
    case 11 : 
        var acceptance$1 = $$event[0];
        match = /* record */[
          /* processes */addAcceptance(acceptance$1, processes),
          /* currentPartners */Belt_Set.remove(currentPartners, acceptance$1[/* data */2][/* id */0]),
          /* exists */state[/* exists */2],
          /* completed */state[/* completed */3],
          /* isEligible */state[/* isEligible */4],
          /* didVote */state[/* didVote */5],
          /* policyFulfilled */state[/* policyFulfilled */6],
          /* canPolicyBeFulfilled */state[/* canPolicyBeFulfilled */7]
        ];
        break;
    case 2 : 
    case 8 : 
    case 13 : 
    case 17 : 
    case 22 : 
    case 27 : 
        exit = 1;
        break;
    case 3 : 
    case 9 : 
    case 14 : 
    case 18 : 
    case 23 : 
    case 28 : 
        exit = 2;
        break;
    case 4 : 
    case 10 : 
    case 15 : 
    case 19 : 
    case 24 : 
    case 29 : 
        exit = 3;
        break;
    case 16 : 
    case 20 : 
    case 25 : 
    case 30 : 
        exit = 5;
        break;
    case 6 : 
    case 12 : 
    case 21 : 
    case 26 : 
    case 32 : 
        exit = 4;
        break;
    default:
      match = state;
  }
  switch (exit) {
    case 1 : 
        match = /* record */[
          /* processes */addProposal($$event[0], processes),
          /* currentPartners */state[/* currentPartners */1],
          /* exists */state[/* exists */2],
          /* completed */state[/* completed */3],
          /* isEligible */state[/* isEligible */4],
          /* didVote */state[/* didVote */5],
          /* policyFulfilled */state[/* policyFulfilled */6],
          /* canPolicyBeFulfilled */state[/* canPolicyBeFulfilled */7]
        ];
        break;
    case 2 : 
        match = /* record */[
          /* processes */addRejection($$event[0], processes),
          /* currentPartners */state[/* currentPartners */1],
          /* exists */state[/* exists */2],
          /* completed */state[/* completed */3],
          /* isEligible */state[/* isEligible */4],
          /* didVote */state[/* didVote */5],
          /* policyFulfilled */state[/* policyFulfilled */6],
          /* canPolicyBeFulfilled */state[/* canPolicyBeFulfilled */7]
        ];
        break;
    case 3 : 
        match = /* record */[
          /* processes */addEndorsement($$event[0], processes),
          /* currentPartners */state[/* currentPartners */1],
          /* exists */state[/* exists */2],
          /* completed */state[/* completed */3],
          /* isEligible */state[/* isEligible */4],
          /* didVote */state[/* didVote */5],
          /* policyFulfilled */state[/* policyFulfilled */6],
          /* canPolicyBeFulfilled */state[/* canPolicyBeFulfilled */7]
        ];
        break;
    case 4 : 
        match = /* record */[
          /* processes */addDenial($$event[0], processes),
          /* currentPartners */state[/* currentPartners */1],
          /* exists */state[/* exists */2],
          /* completed */state[/* completed */3],
          /* isEligible */state[/* isEligible */4],
          /* didVote */state[/* didVote */5],
          /* policyFulfilled */state[/* policyFulfilled */6],
          /* canPolicyBeFulfilled */state[/* canPolicyBeFulfilled */7]
        ];
        break;
    case 5 : 
        match = /* record */[
          /* processes */addAcceptance($$event[0], processes),
          /* currentPartners */state[/* currentPartners */1],
          /* exists */state[/* exists */2],
          /* completed */state[/* completed */3],
          /* isEligible */state[/* isEligible */4],
          /* didVote */state[/* didVote */5],
          /* policyFulfilled */state[/* policyFulfilled */6],
          /* canPolicyBeFulfilled */state[/* canPolicyBeFulfilled */7]
        ];
        break;
    
  }
  var currentPartners$1 = match[/* currentPartners */1];
  var processes$1 = match[/* processes */0];
  return /* record */[
          /* processes */processes$1,
          /* currentPartners */currentPartners$1,
          /* exists */(function (param) {
              return Belt_Map.has(processes$1, param);
            }),
          /* completed */(function (processId) {
              var match = Belt_Map.getExn(processes$1, processId)[/* status */0];
              return match === 1;
            }),
          /* isEligible */(function (processId, partnerId) {
              return Belt_Set.has(Belt_Map.getExn(processes$1, processId)[/* eligibleWhenProposing */3], partnerId);
            }),
          /* didVote */(function (processId, partnerId) {
              var match = Belt_Map.getExn(processes$1, processId);
              if (Belt_Set.has(match[/* supporterIds */1], partnerId)) {
                return true;
              } else {
                return Belt_Set.has(match[/* rejectorIds */2], partnerId);
              }
            }),
          /* policyFulfilled */(function (processId) {
              var match = Belt_Map.getExn(processes$1, processId);
              var supporterIds = match[/* supporterIds */1];
              var arg = Belt_Set.intersect(currentPartners$1, match[/* eligibleWhenProposing */3]);
              return (function (param) {
                          return Curry._2(Policy.fulfilled(param), arg, supporterIds);
                        })(match[/* policy */4]);
            }),
          /* canPolicyBeFulfilled */(function (processId) {
              var match = Belt_Map.getExn(processes$1, processId);
              var rejectorIds = match[/* rejectorIds */2];
              var arg = Belt_Set.intersect(currentPartners$1, match[/* eligibleWhenProposing */3]);
              return (function (param) {
                          return Curry._2(Policy.canBeFulfilled(param), arg, rejectorIds);
                        })(match[/* policy */4]);
            })
        ];
}

exports.make = make;
exports.addProposal = addProposal;
exports.addEndorsement = addEndorsement;
exports.addRejection = addRejection;
exports.addAcceptance = addAcceptance;
exports.addDenial = addDenial;
exports.update = update;
/* Utils Not a pure module */
