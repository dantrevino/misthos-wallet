// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var $$String = require("bs-platform/lib/js/string.js");
var Belt_Id = require("bs-platform/lib/js/belt_Id.js");
var V4 = require("uuid/v4");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function fromString(id) {
  return id.toLowerCase();
}

function encode(id) {
  return id;
}

function decode(id) {
  return Json_decode.string(id).toLowerCase();
}

var compare = $$String.compare;

function eq(a, b) {
  return $$String.compare(a, b) === 0;
}

function neq(a, b) {
  return $$String.compare(a, b) !== 0;
}

var cmp = $$String.compare;

var Comparator = Belt_Id.MakeComparableU(/* module */[/* cmp */cmp]);

function makeMap() {
  return Belt_Map.make(Comparator);
}

var emptySet = Belt_Set.make(Comparator);

function make() {
  return V4();
}

function make$1() {
  return V4();
}

function make$2() {
  return V4();
}

function VentureId_000(prim) {
  return prim;
}

var VentureId = [
  VentureId_000,
  fromString,
  encode,
  decode,
  compare,
  eq,
  neq,
  Comparator,
  makeMap,
  emptySet,
  make
];

function UserId_000(prim) {
  return prim;
}

var UserId = [
  UserId_000,
  fromString,
  encode,
  decode,
  compare,
  eq,
  neq,
  Comparator,
  makeMap,
  emptySet
];

function ProcessId_000(prim) {
  return prim;
}

var ProcessId = [
  ProcessId_000,
  fromString,
  encode,
  decode,
  compare,
  eq,
  neq,
  Comparator,
  makeMap,
  emptySet,
  make$1
];

function LabelId_000(prim) {
  return prim;
}

var LabelId = [
  LabelId_000,
  fromString,
  encode,
  decode,
  compare,
  eq,
  neq,
  Comparator,
  makeMap,
  emptySet,
  make$2
];

exports.VentureId = VentureId;
exports.UserId = UserId;
exports.ProcessId = ProcessId;
exports.LabelId = LabelId;
/* Comparator Not a pure module */
