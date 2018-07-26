// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Policy = require("../../src/application/Policy.bs.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var PrimitiveTypes = require("../../src/application/PrimitiveTypes.bs.js");

describe("Unanimous", (function () {
        Jest.test("fulfilled", (function () {
                var arg = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                      PrimitiveTypes.UserId[/* fromString */1]("a"),
                      PrimitiveTypes.UserId[/* fromString */1]("b")
                    ]);
                var arg$1 = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                      PrimitiveTypes.UserId[/* fromString */1]("a"),
                      PrimitiveTypes.UserId[/* fromString */1]("b")
                    ]);
                return Jest.Expect[/* toBe */2](true, Jest.Expect[/* expect */0]((function (param) {
                                    return Policy.fulfilled(param)(arg, arg$1);
                                  })(Policy.unanimous)));
              }));
        Jest.test("not fulfilled", (function () {
                var arg = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                      PrimitiveTypes.UserId[/* fromString */1]("a"),
                      PrimitiveTypes.UserId[/* fromString */1]("b")
                    ]);
                var arg$1 = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                      PrimitiveTypes.UserId[/* fromString */1]("a"),
                      PrimitiveTypes.UserId[/* fromString */1]("c")
                    ]);
                return Jest.Expect[/* toBe */2](false, Jest.Expect[/* expect */0]((function (param) {
                                    return Policy.fulfilled(param)(arg, arg$1);
                                  })(Policy.unanimous)));
              }));
        Jest.test("at least one eligible", (function () {
                var arg = PrimitiveTypes.UserId[/* emptySet */9];
                var arg$1 = PrimitiveTypes.UserId[/* emptySet */9];
                return Jest.Expect[/* toBe */2](false, Jest.Expect[/* expect */0]((function (param) {
                                    return Policy.fulfilled(param)(arg, arg$1);
                                  })(Policy.unanimous)));
              }));
        describe("canBeFullfilled", (function () {
                Jest.test("with one rejection", (function () {
                        var arg = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                              PrimitiveTypes.UserId[/* fromString */1]("a"),
                              PrimitiveTypes.UserId[/* fromString */1]("b")
                            ]);
                        var arg$1 = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                              PrimitiveTypes.UserId[/* fromString */1]("a"),
                              PrimitiveTypes.UserId[/* fromString */1]("c")
                            ]);
                        return Jest.Expect[/* toBe */2](false, Jest.Expect[/* expect */0]((function (param) {
                                            return Policy.canBeFulfilled(param)(arg, arg$1);
                                          })(Policy.unanimous)));
                      }));
                return Jest.test("with zero rejections", (function () {
                              var arg = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                                    PrimitiveTypes.UserId[/* fromString */1]("a"),
                                    PrimitiveTypes.UserId[/* fromString */1]("b")
                                  ]);
                              var arg$1 = PrimitiveTypes.UserId[/* emptySet */9];
                              return Jest.Expect[/* toBe */2](true, Jest.Expect[/* expect */0]((function (param) {
                                                  return Policy.canBeFulfilled(param)(arg, arg$1);
                                                })(Policy.unanimous)));
                            }));
              }));
        return /* () */0;
      }));

describe("UnanimousMinusOne", (function () {
        Jest.test("fulfilled", (function () {
                var arg = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                      PrimitiveTypes.UserId[/* fromString */1]("a"),
                      PrimitiveTypes.UserId[/* fromString */1]("b")
                    ]);
                var arg$1 = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                      PrimitiveTypes.UserId[/* fromString */1]("a"),
                      PrimitiveTypes.UserId[/* fromString */1]("b")
                    ]);
                return Jest.Expect[/* toBe */2](true, Jest.Expect[/* expect */0]((function (param) {
                                    return Policy.fulfilled(param)(arg, arg$1);
                                  })(Policy.unanimousMinusOne)));
              }));
        Jest.test("fullfilled with minus 1 votes", (function () {
                var arg = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                      PrimitiveTypes.UserId[/* fromString */1]("a"),
                      PrimitiveTypes.UserId[/* fromString */1]("b")
                    ]);
                var arg$1 = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                      PrimitiveTypes.UserId[/* fromString */1]("a"),
                      PrimitiveTypes.UserId[/* fromString */1]("c")
                    ]);
                return Jest.Expect[/* toBe */2](true, Jest.Expect[/* expect */0]((function (param) {
                                    return Policy.fulfilled(param)(arg, arg$1);
                                  })(Policy.unanimousMinusOne)));
              }));
        Jest.test("not fullfilled", (function () {
                var arg = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                      PrimitiveTypes.UserId[/* fromString */1]("a"),
                      PrimitiveTypes.UserId[/* fromString */1]("b"),
                      PrimitiveTypes.UserId[/* fromString */1]("c")
                    ]);
                var arg$1 = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[PrimitiveTypes.UserId[/* fromString */1]("a")]);
                return Jest.Expect[/* toBe */2](false, Jest.Expect[/* expect */0]((function (param) {
                                    return Policy.fulfilled(param)(arg, arg$1);
                                  })(Policy.unanimousMinusOne)));
              }));
        Jest.test("at least one eligible", (function () {
                var arg = PrimitiveTypes.UserId[/* emptySet */9];
                var arg$1 = PrimitiveTypes.UserId[/* emptySet */9];
                return Jest.Expect[/* toBe */2](false, Jest.Expect[/* expect */0]((function (param) {
                                    return Policy.fulfilled(param)(arg, arg$1);
                                  })(Policy.unanimousMinusOne)));
              }));
        describe("canBeFullfilled", (function () {
                Jest.test("with two rejections", (function () {
                        var arg = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                              PrimitiveTypes.UserId[/* fromString */1]("a"),
                              PrimitiveTypes.UserId[/* fromString */1]("b"),
                              PrimitiveTypes.UserId[/* fromString */1]("c")
                            ]);
                        var arg$1 = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                              PrimitiveTypes.UserId[/* fromString */1]("a"),
                              PrimitiveTypes.UserId[/* fromString */1]("b")
                            ]);
                        return Jest.Expect[/* toBe */2](false, Jest.Expect[/* expect */0]((function (param) {
                                            return Policy.canBeFulfilled(param)(arg, arg$1);
                                          })(Policy.unanimousMinusOne)));
                      }));
                Jest.test("with one rejection", (function () {
                        var arg = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                              PrimitiveTypes.UserId[/* fromString */1]("a"),
                              PrimitiveTypes.UserId[/* fromString */1]("b")
                            ]);
                        var arg$1 = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[PrimitiveTypes.UserId[/* fromString */1]("a")]);
                        return Jest.Expect[/* toBe */2](true, Jest.Expect[/* expect */0]((function (param) {
                                            return Policy.canBeFulfilled(param)(arg, arg$1);
                                          })(Policy.unanimousMinusOne)));
                      }));
                return Jest.test("with zero rejections", (function () {
                              var arg = Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[
                                    PrimitiveTypes.UserId[/* fromString */1]("a"),
                                    PrimitiveTypes.UserId[/* fromString */1]("b")
                                  ]);
                              var arg$1 = PrimitiveTypes.UserId[/* emptySet */9];
                              return Jest.Expect[/* toBe */2](true, Jest.Expect[/* expect */0]((function (param) {
                                                  return Policy.canBeFulfilled(param)(arg, arg$1);
                                                })(Policy.unanimous)));
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
