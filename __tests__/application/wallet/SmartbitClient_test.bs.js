// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Helpers = require("../../helpers/Helpers.bs.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var SmartbitClient = require("../../../src/application/wallet/SmartbitClient.bs.js");

Helpers.enableHttpRequests(/* () */0);

describe("SmartbitClient", (function () {
        Jest.testPromise("getUTXOs", 50000, (function (param) {
                return SmartbitClient.getUTXOs(/* record */[/* subdomain */"api"], /* :: */[
                              "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
                              /* [] */0
                            ]).then((function (res) {
                              return Promise.resolve(Jest.Expect[/* toBeGreaterThan */5](500, Jest.Expect[/* expect */0](Belt_Set.size(res))));
                            }));
              }));
        Jest.testPromise("blockheight", 50000, (function (param) {
                return SmartbitClient.getCurrentBlockHeight(/* record */[/* subdomain */"api"], /* () */0).then((function (res) {
                              return Promise.resolve(Jest.Expect[/* toBeGreaterThan */5](530440, Jest.Expect[/* expect */0](res)));
                            }));
              }));
        return Jest.testPromise("getTransactionHex", 50000, (function (param) {
                      return SmartbitClient.getTransactionHex(/* record */[/* subdomain */"api"], /* array */["b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da"]).then((function (res) {
                                    return Promise.resolve(Jest.Expect[/* toEqual */12](/* array */[/* tuple */[
                                                      "b6f6991d03df0e2e04dafffcd6bc418aac66049e2cd74b80f14ac86db1e3f0da",
                                                      "010000000101820e2169131a77976cf204ce28685e49a6d2278861c33b6241ba3ae3e0a49f020000008b48304502210098a2851420e4daba656fd79cb60cb565bd7218b6b117fda9a512ffbf17f8f178022005c61f31fef3ce3f906eb672e05b65f506045a65a80431b5eaf28e0999266993014104f0f86fa57c424deb160d0fc7693f13fce5ed6542c29483c51953e4fa87ebf247487ed79b1ddcf3de66b182217fcaf3fcef3fcb44737eb93b1fcb8927ebecea26ffffffff02805cd705000000001976a91429d6a3540acfa0a950bef2bfdc75cd51c24390fd88ac80841e00000000001976a91417b5038a413f5c5ee288caa64cfab35a0c01914e88ac00000000"
                                                    ]], Jest.Expect[/* expect */0](res)));
                                  }));
                    }));
      }));

/*  Not a pure module */
