// Generated by BUCKLESCRIPT VERSION 3.1.1, PLEASE EDIT WITH CARE
'use strict';

var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Belt_MapString = require("bs-platform/lib/js/belt_MapString.js");
var Belt_SetString = require("bs-platform/lib/js/belt_SetString.js");
var ProcessCollector = require("./ProcessCollector.bs.js");
var PayoutTransaction = require("../../application/wallet/PayoutTransaction.bs.js");

function make(localUser) {
  return /* record */[
          /* network : Regtest */0,
          /* localUser */localUser,
          /* payouts */ProcessCollector.make(/* () */0),
          /* txIdToProcessIdMap */Belt_MapString.empty,
          /* txIds */Belt_SetString.empty
        ];
}

function getPayout(processId, param) {
  return Belt_Map.getExn(param[/* payouts */2], processId);
}

function payoutsPendingApproval(param) {
  return Belt_List.keepU(Belt_List.fromArray(Belt_Map.valuesToArray(param[/* payouts */2])), (function (payout) {
                var match = payout[/* status */1];
                if (match !== 0) {
                  return false;
                } else {
                  return true;
                }
              }));
}

function apply($$event, state) {
  switch ($$event.tag | 0) {
    case 0 : 
        return /* record */[
                /* network */$$event[0][/* network */6],
                /* localUser */state[/* localUser */1],
                /* payouts */state[/* payouts */2],
                /* txIdToProcessIdMap */state[/* txIdToProcessIdMap */3],
                /* txIds */state[/* txIds */4]
              ];
    case 22 : 
        return /* record */[
                /* network */state[/* network */0],
                /* localUser */state[/* localUser */1],
                /* payouts */ProcessCollector.addProposal(state[/* localUser */1], $$event[0], (function (data) {
                        return /* record */[
                                /* payoutStatus : PendingApproval */0,
                                /* summary */PayoutTransaction.summary(state[/* network */0], data[/* payoutTx */1]),
                                /* txId : None */0,
                                /* date : None */0
                              ];
                      }), state[/* payouts */2]),
                /* txIdToProcessIdMap */state[/* txIdToProcessIdMap */3],
                /* txIds */state[/* txIds */4]
              ];
    case 23 : 
        return /* record */[
                /* network */state[/* network */0],
                /* localUser */state[/* localUser */1],
                /* payouts */ProcessCollector.addRejection(state[/* localUser */1], $$event[0], state[/* payouts */2]),
                /* txIdToProcessIdMap */state[/* txIdToProcessIdMap */3],
                /* txIds */state[/* txIds */4]
              ];
    case 24 : 
        return /* record */[
                /* network */state[/* network */0],
                /* localUser */state[/* localUser */1],
                /* payouts */ProcessCollector.addEndorsement(state[/* localUser */1], $$event[0], state[/* payouts */2]),
                /* txIdToProcessIdMap */state[/* txIdToProcessIdMap */3],
                /* txIds */state[/* txIds */4]
              ];
    case 25 : 
        var accepted = $$event[0];
        return /* record */[
                /* network */state[/* network */0],
                /* localUser */state[/* localUser */1],
                /* payouts */ProcessCollector.updateData(accepted[/* processId */0], (function (data) {
                        return /* record */[
                                /* payoutStatus : Accepted */1,
                                /* summary */data[/* summary */1],
                                /* txId */data[/* txId */2],
                                /* date */data[/* date */3]
                              ];
                      }), ProcessCollector.addAcceptance(accepted, state[/* payouts */2])),
                /* txIdToProcessIdMap */state[/* txIdToProcessIdMap */3],
                /* txIds */state[/* txIds */4]
              ];
    case 27 : 
        var match = $$event[0];
        var txId = match[/* txId */1];
        var processId = match[/* processId */0];
        return /* record */[
                /* network */state[/* network */0],
                /* localUser */state[/* localUser */1],
                /* payouts */ProcessCollector.updateData(processId, (function (data) {
                        var match = Belt_SetString.has(state[/* txIds */4], txId);
                        return /* record */[
                                /* payoutStatus */match ? /* Confirmed */3 : /* Unconfirmed */2,
                                /* summary */data[/* summary */1],
                                /* txId : Some */[txId],
                                /* date */data[/* date */3]
                              ];
                      }), state[/* payouts */2]),
                /* txIdToProcessIdMap */Belt_MapString.set(state[/* txIdToProcessIdMap */3], txId, processId),
                /* txIds */state[/* txIds */4]
              ];
    case 29 : 
        var match$1 = $$event[0];
        var errorMessage = match$1[/* errorMessage */1];
        return /* record */[
                /* network */state[/* network */0],
                /* localUser */state[/* localUser */1],
                /* payouts */ProcessCollector.updateData(match$1[/* processId */0], (function (data) {
                        return /* record */[
                                /* payoutStatus : Failed */[errorMessage],
                                /* summary */data[/* summary */1],
                                /* txId */data[/* txId */2],
                                /* date */data[/* date */3]
                              ];
                      }), state[/* payouts */2]),
                /* txIdToProcessIdMap */state[/* txIdToProcessIdMap */3],
                /* txIds */state[/* txIds */4]
              ];
    case 35 : 
        var match$2 = $$event[0];
        var unixTime = match$2[/* unixTime */2];
        var txId$1 = match$2[/* txId */0];
        var processId$1 = Belt_MapString.get(state[/* txIdToProcessIdMap */3], txId$1);
        return /* record */[
                /* network */state[/* network */0],
                /* localUser */state[/* localUser */1],
                /* payouts */processId$1 ? ProcessCollector.updateData(processId$1[0], (function (data) {
                          return /* record */[
                                  /* payoutStatus : Confirmed */3,
                                  /* summary */data[/* summary */1],
                                  /* txId */data[/* txId */2],
                                  /* date : Some */[new Date(unixTime * 1000)]
                                ];
                        }), state[/* payouts */2]) : state[/* payouts */2],
                /* txIdToProcessIdMap */state[/* txIdToProcessIdMap */3],
                /* txIds */Belt_SetString.add(state[/* txIds */4], txId$1)
              ];
    default:
      return state;
  }
}

exports.make = make;
exports.getPayout = getPayout;
exports.payoutsPendingApproval = payoutsPendingApproval;
exports.apply = apply;
/* ProcessCollector Not a pure module */
