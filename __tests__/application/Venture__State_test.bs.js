// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Event = require("../../src/application/events/Event.bs.js");
var Generators = require("../helpers/Generators.bs.js");
var PrimitiveTypes = require("../../src/application/PrimitiveTypes.bs.js");
var Venture__State = require("../../src/application/Venture__State.bs.js");

function constructState(log) {
  return Generators.Log[/* reduce */0]((function (s, param) {
                return Venture__State.apply(param[/* event */0], s);
              }), Venture__State.make(/* () */0), log);
}

describe("CreateVenture", (function () {
        var user1 = Generators.userSession(PrimitiveTypes.UserId[/* fromString */1]("user1"));
        var log = Generators.Log[/* createVenture */7](user1);
        var match = Event.getVentureCreatedExn(Generators.Log[/* lastEvent */3](log));
        var systemIssuer = match[/* systemIssuer */5];
        var ventureName = match[/* ventureName */1];
        var state = constructState(log);
        Jest.test("extract ventureName", (function () {
                return Jest.Expect[/* toEqual */12](ventureName, Jest.Expect[/* expect */0](Venture__State.ventureName(state)));
              }));
        return Jest.test("extract systemIssuer", (function () {
                      return Jest.Expect[/* toEqual */12](systemIssuer, Jest.Expect[/* expect */0](Venture__State.systemIssuer(state)));
                    }));
      }));

describe("isPartner", (function () {
        var match = Generators.threeUserSessions(/* () */0);
        var user3 = match[2];
        var user2 = match[1];
        var user1 = match[0];
        var log = Generators.Log[/* withPartner */11](user2, /* :: */[
              user1,
              /* [] */0
            ], Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1)));
        Jest.test("tracks current partners", (function () {
                var state = constructState(log);
                return Jest.Expect[/* toEqual */12](/* :: */[
                            true,
                            /* :: */[
                              true,
                              /* :: */[
                                false,
                                /* [] */0
                              ]
                            ]
                          ], Jest.Expect[/* expect */0](List.map((function (param) {
                                      return Venture__State.isPartner(param[/* userId */0], state);
                                    }), /* :: */[
                                    user1,
                                    /* :: */[
                                      user2,
                                      /* :: */[
                                        user3,
                                        /* [] */0
                                      ]
                                    ]
                                  ])));
              }));
        return Jest.test("tracks partner when they are removed", (function () {
                      var log$1 = Generators.Log[/* withPartnerRemoved */16](user2, /* :: */[
                            user1,
                            /* :: */[
                              user3,
                              /* [] */0
                            ]
                          ], Generators.Log[/* withPartner */11](user3, /* :: */[
                                user1,
                                /* :: */[
                                  user2,
                                  /* [] */0
                                ]
                              ], log));
                      var state = constructState(log$1);
                      return Jest.Expect[/* toEqual */12](/* :: */[
                                  true,
                                  /* :: */[
                                    false,
                                    /* :: */[
                                      true,
                                      /* [] */0
                                    ]
                                  ]
                                ], Jest.Expect[/* expect */0](List.map((function (param) {
                                            return Venture__State.isPartner(param[/* userId */0], state);
                                          }), /* :: */[
                                          user1,
                                          /* :: */[
                                            user2,
                                            /* :: */[
                                              user3,
                                              /* [] */0
                                            ]
                                          ]
                                        ])));
                    }));
      }));

describe("ProcessMapping", (function () {
        var match = Generators.twoUserSessions(/* () */0);
        var user2 = match[1];
        var user1 = match[0];
        var eta = Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1));
        var func = Generators.Log[/* withPartnerProposed */8];
        var log = Curry._1((function (param, param$1) {
                  return Curry._4(func, param, param$1, user1, user2);
                })(/* None */0, /* None */0), eta);
        var match$1 = Event.getPartnerProposedExn(Generators.Log[/* lastEvent */3](log));
        var partnerProcess = match$1[/* processId */0];
        var log$1 = Generators.Log[/* withCustodianProposed */19](user1, user2, log);
        var match$2 = Event.getCustodianProposedExn(Generators.Log[/* lastEvent */3](log$1));
        var custodianProcess = match$2[/* processId */0];
        var state = constructState(log$1);
        return Jest.test("maps a partnerProcess to a custodianProcess", (function () {
                      return Jest.Expect[/* toEqual */12](custodianProcess, Jest.Expect[/* expect */0](Venture__State.custodianProcessForPartnerProcess(partnerProcess, state)));
                    }));
      }));

describe("ProcessMapping", (function () {
        var match = Generators.twoUserSessions(/* () */0);
        var user2 = match[1];
        var user1 = match[0];
        var log = Generators.Log[/* withCustodian */22](user2, /* :: */[
              user1,
              /* :: */[
                user2,
                /* [] */0
              ]
            ], Generators.Log[/* withPartner */11](user2, /* :: */[
                  user1,
                  /* [] */0
                ], Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1))));
        var custodianAccepted = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */3](log));
        var state = constructState(log);
        return Jest.test("Remembers the latest CustodianAccepted events", (function () {
                      return Jest.Expect[/* toEqual */12](custodianAccepted, Jest.Expect[/* expect */0](Venture__State.custodianAcceptedFor(user2[/* userId */0], state)));
                    }));
      }));

describe("RemovalProcessMapping", (function () {
        var match = Generators.twoUserSessions(/* () */0);
        var user2 = match[1];
        var user1 = match[0];
        var log = Generators.Log[/* withCustodianRemovalProposed */23](user1, user2, Generators.Log[/* withCustodian */22](user2, /* :: */[
                  user1,
                  /* :: */[
                    user2,
                    /* [] */0
                  ]
                ], Generators.Log[/* withPartner */11](user2, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1)))));
        var match$1 = Event.getCustodianRemovalProposedExn(Generators.Log[/* lastEvent */3](log));
        var custodianRemovalProcess = match$1[/* processId */0];
        var log$1 = Generators.Log[/* withPartnerRemovalProposed */13](user1, user2)(log);
        var match$2 = Event.getPartnerRemovalProposedExn(Generators.Log[/* lastEvent */3](log$1));
        var partnerRemovalProcess = match$2[/* processId */0];
        var state = constructState(log$1);
        return Jest.test("maps a partnerRemovalProcess to a custodianRemovalProcess", (function () {
                      return Jest.Expect[/* toEqual */12](custodianRemovalProcess, Jest.Expect[/* expect */0](Venture__State.custodianRemovalProcessForPartnerRemovalProcess(partnerRemovalProcess, state)));
                    }));
      }));

var G = 0;

var E = 0;

var L = 0;

var State = 0;

exports.G = G;
exports.E = E;
exports.L = L;
exports.State = State;
exports.constructState = constructState;
/*  Not a pure module */
