// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Fixtures = require("../helpers/Fixtures.bs.js");
var Generators = require("../helpers/Generators.bs.js");
var WalletHelpers = require("../helpers/WalletHelpers.bs.js");

describe("nextIncomeAddress", (function () {
        var userC = Fixtures.threeUserSessions[2];
        var userB = Fixtures.threeUserSessions[1];
        var userA = Fixtures.threeUserSessions[0];
        var log = Generators.Log[/* withAccountKeyChain */28](/* None */0, /* :: */[
              userA,
              /* :: */[
                userB,
                /* [] */0
              ]
            ], Generators.Log[/* withCustodian */26](userB, /* :: */[
                  userA,
                  /* :: */[
                    userB,
                    /* [] */0
                  ]
                ], Generators.Log[/* withPartner */14](userB, /* :: */[
                      userA,
                      /* [] */0
                    ], Generators.Log[/* withCustodian */26](userA, /* :: */[
                          userA,
                          /* [] */0
                        ], Generators.Log[/* withAccount */22](userA, Generators.Log[/* withFirstPartner */15](userA)(Fixtures.createVenture(userA)))))));
        WalletHelpers.testNextIncomeAddress(userA, "2NCAxqkK9bhRQWssyrMqJhXS65xmUCWraXT", WalletHelpers.testNextIncomeAddress(userB, "2NGFyACMJG6KJ9Db92n9MM2nNtR4r4tUNFW", WalletHelpers.testNextIncomeAddress(userA, "2MtvnaAWnfkSBU7NbpSfMRrCKSTgLeRVd93", WalletHelpers.constructState(log))));
        var log$1 = Generators.Log[/* withAccountKeyChain */28](/* Some */[1], /* :: */[
              userA,
              /* :: */[
                userB,
                /* :: */[
                  userC,
                  /* [] */0
                ]
              ]
            ], Generators.Log[/* withCustodian */26](userC, /* :: */[
                  userA,
                  /* :: */[
                    userB,
                    /* [] */0
                  ]
                ], Generators.Log[/* withPartner */14](userC, /* :: */[
                      userA,
                      /* :: */[
                        userB,
                        /* [] */0
                      ]
                    ], log)));
        WalletHelpers.testNextIncomeAddress(userC, "2NBh9WTFfbiTSqQQpy8NHuU8gZv362vMsFf", WalletHelpers.testNextIncomeAddress(userB, "2N5aKGngKwUDhUYdiT6QQCbSEC4aU2GpAJE", WalletHelpers.testNextIncomeAddress(userC, "2Mu1gDoDnhGFJqYxAcRan17HyU9oLwty35g", WalletHelpers.constructState(log$1))));
        return /* () */0;
      }));

/*  Not a pure module */
