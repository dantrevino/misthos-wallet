// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Event = require("../../src/application/events/Event.bs.js");
var Fixtures = require("../helpers/Fixtures.bs.js");
var Generators = require("../helpers/Generators.bs.js");
var WalletTypes = require("../../src/application/wallet/WalletTypes.bs.js");
var PrimitiveTypes = require("../../src/application/PrimitiveTypes.bs.js");
var AccountKeyChain = require("../../src/application/wallet/AccountKeyChain.bs.js");
var ValidationHelpers = require("../helpers/ValidationHelpers.bs.js");
var Venture__Validation = require("../../src/application/Venture__Validation.bs.js");

describe(" AccountKeyChainIdentified", (function () {
        Fixtures.withCached(/* None */0, "AccountKeyChainIdentified", "when everything is fine", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                user1,
                                /* [] */0
                              ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1)))));
              }), (function (_, log) {
                return ValidationHelpers.testValidationResult(/* None */0, ValidationHelpers.constructState(log), Generators.Log[/* lastItem */4](Generators.Log[/* withAccountKeyChainIdentified */39](log)), /* Ok */0);
              }));
        Fixtures.withCached(/* None */0, "AccountKeyChainIdentified", "when the account doesn't exist", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                user1,
                                /* [] */0
                              ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1)))));
              }), (function (_, log) {
                var identified = Event.getAccountKeyChainIdentifiedExn(Generators.Log[/* lastEvent */5](Generators.Log[/* withAccountKeyChainIdentified */39](log)));
                var init = identified[/* keyChain */0];
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withSystemIssuer(Venture__Validation.validateAccountKeyChainIdentified, param, param$1);
                            }), ValidationHelpers.constructState(log), /* record */[/* keyChain : record */[
                              /* accountIdx */WalletTypes.AccountIndex[/* fromInt */1](1),
                              /* identifier */init[/* identifier */1],
                              /* nCoSigners */init[/* nCoSigners */2],
                              /* custodianKeyChains */init[/* custodianKeyChains */3]
                            ]], /* BadData */["Account doesn't exist"]);
              }));
        Fixtures.withCached(/* None */0, "AccountKeyChainIdentified", "when the AccountKeyChain is inconsistent", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                user1,
                                /* [] */0
                              ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1)))));
              }), (function (_, log) {
                var identified = Event.getAccountKeyChainIdentifiedExn(Generators.Log[/* lastEvent */5](Generators.Log[/* withAccountKeyChainIdentified */39](log)));
                var init = identified[/* keyChain */0];
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withSystemIssuer(Venture__Validation.validateAccountKeyChainIdentified, param, param$1);
                            }), ValidationHelpers.constructState(log), /* record */[/* keyChain : record */[
                              /* accountIdx */init[/* accountIdx */0],
                              /* identifier */"",
                              /* nCoSigners */init[/* nCoSigners */2],
                              /* custodianKeyChains */init[/* custodianKeyChains */3]
                            ]], /* BadData */["Inconsistent AccountKeyChain"]);
              }));
        Fixtures.withCached(/* None */0, "AccountKeyChainIdentified", "with an old custodian", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user2 = match[1];
                var user1 = match[0];
                return Generators.Log[/* withCustodianKeyChain */38](/* Some */[1], /* None */0, user1, Generators.Log[/* withPartnerRemoved */23](user2, /* :: */[
                                user1,
                                /* [] */0
                              ], Generators.Log[/* withCustodianRemoved */37](user2, /* :: */[
                                    user1,
                                    /* [] */0
                                  ], Generators.Log[/* withAccountKeyChainIdentified */39](Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user2, Generators.Log[/* withCustodian */33](user2, /* :: */[
                                                user1,
                                                /* :: */[
                                                  user2,
                                                  /* [] */0
                                                ]
                                              ], Generators.Log[/* withPartner */17](/* None */0, user2, /* :: */[
                                                    user1,
                                                    /* [] */0
                                                  ], Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                                            user1,
                                                            /* [] */0
                                                          ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))))))))))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user2 = match[1];
                var user1 = match[0];
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withSystemIssuer(Venture__Validation.validateAccountKeyChainIdentified, param, param$1);
                            }), ValidationHelpers.constructState(log), /* record */[/* keyChain */AccountKeyChain.make(WalletTypes.AccountIndex[/* default */9], /* :: */[
                                  /* tuple */[
                                    user1[/* userId */0],
                                    Generators.custodianKeyChain(/* None */0, Generators.Log[/* ventureId */2](log), 1, user1)
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      user2[/* userId */0],
                                      Generators.custodianKeyChain(/* None */0, Generators.Log[/* ventureId */2](log), 0, user2)
                                    ],
                                    /* [] */0
                                  ]
                                ])], /* BadData */["Custodians aren't current"]);
              }));
        return Fixtures.withCached(/* None */0, "AccountKeyChainIdentified", "when a CustodianKeyChain is unknown", (function () {
                      return Generators.withUserSessions(2);
                    }), (function (sessions) {
                      var match = Generators.twoUserSessionsFromArray(sessions);
                      var user1 = match[0];
                      return Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                      user1,
                                      /* [] */0
                                    ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1)))));
                    }), (function (sessions, log) {
                      var match = Generators.twoUserSessionsFromArray(sessions);
                      var user1 = match[0];
                      return ValidationHelpers.testDataValidation((function (param, param$1) {
                                    return ValidationHelpers.withSystemIssuer(Venture__Validation.validateAccountKeyChainIdentified, param, param$1);
                                  }), ValidationHelpers.constructState(log), /* record */[/* keyChain */AccountKeyChain.make(WalletTypes.AccountIndex[/* default */9], /* :: */[
                                        /* tuple */[
                                          user1[/* userId */0],
                                          Generators.custodianKeyChain(/* None */0, PrimitiveTypes.VentureId[/* make */10](/* () */0), 1, user1)
                                        ],
                                        /* [] */0
                                      ])], /* BadData */["Bad CustodianKeyChain"]);
                    }));
      }));

describe("AccountKeyChainActivated", (function () {
        Fixtures.withCached(/* None */0, "AccountKeyChainActivated", "when everything is fine", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withAccountKeyChainIdentified */39](Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                    user1,
                                    /* [] */0
                                  ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                return ValidationHelpers.testValidationResult(/* None */0, ValidationHelpers.constructState(log), Generators.Log[/* lastItem */4](Generators.Log[/* withAccountKeyChainActivated */40](/* None */0, match[0], log)), /* Ok */0);
              }));
        Fixtures.withCached(/* None */0, "AccountKeyChainActivated", "after a partner removal", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user2 = match[1];
                var user1 = match[0];
                return Generators.Log[/* withPartnerRemoved */23](user2, /* :: */[
                            user1,
                            /* [] */0
                          ], Generators.Log[/* withAccountKeyChainActivated */40](/* None */0, user1, Generators.Log[/* withAccountKeyChainActivated */40](/* None */0, user2, Generators.Log[/* withAccountKeyChainIdentified */39](Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user2, Generators.Log[/* withCustodian */33](user2, /* :: */[
                                                user1,
                                                /* :: */[
                                                  user2,
                                                  /* [] */0
                                                ]
                                              ], Generators.Log[/* withPartner */17](/* None */0, user2, /* :: */[
                                                    user1,
                                                    /* [] */0
                                                  ], Generators.Log[/* withAccountKeyChainActivated */40](/* None */0, user1, Generators.Log[/* withAccountKeyChainIdentified */39](Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                                                    user1,
                                                                    /* [] */0
                                                                  ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))))))))))))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                return ValidationHelpers.testValidationResult(/* None */0, ValidationHelpers.constructState(log), Generators.Log[/* lastItem */4](Generators.Log[/* withAccountKeyChainActivated */40](/* Some */[1], match[0], log)), /* Ok */0);
              }));
        Fixtures.withCached(/* None */0, "AccountKeyChainActivated", "when the account doesn't exist", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withAccountKeyChainIdentified */39](Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                    user1,
                                    /* [] */0
                                  ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                var activated = Event.getAccountKeyChainActivatedExn(Generators.Log[/* lastEvent */5](Generators.Log[/* withAccountKeyChainActivated */40](/* None */0, user1, log)));
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withIssuer(user1, Venture__Validation.validateAccountKeyChainActivated, param, param$1);
                            }), ValidationHelpers.constructState(log), /* record */[
                            /* accountIdx */WalletTypes.AccountIndex[/* fromInt */1](1),
                            /* custodianId */activated[/* custodianId */1],
                            /* identifier */activated[/* identifier */2],
                            /* sequence */activated[/* sequence */3]
                          ], /* BadData */["Account doesn't exist"]);
              }));
        Fixtures.withCached(/* None */0, "AccountKeyChainActivated", "when the issuer doesn't match", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withPartner */17](/* None */0, match[1], /* :: */[
                            user1,
                            /* [] */0
                          ], Generators.Log[/* withAccountKeyChainIdentified */39](Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                        user1,
                                        /* [] */0
                                      ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1)))))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user2 = match[1];
                var activated = Event.getAccountKeyChainActivatedExn(Generators.Log[/* lastEvent */5](Generators.Log[/* withAccountKeyChainActivated */40](/* None */0, match[0], log)));
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withIssuer(user2, Venture__Validation.validateAccountKeyChainActivated, param, param$1);
                            }), ValidationHelpers.constructState(log), activated, /* InvalidIssuer */2);
              }));
        Fixtures.withCached(/* None */0, "AccountKeyChainActivated", "when the issuer is not a custodian", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withPartner */17](/* None */0, match[1], /* :: */[
                            user1,
                            /* [] */0
                          ], Generators.Log[/* withAccountKeyChainIdentified */39](Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                        user1,
                                        /* [] */0
                                      ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1)))))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user2 = match[1];
                var activated = Event.getAccountKeyChainActivatedExn(Generators.Log[/* lastEvent */5](Generators.Log[/* withAccountKeyChainActivated */40](/* None */0, user2, log)));
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withIssuer(user2, Venture__Validation.validateAccountKeyChainActivated, param, param$1);
                            }), ValidationHelpers.constructState(log), activated, /* BadData */["Not a custodian"]);
              }));
        Fixtures.withCached(/* None */0, "AccountKeyChainActivated", "when the identifier is unknown", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withAccountKeyChainIdentified */39](Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                    user1,
                                    /* [] */0
                                  ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                var activated = Event.getAccountKeyChainActivatedExn(Generators.Log[/* lastEvent */5](Generators.Log[/* withAccountKeyChainActivated */40](/* None */0, user1, log)));
                return ValidationHelpers.testDataValidation((function (param, param$1) {
                              return ValidationHelpers.withIssuer(user1, Venture__Validation.validateAccountKeyChainActivated, param, param$1);
                            }), ValidationHelpers.constructState(log), /* record */[
                            /* accountIdx */activated[/* accountIdx */0],
                            /* custodianId */activated[/* custodianId */1],
                            /* identifier */"bad",
                            /* sequence */activated[/* sequence */3]
                          ], /* BadData */["Unknown AccountKeyChain identifier"]);
              }));
        return Fixtures.withCached(/* None */0, "AccountKeyChainActivated", "when the sequence is not in order", (function () {
                      return Generators.withUserSessions(2);
                    }), (function (sessions) {
                      var match = Generators.twoUserSessionsFromArray(sessions);
                      var user1 = match[0];
                      return Generators.Log[/* withAccountKeyChainIdentified */39](Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                          user1,
                                          /* [] */0
                                        ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))))));
                    }), (function (sessions, log) {
                      var match = Generators.twoUserSessionsFromArray(sessions);
                      var user1 = match[0];
                      var activated = Event.getAccountKeyChainActivatedExn(Generators.Log[/* lastEvent */5](Generators.Log[/* withAccountKeyChainActivated */40](/* None */0, user1, log)));
                      return ValidationHelpers.testDataValidation((function (param, param$1) {
                                    return ValidationHelpers.withIssuer(user1, Venture__Validation.validateAccountKeyChainActivated, param, param$1);
                                  }), ValidationHelpers.constructState(log), /* record */[
                                  /* accountIdx */activated[/* accountIdx */0],
                                  /* custodianId */activated[/* custodianId */1],
                                  /* identifier */activated[/* identifier */2],
                                  /* sequence */1
                                ], /* BadData */["AccountKeyChain sequence out of order"]);
                    }));
      }));

/*  Not a pure module */
