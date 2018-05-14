// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Event = require("../../src/application/events/Event.bs.js");
var Generators = require("../helpers/Generators.bs.js");
var WalletTypes = require("../../src/application/wallet/WalletTypes.bs.js");
var PrimitiveTypes = require("../../src/application/PrimitiveTypes.bs.js");
var ValidationHelpers = require("../helpers/ValidationHelpers.bs.js");
var Venture__Validation = require("../../src/application/Venture__Validation.bs.js");

describe("CustodianKeyChainUpdate", (function () {
        describe("when everything is fine", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user1 = match[0];
                var log = Generators.Log[/* withCustodian */27](user1, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withAccount */23](user1, Generators.Log[/* withFirstPartner */16](user1)(Generators.Log[/* createVenture */10](user1))));
                return ValidationHelpers.testValidationResult(ValidationHelpers.constructState(log), Generators.Log[/* lastItem */3](Generators.Log[/* withCustodianKeyChain */32](/* None */0, /* None */0, user1, log)), /* Ok */0);
              }));
        describe("when the signer doesn't match the custodianId", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user2 = match[1];
                var user1 = match[0];
                var log = Generators.Log[/* withPartner */15](user2, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withCustodian */27](user1, /* :: */[
                          user1,
                          /* [] */0
                        ], Generators.Log[/* withAccount */23](user1, Generators.Log[/* withFirstPartner */16](user1)(Generators.Log[/* createVenture */10](user1)))));
                return ValidationHelpers.testValidationResult(ValidationHelpers.constructState(log), Generators.Log[/* lastItem */3](Generators.Log[/* withCustodianKeyChain */32](/* None */0, /* Some */[user2], user1, log)), /* InvalidIssuer */2);
              }));
        describe("when the custodianApprovalProcess doesn't exist", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user1 = match[0];
                var log = Generators.Log[/* withCustodian */27](user1, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withAccount */23](user1, Generators.Log[/* withFirstPartner */16](user1)(Generators.Log[/* createVenture */10](user1))));
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withIssuer(user1, Venture__Validation.validateCustodianKeyChainUpdated, param, param$1);
                            }), ValidationHelpers.constructState(log), /* record */[
                            /* custodianApprovalProcess */PrimitiveTypes.ProcessId[/* make */9](/* () */0),
                            /* custodianId */user1[/* userId */0],
                            /* keyChain */Generators.custodianKeyChain(/* None */0, Generators.Log[/* ventureId */1](log), 0, user1)
                          ], /* BadData */["Bad custodianApprovalProcess"]);
              }));
        describe("when the custodianApprovalProcess isn't completed", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user1 = match[0];
                var log = Generators.Log[/* withCustodianProposed */24](user1, user1, Generators.Log[/* withAccount */23](user1, Generators.Log[/* withFirstPartner */16](user1)(Generators.Log[/* createVenture */10](user1))));
                var proposal = Event.getCustodianProposedExn(Generators.Log[/* lastEvent */4](log));
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withIssuer(user1, Venture__Validation.validateCustodianKeyChainUpdated, param, param$1);
                            }), ValidationHelpers.constructState(log), /* record */[
                            /* custodianApprovalProcess */proposal[/* processId */0],
                            /* custodianId */user1[/* userId */0],
                            /* keyChain */Generators.custodianKeyChain(/* None */0, Generators.Log[/* ventureId */1](log), 0, user1)
                          ], /* BadData */["Bad custodianApprovalProcess"]);
              }));
        describe("when the custodian approval process is for another user", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user2 = match[1];
                var user1 = match[0];
                var log = Generators.Log[/* withCustodian */27](user1, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withAccount */23](user1, Generators.Log[/* withFirstPartner */16](user1)(Generators.Log[/* createVenture */10](user1))));
                var accepted = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */4](log));
                var log$1 = Generators.Log[/* withPartner */15](user2, /* :: */[
                      user1,
                      /* [] */0
                    ], log);
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withIssuer(user2, Venture__Validation.validateCustodianKeyChainUpdated, param, param$1);
                            }), ValidationHelpers.constructState(log$1), /* record */[
                            /* custodianApprovalProcess */accepted[/* processId */0],
                            /* custodianId */user2[/* userId */0],
                            /* keyChain */Generators.custodianKeyChain(/* None */0, Generators.Log[/* ventureId */1](log$1), 0, user1)
                          ], /* BadData */["CustodianApprovalProcess is for another partner"]);
              }));
        describe("when the account doesn't exist", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user1 = match[0];
                var log = Generators.Log[/* withCustodian */27](user1, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withAccount */23](user1, Generators.Log[/* withFirstPartner */16](user1)(Generators.Log[/* createVenture */10](user1))));
                var accepted = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */4](log));
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withIssuer(user1, Venture__Validation.validateCustodianKeyChainUpdated, param, param$1);
                            }), ValidationHelpers.constructState(log), /* record */[
                            /* custodianApprovalProcess */accepted[/* processId */0],
                            /* custodianId */user1[/* userId */0],
                            /* keyChain */Generators.custodianKeyChain(/* Some */[WalletTypes.AccountIndex[/* fromInt */1](1)], Generators.Log[/* ventureId */1](log), 0, user1)
                          ], /* BadData */["Account doesn't exist"]);
              }));
        describe("when the key chain index isn't in order", (function () {
                var match = Generators.twoUserSessions(/* () */0);
                var user1 = match[0];
                var log = Generators.Log[/* withCustodian */27](user1, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withAccount */23](user1, Generators.Log[/* withFirstPartner */16](user1)(Generators.Log[/* createVenture */10](user1))));
                var accepted = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */4](log));
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withIssuer(user1, Venture__Validation.validateCustodianKeyChainUpdated, param, param$1);
                            }), ValidationHelpers.constructState(log), /* record */[
                            /* custodianApprovalProcess */accepted[/* processId */0],
                            /* custodianId */user1[/* userId */0],
                            /* keyChain */Generators.custodianKeyChain(/* None */0, Generators.Log[/* ventureId */1](log), 1, user1)
                          ], /* BadData */["CustodianKeyChainIndex isn't in order"]);
              }));
        return /* () */0;
      }));

/*  Not a pure module */
