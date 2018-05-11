// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Event = require("./events/Event.bs.js");
var Utils = require("../utils/Utils.bs.js");
var Policy = require("./Policy.bs.js");
var Address = require("./wallet/Address.bs.js");
var Network = require("./wallet/Network.bs.js");
var PrimitiveTypes = require("./PrimitiveTypes.bs.js");
var AccountKeyChain = require("./wallet/AccountKeyChain.bs.js");
var PayoutTransaction = require("./wallet/PayoutTransaction.bs.js");

function make() {
  return /* record */[
          /* ventureId */PrimitiveTypes.VentureId[/* fromString */1](""),
          /* network : Testnet */1,
          /* payoutPolicy */Policy.unanimous,
          /* accountKeyChains : [] */0,
          /* activatedKeyChain : [] */0,
          /* exposedCoordinates : [] */0,
          /* reservedInputs : [] */0,
          /* payoutProcesses : [] */0
        ];
}

function apply($$event, state) {
  switch ($$event.tag | 0) {
    case 0 : 
        var match = $$event[0];
        return /* record */[
                /* ventureId */match[/* ventureId */0],
                /* network */match[/* network */6],
                /* payoutPolicy */match[/* metaPolicy */4],
                /* accountKeyChains */state[/* accountKeyChains */3],
                /* activatedKeyChain */state[/* activatedKeyChain */4],
                /* exposedCoordinates */state[/* exposedCoordinates */5],
                /* reservedInputs */state[/* reservedInputs */6],
                /* payoutProcesses */state[/* payoutProcesses */7]
              ];
    case 12 : 
        return /* record */[
                /* ventureId */state[/* ventureId */0],
                /* network */state[/* network */1],
                /* payoutPolicy */state[/* payoutPolicy */2],
                /* accountKeyChains */state[/* accountKeyChains */3],
                /* activatedKeyChain : :: */[
                  /* tuple */[
                    $$event[0][/* data */2][/* accountIdx */0],
                    /* [] */0
                  ],
                  state[/* activatedKeyChain */4]
                ],
                /* exposedCoordinates */state[/* exposedCoordinates */5],
                /* reservedInputs */state[/* reservedInputs */6],
                /* payoutProcesses */state[/* payoutProcesses */7]
              ];
    case 21 : 
        var match$1 = $$event[0];
        var data = match$1[/* data */5];
        var match$2 = data[/* changeAddressCoordinates */2];
        return /* record */[
                /* ventureId */state[/* ventureId */0],
                /* network */state[/* network */1],
                /* payoutPolicy */state[/* payoutPolicy */2],
                /* accountKeyChains */state[/* accountKeyChains */3],
                /* activatedKeyChain */state[/* activatedKeyChain */4],
                /* exposedCoordinates */match$2 ? /* :: */[
                    match$2[0],
                    state[/* exposedCoordinates */5]
                  ] : state[/* exposedCoordinates */5],
                /* reservedInputs */List.rev_append(List.map((function (prim) {
                            return prim[1];
                          }), data[/* payoutTx */1][/* usedInputs */1]), state[/* reservedInputs */6]),
                /* payoutProcesses : :: */[
                  /* tuple */[
                    match$1[/* processId */0],
                    data[/* payoutTx */1]
                  ],
                  state[/* payoutProcesses */7]
                ]
              ];
    case 26 : 
        var payoutTx = List.assoc($$event[0][/* processId */0], state[/* payoutProcesses */7]);
        return /* record */[
                /* ventureId */state[/* ventureId */0],
                /* network */state[/* network */1],
                /* payoutPolicy */state[/* payoutPolicy */2],
                /* accountKeyChains */state[/* accountKeyChains */3],
                /* activatedKeyChain */state[/* activatedKeyChain */4],
                /* exposedCoordinates */state[/* exposedCoordinates */5],
                /* reservedInputs */List.filter((function (input) {
                          return List.exists((function (i) {
                                        if (input[/* txId */0] === i[/* txId */0]) {
                                          return input[/* txOutputN */1] === i[/* txOutputN */1];
                                        } else {
                                          return false;
                                        }
                                      }), List.map((function (prim) {
                                            return prim[1];
                                          }), payoutTx[/* usedInputs */1])) === false;
                        }))(state[/* reservedInputs */6]),
                /* payoutProcesses */state[/* payoutProcesses */7]
              ];
    case 28 : 
        var payoutTx$1 = List.assoc($$event[0][/* processId */0], state[/* payoutProcesses */7]);
        return /* record */[
                /* ventureId */state[/* ventureId */0],
                /* network */state[/* network */1],
                /* payoutPolicy */state[/* payoutPolicy */2],
                /* accountKeyChains */state[/* accountKeyChains */3],
                /* activatedKeyChain */state[/* activatedKeyChain */4],
                /* exposedCoordinates */state[/* exposedCoordinates */5],
                /* reservedInputs */List.filter((function (input) {
                          return List.exists((function (i) {
                                        if (input[/* txId */0] === i[/* txId */0]) {
                                          return input[/* txOutputN */1] === i[/* txOutputN */1];
                                        } else {
                                          return false;
                                        }
                                      }), List.map((function (prim) {
                                            return prim[1];
                                          }), payoutTx$1[/* usedInputs */1])) === false;
                        }))(state[/* reservedInputs */6]),
                /* payoutProcesses */state[/* payoutProcesses */7]
              ];
    case 30 : 
        return /* record */[
                /* ventureId */state[/* ventureId */0],
                /* network */state[/* network */1],
                /* payoutPolicy */state[/* payoutPolicy */2],
                /* accountKeyChains */AccountKeyChain.Collection[/* add */1]($$event[0][/* keyChain */0], state[/* accountKeyChains */3]),
                /* activatedKeyChain */state[/* activatedKeyChain */4],
                /* exposedCoordinates */state[/* exposedCoordinates */5],
                /* reservedInputs */state[/* reservedInputs */6],
                /* payoutProcesses */state[/* payoutProcesses */7]
              ];
    case 31 : 
        var match$3 = $$event[0];
        var accountIdx = match$3[/* accountIdx */0];
        return /* record */[
                /* ventureId */state[/* ventureId */0],
                /* network */state[/* network */1],
                /* payoutPolicy */state[/* payoutPolicy */2],
                /* accountKeyChains */state[/* accountKeyChains */3],
                /* activatedKeyChain : :: */[
                  /* tuple */[
                    accountIdx,
                    /* :: */[
                      /* tuple */[
                        match$3[/* custodianId */1],
                        match$3[/* identifier */2]
                      ],
                      List.assoc(accountIdx, state[/* activatedKeyChain */4])
                    ]
                  ],
                  List.remove_assoc(accountIdx, state[/* activatedKeyChain */4])
                ],
                /* exposedCoordinates */state[/* exposedCoordinates */5],
                /* reservedInputs */state[/* reservedInputs */6],
                /* payoutProcesses */state[/* payoutProcesses */7]
              ];
    case 32 : 
        return /* record */[
                /* ventureId */state[/* ventureId */0],
                /* network */state[/* network */1],
                /* payoutPolicy */state[/* payoutPolicy */2],
                /* accountKeyChains */state[/* accountKeyChains */3],
                /* activatedKeyChain */state[/* activatedKeyChain */4],
                /* exposedCoordinates : :: */[
                  $$event[0][/* coordinates */0],
                  state[/* exposedCoordinates */5]
                ],
                /* reservedInputs */state[/* reservedInputs */6],
                /* payoutProcesses */state[/* payoutProcesses */7]
              ];
    default:
      return state;
  }
}

function exposeNextIncomeAddress(userId, accountIdx, param) {
  var ident = List.assoc(userId, List.assoc(accountIdx, param[/* activatedKeyChain */4]));
  var accountKeyChain = AccountKeyChain.Collection[/* lookup */2](accountIdx, ident, param[/* accountKeyChains */3]);
  var coordinates = Address.Coordinates[/* nextExternal */2](userId, param[/* exposedCoordinates */5], accountKeyChain);
  return Event.IncomeAddressExposed[/* make */0](coordinates, Address.make(coordinates, accountKeyChain)[/* address */5]);
}

function preparePayoutTx(param, accountIdx, destinations, satsPerByte, param$1) {
  var reservedInputs = param$1[/* reservedInputs */6];
  var accountKeyChains = param$1[/* accountKeyChains */3];
  var payoutPolicy = param$1[/* payoutPolicy */2];
  var ventureId = param$1[/* ventureId */0];
  var network = param[/* network */5];
  var masterKeyChain = param[/* masterKeyChain */4];
  var userId = param[/* userId */0];
  var keyChainIdent = List.assoc(userId, List.assoc(accountIdx, param$1[/* activatedKeyChain */4]));
  var accountKeyChain = AccountKeyChain.Collection[/* lookup */2](accountIdx, keyChainIdent, accountKeyChains);
  var coordinates = Address.Coordinates[/* allForAccount */9](accountIdx)(param$1[/* exposedCoordinates */5]);
  var nextChangeCoordinates = Address.Coordinates[/* nextInternal */1](userId, coordinates, accountKeyChain);
  return Network.transactionInputs(network)(coordinates, accountKeyChains).then((function (inputs) {
                var inputs$1 = List.filter((function (input) {
                          return List.exists((function (reservedIn) {
                                        if (reservedIn[/* txId */0] === input[/* txId */0]) {
                                          return reservedIn[/* txOutputN */1] === input[/* txOutputN */1];
                                        } else {
                                          return false;
                                        }
                                      }), reservedInputs) === false;
                        }))(inputs);
                var oldInputs = List.find_all((function (i) {
                          return AccountKeyChain.Identifier[/* neq */3](keyChainIdent, Address.Coordinates[/* keyChainIdent */5](i[/* coordinates */6]));
                        }))(inputs$1);
                var changeAddress = Address.find(nextChangeCoordinates, accountKeyChains);
                var payoutTx = PayoutTransaction.build(oldInputs, inputs$1, destinations, satsPerByte, changeAddress, network);
                var changeAddressCoordinates = Utils.mapOption((function () {
                        return nextChangeCoordinates;
                      }), payoutTx[/* changeAddress */3]);
                var match = PayoutTransaction.signPayout(ventureId, userId, masterKeyChain, accountKeyChains, payoutTx, network);
                var payoutTx$1 = match ? match[0] : payoutTx;
                return Promise.resolve(Curry._5(Event.Payout[/* Proposed */3][/* make */0], /* None */0, /* None */0, userId, payoutPolicy, /* record */[
                                /* accountIdx */accountIdx,
                                /* payoutTx */payoutTx$1,
                                /* changeAddressCoordinates */changeAddressCoordinates
                              ]));
              }));
}

var faucetAddress = "2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF";

exports.faucetAddress = faucetAddress;
exports.make = make;
exports.apply = apply;
exports.exposeNextIncomeAddress = exposeNextIncomeAddress;
exports.preparePayoutTx = preparePayoutTx;
/* Event Not a pure module */
