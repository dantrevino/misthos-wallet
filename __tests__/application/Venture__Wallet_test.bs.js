// Generated by BUCKLESCRIPT VERSION 4.0.3, PLEASE EDIT WITH CARE
'use strict';

var Fixtures = require("../helpers/Fixtures.bs.js");
var Generators = require("../helpers/Generators.bs.js");
var WalletHelpers = require("../helpers/WalletHelpers.bs.js");

describe("Venture__Wallet", (function () {
        describe("nextIncomeAddress", (function () {
                var user3 = Fixtures.threeUserSessions[2];
                var user2 = Fixtures.threeUserSessions[1];
                var user1 = Fixtures.threeUserSessions[0];
                var eta = Generators.Log[/* withCustodianKeyChain */38](undefined, undefined, undefined, user2, Generators.Log[/* withCustodianKeyChain */38](undefined, undefined, undefined, user1, Generators.Log[/* withCustodian */33](user2, /* :: */[
                              user1,
                              /* :: */[
                                user2,
                                /* [] */0
                              ]
                            ], Generators.Log[/* withPartner */17](undefined, user2, /* :: */[
                                  user1,
                                  /* [] */0
                                ], Generators.Log[/* withCustodian */33](user1, /* :: */[
                                      user1,
                                      /* [] */0
                                    ], Generators.Log[/* withAccount */27](user1, Generators.Log[/* withFirstPartner */18](user1)(Fixtures.createVenture(user1))))))));
                var log = Generators.Log[/* withAccountKeyChainActivated */40](undefined, user2, Generators.Log[/* withAccountKeyChainActivated */40](undefined, user1, Generators.Log[/* withAccountKeyChainIdentified */39](undefined, eta)));
                WalletHelpers.testNextIncomeAddress(user1, "2N6YtJ28KAB5MakPtXmdhAzenvhD5tuY5zz", WalletHelpers.testNextIncomeAddress(user2, "2MsHBjkYY14C5bBtqE6YsQtrcZZ8cuzAKc6", WalletHelpers.testNextIncomeAddress(user1, "2MsrfLGP6dhR1RgaW5y6ov6gww3t6fMBadm", WalletHelpers.constructState(log))));
                var eta$1 = Generators.Log[/* withCustodianKeyChain */38](undefined, undefined, undefined, user3, Generators.Log[/* withCustodian */33](user3, /* :: */[
                          user1,
                          /* :: */[
                            user2,
                            /* :: */[
                              user3,
                              /* [] */0
                            ]
                          ]
                        ], Generators.Log[/* withPartner */17](undefined, user3, /* :: */[
                              user1,
                              /* :: */[
                                user2,
                                /* [] */0
                              ]
                            ], log)));
                var log$1 = Generators.Log[/* withAccountKeyChainActivated */40](undefined, user3, Generators.Log[/* withAccountKeyChainActivated */40](undefined, user2, Generators.Log[/* withAccountKeyChainActivated */40](undefined, user1, Generators.Log[/* withAccountKeyChainIdentified */39](undefined, eta$1))));
                WalletHelpers.testNextIncomeAddress(user3, "2NBgMc8ud9vUxsLuDLmgtwSju7wFs3uFqiN", WalletHelpers.testNextIncomeAddress(user2, "2N5NLNeBc52TSyKnUxGZb2V1QsjaeFdfYcD", WalletHelpers.testNextIncomeAddress(user3, "2MtBbL8QZx3vKj8E51yjNxZ2VM7hTqT8M9F", WalletHelpers.constructState(log$1))));
                return /* () */0;
              }));
        return /* () */0;
      }));

/*  Not a pure module */
