// Generated by BUCKLESCRIPT VERSION 4.0.4, PLEASE EDIT WITH CARE
'use strict';

var Utils = require("../utils/Utils.bs.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function set(key, value, domain) {
  document.cookie = key + ("=" + (value + (";domain=" + domain)));
  return /* () */0;
}

function get(key) {
  return Utils.andThen((function (result) {
                return Js_primitive.nullable_to_opt(Caml_array.caml_array_get(result, 2));
              }), Js_primitive.null_to_opt(new RegExp("(^| )" + (key + "=([^;]+)")).exec(document.cookie)));
}

function $$delete(key, domain) {
  document.cookie = key + ("=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + domain);
  return /* () */0;
}

exports.set = set;
exports.get = get;
exports.$$delete = $$delete;
/* Utils Not a pure module */
