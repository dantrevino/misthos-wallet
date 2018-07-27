// Generated by BUCKLESCRIPT VERSION 4.0.1, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var V4 = require("uuid/v4");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Belt_MapString = require("bs-platform/lib/js/belt_MapString.js");

function MakeClient(Config) {
  var syncListeners = /* record */[/* contents */Belt_MapString.empty];
  var postMessage = function (worker, msg) {
    var msgId = V4();
    worker.postMessage({
          payload: Curry._1(Config[/* encodeIncoming */1], msg),
          correlationId: msgId
        });
    return msgId;
  };
  var postMessageSync = function (worker, msg) {
    var msgId = V4();
    var ret = new Promise((function (resolve, _) {
            syncListeners[0] = Belt_MapString.set(syncListeners[0], msgId, resolve);
            return /* () */0;
          }));
    worker.postMessage({
          payload: Curry._1(Config[/* encodeIncoming */1], msg),
          correlationId: msgId
        });
    return ret;
  };
  var handleMessage = function (onMessage, msg) {
    var decodedMsg = Curry._1(Config[/* decodeOutgoing */0], msg.payload);
    var msgId = msg.correlationId;
    var match = Belt_MapString.get(syncListeners[0], msgId);
    if (match !== undefined) {
      syncListeners[0] = Belt_MapString.remove(syncListeners[0], msgId);
      Js_primitive.valFromOption(match)(decodedMsg);
    }
    return Curry._1(onMessage, decodedMsg);
  };
  var make = function (onMessage) {
    var worker = Curry._1(Config[/* instance */2], /* () */0);
    worker.onmessage = (function (msg) {
        return handleMessage(onMessage, msg.data);
      });
    return worker;
  };
  return /* module */[
          /* syncListeners */syncListeners,
          /* postMessage */postMessage,
          /* postMessageSync */postMessageSync,
          /* handleMessage */handleMessage,
          /* make */make
        ];
}

exports.MakeClient = MakeClient;
/* uuid/v4 Not a pure module */
