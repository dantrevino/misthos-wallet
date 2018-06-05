// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Event = require("../../../src/application/events/Event.bs.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Fixtures = require("../../helpers/Fixtures.bs.js");
var Generators = require("../../helpers/Generators.bs.js");
var Caml_oo_curry = require("bs-platform/lib/js/caml_oo_curry.js");
var PrimitiveTypes = require("../../../src/application/PrimitiveTypes.bs.js");
var WatcherHelpers = require("../../helpers/WatcherHelpers.bs.js");
var CustodianKeyChain = require("../../../src/application/wallet/CustodianKeyChain.bs.js");
var Watcher__CustodianKeyChain = require("../../../src/application/watcher/Watcher__CustodianKeyChain.bs.js");

function keyChainEq(keyChainA, keyChainB) {
  return Caml_obj.caml_equal(CustodianKeyChain.encode(keyChainA), CustodianKeyChain.encode(keyChainB));
}

describe("Watcher__CustodianKeyChain", (function () {
        Fixtures.withCached(/* None */0, "Watcher__CustodianKeyChain", "Will create the initial keychain", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withCustodian */33](user1, /* :: */[
                            user1,
                            /* [] */0
                          ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                var acceptance = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */5](log));
                var watcher = Watcher__CustodianKeyChain.make(user1, acceptance, Generators.Log[/* eventLog */6](log));
                return WatcherHelpers.testWatcherHasEventPending("CustodianKeyChainUpdated", watcher, user1[/* issuerKeyPair */2], (function (param) {
                              if (param.tag === 37) {
                                var match = param[0];
                                if (PrimitiveTypes.ProcessId[/* eq */5](match[/* custodianApprovalProcess */0], acceptance[/* processId */0]) && PrimitiveTypes.UserId[/* eq */5](match[/* custodianId */1], user1[/* userId */0])) {
                                  return keyChainEq(Generators.custodianKeyChain(/* None */0, Generators.Log[/* ventureId */2](log), 0, user1), match[/* keyChain */2]);
                                } else {
                                  return false;
                                }
                              } else {
                                return false;
                              }
                            }));
              }));
        Fixtures.withCached(/* None */0, "Watcher__CustodianKeyChain", "Is idle when the keychain has been updated", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withCustodian */33](user1, /* :: */[
                            user1,
                            /* [] */0
                          ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                var acceptance = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */5](log));
                var watcher = Watcher__CustodianKeyChain.make(user1, acceptance, Generators.Log[/* eventLog */6](log));
                var log$1 = Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, log);
                Caml_oo_curry.js2(710435299, 1, watcher, Generators.Log[/* lastItem */4](log$1));
                return WatcherHelpers.testWatcherHasNoEventPending(watcher);
              }));
        Fixtures.withCached(/* None */0, "Watcher__CustodianKeyChain", "Will update the keychain when a partner is removed", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                return Generators.Log[/* withCustodian */33](user1, /* :: */[
                            user1,
                            /* [] */0
                          ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user2 = match[1];
                var user1 = match[0];
                var acceptance = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */5](log));
                var log$1 = Generators.Log[/* withPartnerRemoved */23](user2, /* :: */[
                      user1,
                      /* [] */0
                    ], Generators.Log[/* withPartner */17](/* None */0, user2, /* :: */[
                          user1,
                          /* [] */0
                        ], Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, log)));
                var watcher = Watcher__CustodianKeyChain.make(user1, acceptance, Generators.Log[/* eventLog */6](log$1));
                return WatcherHelpers.testWatcherHasEventPending("CustodianKeyChainUpdated", watcher, user1[/* issuerKeyPair */2], (function (param) {
                              if (param.tag === 37) {
                                var match = param[0];
                                if (PrimitiveTypes.ProcessId[/* eq */5](match[/* custodianApprovalProcess */0], acceptance[/* processId */0]) && PrimitiveTypes.UserId[/* eq */5](match[/* custodianId */1], user1[/* userId */0])) {
                                  return keyChainEq(Generators.custodianKeyChain(/* None */0, Generators.Log[/* ventureId */2](log$1), 1, user1), match[/* keyChain */2]);
                                } else {
                                  return false;
                                }
                              } else {
                                return false;
                              }
                            }));
              }));
        Fixtures.withCached(/* None */0, "Watcher__CustodianKeyChain", "Keeps increasing the index accross multiple removals", (function () {
                return Generators.withUserSessions(2);
              }), (function (sessions) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user2 = match[1];
                var user1 = match[0];
                return Generators.Log[/* withCustodian */33](user1, /* :: */[
                            user2,
                            /* :: */[
                              user1,
                              /* [] */0
                            ]
                          ], Generators.Log[/* withPartner */17](/* None */0, user1, /* :: */[
                                user2,
                                /* [] */0
                              ], Generators.Log[/* withPartnerRemoved */23](user1, /* :: */[
                                    user2,
                                    /* [] */0
                                  ], Generators.Log[/* withPartner */17](/* None */0, user2, /* :: */[
                                        user1,
                                        /* [] */0
                                      ], Generators.Log[/* withCustodianKeyChain */38](/* None */0, /* None */0, user1, Generators.Log[/* withCustodian */33](user1, /* :: */[
                                                user1,
                                                /* [] */0
                                              ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1)))))))));
              }), (function (sessions, log) {
                var match = Generators.twoUserSessionsFromArray(sessions);
                var user1 = match[0];
                var acceptance = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */5](log));
                var watcher = Watcher__CustodianKeyChain.make(user1, acceptance, Generators.Log[/* eventLog */6](log));
                return WatcherHelpers.testWatcherHasEventPending("CustodianKeyChainUpdated", watcher, user1[/* issuerKeyPair */2], (function (param) {
                              if (param.tag === 37) {
                                var match = param[0];
                                if (PrimitiveTypes.ProcessId[/* eq */5](match[/* custodianApprovalProcess */0], acceptance[/* processId */0]) && PrimitiveTypes.UserId[/* eq */5](match[/* custodianId */1], user1[/* userId */0])) {
                                  return keyChainEq(Generators.custodianKeyChain(/* None */0, Generators.Log[/* ventureId */2](log), 1, user1), match[/* keyChain */2]);
                                } else {
                                  return false;
                                }
                              } else {
                                return false;
                              }
                            }));
              }));
        describe("Completion", (function () {
                Fixtures.withCached(/* None */0, "Watcher__CustodianKeyChain", "when the custodian is a different user", (function () {
                        return Generators.withUserSessions(2);
                      }), (function (sessions) {
                        var match = Generators.twoUserSessionsFromArray(sessions);
                        var user2 = match[1];
                        var user1 = match[0];
                        return Generators.Log[/* withCustodian */33](user2, /* :: */[
                                    user1,
                                    /* :: */[
                                      user2,
                                      /* [] */0
                                    ]
                                  ], Generators.Log[/* withPartner */17](/* None */0, user2, /* :: */[
                                        user1,
                                        /* [] */0
                                      ], Generators.Log[/* withCustodian */33](user1, /* :: */[
                                            user1,
                                            /* [] */0
                                          ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))))));
                      }), (function (sessions, log) {
                        var match = Generators.twoUserSessionsFromArray(sessions);
                        var user1 = match[0];
                        var acceptance = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */5](log));
                        var log$1 = Generators.Log[/* withCustodianRemoved */37](match[1], /* :: */[
                              user1,
                              /* [] */0
                            ], log);
                        return WatcherHelpers.testWatcherHasCompleted(Watcher__CustodianKeyChain.make(user1, acceptance, Generators.Log[/* eventLog */6](log$1)));
                      }));
                Fixtures.withCached(/* None */0, "Watcher__CustodianKeyChain", "when the custodian is removed", (function () {
                        return Generators.withUserSessions(2);
                      }), (function (sessions) {
                        var match = Generators.twoUserSessionsFromArray(sessions);
                        var user2 = match[1];
                        var user1 = match[0];
                        return Generators.Log[/* withCustodian */33](user2, /* :: */[
                                    user1,
                                    /* :: */[
                                      user2,
                                      /* [] */0
                                    ]
                                  ], Generators.Log[/* withPartner */17](/* None */0, user2, /* :: */[
                                        user1,
                                        /* [] */0
                                      ], Generators.Log[/* withCustodian */33](user1, /* :: */[
                                            user1,
                                            /* [] */0
                                          ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))))));
                      }), (function (sessions, log) {
                        var match = Generators.twoUserSessionsFromArray(sessions);
                        var user2 = match[1];
                        var acceptance = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */5](log));
                        var log$1 = Generators.Log[/* withCustodianRemoved */37](user2, /* :: */[
                              match[0],
                              /* [] */0
                            ], log);
                        return WatcherHelpers.testWatcherHasCompleted(Watcher__CustodianKeyChain.make(user2, acceptance, Generators.Log[/* eventLog */6](log$1)));
                      }));
                return Fixtures.withCached(/* None */0, "Watcher__CustodianKeyChain", "when the partner is removed", (function () {
                              return Generators.withUserSessions(2);
                            }), (function (sessions) {
                              var match = Generators.twoUserSessionsFromArray(sessions);
                              var user2 = match[1];
                              var user1 = match[0];
                              return Generators.Log[/* withCustodian */33](user2, /* :: */[
                                          user1,
                                          /* :: */[
                                            user2,
                                            /* [] */0
                                          ]
                                        ], Generators.Log[/* withPartner */17](/* None */0, user2, /* :: */[
                                              user1,
                                              /* [] */0
                                            ], Generators.Log[/* withCustodian */33](user1, /* :: */[
                                                  user1,
                                                  /* [] */0
                                                ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1))))));
                            }), (function (sessions, log) {
                              var match = Generators.twoUserSessionsFromArray(sessions);
                              var user2 = match[1];
                              var acceptance = Event.getCustodianAcceptedExn(Generators.Log[/* lastEvent */5](log));
                              var log$1 = Generators.Log[/* withPartnerRemoved */23](user2, /* :: */[
                                    match[0],
                                    /* [] */0
                                  ], log);
                              return WatcherHelpers.testWatcherHasCompleted(Watcher__CustodianKeyChain.make(user2, acceptance, Generators.Log[/* eventLog */6](log$1)));
                            }));
              }));
        return /* () */0;
      }));

var KeyChain = 0;

var CustodianKeyChain$1 = 0;

exports.KeyChain = KeyChain;
exports.CustodianKeyChain = CustodianKeyChain$1;
exports.keyChainEq = keyChainEq;
/*  Not a pure module */
