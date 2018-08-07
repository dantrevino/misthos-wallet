// Generated by BUCKLESCRIPT VERSION 4.0.3, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("../../../src/application/wallet/BTC.bs.js");
var Jest = require("@glennsl/bs-jest/src/jest.js");
var Helpers = require("../../helpers/Helpers.bs.js");
var EstimateFeeClient = require("../../../src/application/wallet/EstimateFeeClient.bs.js");

Helpers.enableHttpRequests(/* () */0);

describe("fees", (function () {
        return Jest.testPromise(undefined, "will fetch", (function () {
                      return EstimateFeeClient.fetchFees(/* () */0).then((function (param) {
                                    var high = param[/* high */0];
                                    return Promise.resolve(Jest.Expect[/* toBe */2](true, Jest.Expect[/* expect */0](high.gt(param[/* economy */2]) || high.comparedTo(BTC.fromSatoshis(/* int64 */[
                                                                /* hi */0,
                                                                /* lo */1
                                                              ])) === 0)));
                                  }));
                    }));
      }));

/*  Not a pure module */
