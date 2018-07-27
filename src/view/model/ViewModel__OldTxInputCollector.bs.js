// Generated by BUCKLESCRIPT VERSION 4.0.1, PLEASE EDIT WITH CARE
'use strict';

var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Belt_MapString = require("bs-platform/lib/js/belt_MapString.js");
var PrimitiveTypes = require("../../application/PrimitiveTypes.bs.js");

function make() {
  return /* record */[
          /* payoutProcesses */PrimitiveTypes.ProcessId[/* makeMap */8](/* () */0),
          /* oldInputs */Belt_MapString.empty
        ];
}

function inputsFor(address, param) {
  return Belt_MapString.getWithDefault(param[/* oldInputs */1], address, /* [] */0);
}

function apply($$event, state) {
  switch ($$event.tag | 0) {
    case 29 : 
        var match = $$event[0];
        return /* record */[
                /* payoutProcesses */Belt_Map.set(state[/* payoutProcesses */0], match[/* processId */0], match[/* data */2][/* payoutTx */1]),
                /* oldInputs */state[/* oldInputs */1]
              ];
    case 34 : 
        var payoutTx = Belt_Map.getExn(state[/* payoutProcesses */0], $$event[0][/* processId */0]);
        return Belt_Array.reduceU(payoutTx[/* usedInputs */1], state, (function (state, input) {
                      return /* record */[
                              /* payoutProcesses */state[/* payoutProcesses */0],
                              /* oldInputs */Belt_MapString.updateU(state[/* oldInputs */1], input[/* address */2], (function (inputs) {
                                      return /* :: */[
                                              input,
                                              Js_option.getWithDefault(/* [] */0, inputs)
                                            ];
                                    }))
                            ];
                    }));
    default:
      return state;
  }
}

exports.make = make;
exports.inputsFor = inputsFor;
exports.apply = apply;
/* PrimitiveTypes Not a pure module */
