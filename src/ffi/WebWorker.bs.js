// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var V4 = require("uuid/v4");
var Belt_MapString = require("bs-platform/lib/js/belt_MapString.js");

var emptySyncId = "";

function MakeClient(Config) {
  var syncListeners = [Belt_MapString.empty];
  var postMessage = function (worker, msg) {
    worker.postMessage({
          msg: msg,
          syncId: emptySyncId
        });
    return /* () */0;
  };
  var postMessageEncoded = function (worker, msg) {
    worker.postMessage({
          msg: msg,
          syncId: emptySyncId
        });
    return /* () */0;
  };
  var postMessageEncodedSync = function (worker, msg) {
    var syncId = V4();
    var ret = new Promise((function (resolve, _) {
            syncListeners[0] = Belt_MapString.set(syncListeners[0], syncId, resolve);
            return /* () */0;
          }));
    worker.postMessage({
          msg: msg,
          syncId: syncId
        });
    return ret;
  };
  var handleMessage = function (onMessage, msg) {
    var decodedMsg = Curry._1(Config[/* decodeOutgoing */0], msg.msg);
    var syncId = msg.syncId;
    if (syncId !== emptySyncId) {
      var match = Belt_MapString.get(syncListeners[0], syncId);
      if (match) {
        syncListeners[0] = Belt_MapString.remove(syncListeners[0], syncId);
        match[0](decodedMsg);
      }
      
    }
    return Curry._1(onMessage, decodedMsg);
  };
  var make = function (onMessage) {
    var worker = Curry._1(Config[/* instance */1], /* () */0);
    worker.onmessage = (function (msg) {
        return handleMessage(onMessage, msg.data);
      });
    return worker;
  };
  return /* module */[
          /* syncListeners */syncListeners,
          /* postMessage */postMessage,
          /* postMessageEncoded */postMessageEncoded,
          /* postMessageEncodedSync */postMessageEncodedSync,
          /* handleMessage */handleMessage,
          /* make */make
        ];
}

exports.emptySyncId = emptySyncId;
exports.MakeClient = MakeClient;
/* uuid/v4 Not a pure module */
