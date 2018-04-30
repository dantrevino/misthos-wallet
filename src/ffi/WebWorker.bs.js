// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");

function MakeClient(Config) {
  var make = function (onMessage) {
    var worker = Curry._1(Config[/* instance */1], /* () */0);
    worker.onmessage = (function (msg) {
        return Curry._1(onMessage, Curry._1(Config[/* decodeReceive */0], msg.data));
      });
    return worker;
  };
  return /* module */[/* make */make];
}

exports.MakeClient = MakeClient;
/* No side effect */
