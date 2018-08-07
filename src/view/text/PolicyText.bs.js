// Generated by BUCKLESCRIPT VERSION 4.0.3, PLEASE EDIT WITH CARE
'use strict';


function partnerAddition(userId) {
  return "POLICY: This proposal requires unanimous endorsement. When all Partners have endorsed this proposal, " + (String(userId) + " will become a Partner of this Venture.");
}

function partnerRemoval(userId) {
  return "POLICY: This proposal requires endorsement from N-1 Partners for it to become accepted. When this condition is met, " + (String(userId) + " will no longer be a Partner of this Venture.");
}

var payout = "POLICY: This Payout requires unanimous endorsement. When all\n              Partners have endorsed it, the Payout will proceed.";

exports.payout = payout;
exports.partnerAddition = partnerAddition;
exports.partnerRemoval = partnerRemoval;
/* No side effect */
