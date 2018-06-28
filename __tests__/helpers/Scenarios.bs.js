// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Jest = require("@glennsl/bs-jest/src/jest.js");
var Json = require("bs-json/src/Json.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Venture = require("../../src/application/Venture.bs.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var EventLog = require("../../src/application/events/EventLog.bs.js");
var Fixtures = require("./Fixtures.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var PrimitiveTypes = require("../../src/application/PrimitiveTypes.bs.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var CouldNotLoadScenario = Caml_exceptions.create("Scenarios.CouldNotLoadScenario");

var basePath = "__tests__/scenarios/";

var scenarioSession = Belt_Array.getExn(Fixtures.threeUserSessionsArray, 0);

function loadScenario(scenarioName) {
  try {
    return Curry._1(EventLog.decode, Json.parseOrRaise(Fs.readFileSync(basePath + (scenarioName + ".json"), "utf8")));
  }
  catch (raw_err){
    var err = Js_exn.internalToOCamlException(raw_err);
    console.log(err);
    throw CouldNotLoadScenario;
  }
}

var findCurrentUsers = Curry._2(EventLog.reduce, (function (users, item) {
        var match = item[/* event */0];
        switch (match.tag | 0) {
          case 4 : 
              return Belt_Set.add(users, match[0][/* data */2][/* id */1]);
          case 10 : 
              return Belt_Set.remove(users, match[0][/* data */2][/* id */0]);
          default:
            return users;
        }
      }), PrimitiveTypes.UserId[/* emptySet */9]);

function run($staropt$star, scenarioName, scenarioTest) {
  var skipIntegrity = $staropt$star ? $staropt$star[0] : false;
  describe(scenarioName, (function () {
          var loadedLog = loadScenario(scenarioName);
          if (!skipIntegrity) {
            Jest.test("Integrity of " + (String(Curry._1(EventLog.length, loadedLog)) + " items is intact"), (function () {
                    var newItems = Curry._2(EventLog.findNewItems, loadedLog, Curry._1(EventLog.make, /* () */0));
                    return Jest.Expect[/* toEqual */12](Curry._1(EventLog.length, loadedLog), Jest.Expect[/* expect */0](newItems.length));
                  }));
          }
          var match = Venture.reconstruct(scenarioSession, loadedLog);
          return Curry._1(scenarioTest, match[0]);
        }));
  return /* () */0;
}

exports.CouldNotLoadScenario = CouldNotLoadScenario;
exports.basePath = basePath;
exports.scenarioSession = scenarioSession;
exports.loadScenario = loadScenario;
exports.findCurrentUsers = findCurrentUsers;
exports.run = run;
/* scenarioSession Not a pure module */
