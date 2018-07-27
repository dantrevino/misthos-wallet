// Generated by BUCKLESCRIPT VERSION 4.0.1, PLEASE EDIT WITH CARE
'use strict';

var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

function fulfilled(eligible, endorsed) {
  var endorsed$1 = Belt_Set.intersect(eligible, endorsed);
  if (Belt_Set.size(endorsed$1) >= Belt_Set.size(eligible)) {
    return Belt_Set.size(eligible) > 0;
  } else {
    return false;
  }
}

function canBeFulfilled(eligible, rejected) {
  var releventRejections = Belt_Set.intersect(eligible, rejected);
  return Belt_Set.size(releventRejections) === 0;
}

function encode() {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "Unanimous"
              ],
              /* [] */0
            ]);
}

var Unanimous = /* module */[
  /* fulfilled */fulfilled,
  /* canBeFulfilled */canBeFulfilled,
  /* encode */encode
];

function fulfilled$1(eligible, endorsed) {
  var endorsed$1 = Belt_Set.intersect(eligible, endorsed);
  if (Belt_Set.size(endorsed$1) >= (Belt_Set.size(eligible) - 1 | 0)) {
    return Belt_Set.size(eligible) > 0;
  } else {
    return false;
  }
}

function canBeFulfilled$1(eligible, rejected) {
  var releventRejections = Belt_Set.intersect(eligible, rejected);
  return Belt_Set.size(releventRejections) <= 1;
}

function encode$1() {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "type",
                "UnanimousMinusOne"
              ],
              /* [] */0
            ]);
}

var UnanimousMinusOne = /* module */[
  /* fulfilled */fulfilled$1,
  /* canBeFulfilled */canBeFulfilled$1,
  /* encode */encode$1
];

function fulfilled$2(param) {
  if (param) {
    return fulfilled$1;
  } else {
    return fulfilled;
  }
}

function canBeFulfilled$2(param) {
  if (param) {
    return canBeFulfilled$1;
  } else {
    return canBeFulfilled;
  }
}

var eq = Caml_obj.caml_equal;

var neq = Caml_obj.caml_notequal;

function encode$2(policy) {
  if (policy) {
    return encode$1(policy);
  } else {
    return encode(policy);
  }
}

var UnknownPolicy = Caml_exceptions.create("Policy.UnknownPolicy");

function decode(raw) {
  var type_ = Json_decode.field("type", Json_decode.string, raw);
  switch (type_) {
    case "Unanimous" : 
        return /* Unanimous */0;
    case "UnanimousMinusOne" : 
        return /* UnanimousMinusOne */1;
    default:
      throw [
            UnknownPolicy,
            raw
          ];
  }
}

var unanimous = /* Unanimous */0;

var unanimousMinusOne = /* UnanimousMinusOne */1;

exports.Unanimous = Unanimous;
exports.UnanimousMinusOne = UnanimousMinusOne;
exports.unanimous = unanimous;
exports.unanimousMinusOne = unanimousMinusOne;
exports.fulfilled = fulfilled$2;
exports.canBeFulfilled = canBeFulfilled$2;
exports.eq = eq;
exports.neq = neq;
exports.encode = encode$2;
exports.UnknownPolicy = UnknownPolicy;
exports.decode = decode;
/* Json_encode Not a pure module */
