// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Policy = require("../../src/application/Policy.bs.js");
var Generators = require("../helpers/Generators.bs.js");
var PrimitiveTypes = require("../../src/application/PrimitiveTypes.bs.js");
var Venture__Validation = require("../../src/application/Venture__Validation.bs.js");

function constructState(log) {
  return Generators.Log[/* reduce */0]((function (s, item) {
                return Venture__Validation.apply(item, s);
              }), Venture__Validation.make(/* () */0), log);
}

function testValidationResult(state, item, expected) {
  var description = Venture__Validation.resultToString(expected);
  return Jest.test("valdation should return '" + (description + "'"), (function () {
                return Jest.Expect[/* toEqual */12](description, Jest.Expect[/* expect */0](Venture__Validation.resultToString(Venture__Validation.validate(state, item))));
              }));
}

describe("CreateVenture", (function () {
        describe("as first event", (function () {
                var user1 = Generators.userSession(PrimitiveTypes.UserId[/* fromString */1]("user1"));
                var log = Generators.Log[/* createVenture */7](user1);
                return testValidationResult(Venture__Validation.make(/* () */0), Generators.Log[/* lastItem */2](log), /* Ok */0);
              }));
        describe("not as first event", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user2 = match[1];
                var log = Generators.Log[/* createVenture */7](match[0]);
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](Generators.Log[/* appendEvent */5](user2[/* issuerKeyPair */2], /* VentureCreated */Block.__(0, [Generators.Event[/* createVenture */0](user2)]), log)), /* BadData */["Venture is already created"]);
              }));
        return /* () */0;
      }));

describe("Any proposal type", (function () {
        describe("when submitting the identical proposal twice", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user2 = match[1];
                var user1 = match[0];
                var eta = Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1));
                var func = Generators.Log[/* withPartnerProposed */8];
                var log = Curry._1((function (param, param$1, param$2) {
                          return Curry._5(func, param, param$1, param$2, user1, user2);
                        })(/* None */0, /* None */0, /* None */0), eta);
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](log), /* Ignore */1);
              }));
        describe("with the wrong policy", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user2 = match[1];
                var user1 = match[0];
                var log = Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1));
                var func = Generators.Log[/* withPartnerProposed */8];
                var arg = /* Some */[Policy.unanimousMinusOne];
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](Curry._1((function (param, param$1) {
                                        return Curry._5(func, param, param$1, arg, user1, user2);
                                      })(/* None */0, /* None */0), log)), /* PolicyMissmatch */4);
              }));
        describe("when the supporter is a non-partner", (function () {
                var match = Generators.threeUserSessions(/* () */0);
                var user3 = match[2];
                var user2 = match[1];
                var user1 = match[0];
                var log = Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1));
                var func = Generators.Log[/* withPartnerProposed */8];
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](Curry._1((function (param, param$1, param$2) {
                                        return Curry._5(func, param, param$1, param$2, user2, user3);
                                      })(/* None */0, /* None */0, /* None */0), log)), /* InvalidIssuer */2);
              }));
        describe("when the supporter is not the signer", (function () {
                var match = Generators.threeUserSessions(/* () */0);
                var user3 = match[2];
                var user2 = match[1];
                var user1 = match[0];
                var log = Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1));
                var func = Generators.Log[/* withPartnerProposed */8];
                var arg = /* Some */[user1[/* issuerKeyPair */2]];
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](Curry._1((function (param, param$1) {
                                        return Curry._5(func, param, arg, param$1, user2, user3);
                                      })(/* None */0, /* None */0), log)), /* InvalidIssuer */2);
              }));
        describe("when the proposal was already submitted by this partner", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user2 = match[1];
                var user1 = match[0];
                var eta = Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1));
                var func = Generators.Log[/* withPartnerProposed */8];
                var log = Curry._1((function (param, param$1, param$2) {
                          return Curry._5(func, param, param$1, param$2, user1, user2);
                        })(/* None */0, /* None */0, /* None */0), eta);
                var func$1 = Generators.Log[/* withPartnerProposed */8];
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](Curry._1((function (param, param$1, param$2) {
                                        return Curry._5(func$1, param, param$1, param$2, user1, user2);
                                      })(/* None */0, /* None */0, /* None */0), log)), /* BadData */["This proposal already exists"]);
              }));
        describe("when the same proposal was already made by another partner", (function () {
                var match = Generators.threeUserSessions(/* () */0);
                var user3 = match[2];
                var user2 = match[1];
                var user1 = match[0];
                var eta = Generators.Log[/* withPartner */11](user2, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1)));
                var func = Generators.Log[/* withPartnerProposed */8];
                var log = Curry._1((function (param, param$1, param$2) {
                          return Curry._5(func, param, param$1, param$2, user1, user3);
                        })(/* None */0, /* None */0, /* None */0), eta);
                var func$1 = Generators.Log[/* withPartnerProposed */8];
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](Curry._1((function (param, param$1, param$2) {
                                        return Curry._5(func$1, param, param$1, param$2, user2, user3);
                                      })(/* None */0, /* None */0, /* None */0), log)), /* Ok */0);
              }));
        return /* () */0;
      }));

describe("PartnerProposal", (function () {
        describe("when proposing another partner", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user2 = match[1];
                var user1 = match[0];
                var log = Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1));
                var func = Generators.Log[/* withPartnerProposed */8];
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](Curry._1((function (param, param$1, param$2) {
                                        return Curry._5(func, param, param$1, param$2, user1, user2);
                                      })(/* None */0, /* None */0, /* None */0), log)), /* Ok */0);
              }));
        describe("when the prospect is already a partner", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user2 = match[1];
                var user1 = match[0];
                var log = Generators.Log[/* withPartner */11](user2, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1)));
                var func = Generators.Log[/* withPartnerProposed */8];
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](Curry._1((function (param, param$1, param$2) {
                                        return Curry._5(func, param, param$1, param$2, user2, user1);
                                      })(/* None */0, /* None */0, /* None */0), log)), /* BadData */["Partner already exists"]);
              }));
        describe("when the creator proposes themselves", (function () {
                var user1 = Generators.userSession(PrimitiveTypes.UserId[/* fromString */1]("user1"));
                var log = Generators.Log[/* createVenture */7](user1);
                var func = Generators.Log[/* withPartnerProposed */8];
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](Curry._1((function (param, param$1, param$2) {
                                        return Curry._5(func, param, param$1, param$2, user1, user1);
                                      })(/* None */0, /* None */0, /* None */0), log)), /* Ok */0);
              }));
        describe("when proposing a partner that was removed", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user2 = match[1];
                var user1 = match[0];
                var log = Generators.Log[/* withPartnerRemoved */16](user2, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withPartner */11](user2, /* :: */[
                          user1,
                          /* [] */0
                        ], Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1))));
                var func = Generators.Log[/* withPartnerProposed */8];
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2](Curry._1((function (param, param$1, param$2) {
                                        return Curry._5(func, param, param$1, param$2, user1, user2);
                                      })(/* None */0, /* None */0, /* None */0), log)), /* Ok */0);
              }));
        describe("when the partner was removed but the proposal doesn't show it", (function () {
                var match = Generators.threeUserSessions(/* () */0);
                var user3 = match[2];
                var user2 = match[1];
                var user1 = match[0];
                var log = Generators.Log[/* withPartnerRemoved */16](user2, /* :: */[
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
                        ], Generators.Log[/* withPartner */11](user2, /* :: */[
                              user1,
                              /* [] */0
                            ], Generators.Log[/* withFirstPartner */12](user1)(Generators.Log[/* createVenture */7](user1)))));
                var func = Generators.Log[/* withPartnerProposed */8];
                var arg = function (param, param$1) {
                  return Curry._5(func, /* Some */[false], param, param$1, user3, user2);
                };
                return testValidationResult(constructState(log), Generators.Log[/* lastItem */2]((function (eta) {
                                    return Curry._1(arg(/* None */0, /* None */0), eta);
                                  })(log)), /* BadData */["Last removal doesn't match"]);
              }));
        return /* () */0;
      }));

var G = 0;

var E = 0;

var L = 0;

var Validation = 0;

exports.G = G;
exports.E = E;
exports.L = L;
exports.Validation = Validation;
exports.constructState = constructState;
exports.testValidationResult = testValidationResult;
/*  Not a pure module */