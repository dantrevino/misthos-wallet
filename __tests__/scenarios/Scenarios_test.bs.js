// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Scenarios = require("../helpers/Scenarios.bs.js");
var ViewModel = require("../../src/view/model/ViewModel.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

Scenarios.run("three-person-payout", (function (_, newItems) {
        Jest.test("There are 2 new Items", (function () {
                return Jest.Expect[/* toEqual */12](2, Jest.Expect[/* expect */0](newItems.length));
              }));
        return Jest.test("Payout is finalized", (function () {
                      var lastEvent = Belt_Array.getExn(newItems, 1)[/* event */0];
                      var tmp;
                      tmp = lastEvent.tag === 34 ? true : false;
                      return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](tmp));
                    }));
      }));

Scenarios.run("four-person-payout", (function (_, newItems) {
        Jest.test("There are 3 new Items", (function () {
                return Jest.Expect[/* toEqual */12](3, Jest.Expect[/* expect */0](newItems.length));
              }));
        return Jest.test("Payout is finalized", (function () {
                      var lastEvent = Belt_Array.getExn(newItems, 1)[/* event */0];
                      var tmp;
                      tmp = lastEvent.tag === 34 ? true : false;
                      return Jest.Expect[/* toEqual */12](true, Jest.Expect[/* expect */0](tmp));
                    }));
      }));

Scenarios.runWithView("confirmed-income", (function (viewModel) {
        var selectedVenture = ViewModel.selectedVenture(viewModel);
        return Jest.test("No unconfirmed income", (function () {
                      return Jest.Expect[/* toEqual */12](0, Jest.Expect[/* expect */0](Belt_List.size(selectedVenture[/* unconfirmedTxs */9])));
                    }));
      }));

/*  Not a pure module */
