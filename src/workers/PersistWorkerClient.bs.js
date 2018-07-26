// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var WebWorker = require("../ffi/WebWorker.bs.js");
var PersistWorkerMessage = require("./PersistWorkerMessage.bs.js");
var Persist_workerBsJs = require("./Persist_worker.bs.js");

var Config = /* module */[
  /* encodeIncoming */PersistWorkerMessage.encodeIncoming,
  /* decodeIncoming */PersistWorkerMessage.decodeIncoming,
  /* decodeOutgoing */PersistWorkerMessage.decodeOutgoing
];

var include = WebWorker.MakeClient([
      PersistWorkerMessage.decodeOutgoing,
      PersistWorkerMessage.encodeIncoming,
      (function () {
          return new Persist_workerBsJs();
        })
    ]);

var syncListeners = include[0];

var postMessage = include[1];

var postMessageSync = include[2];

var handleMessage = include[3];

var make = include[4];

exports.Config = Config;
exports.syncListeners = syncListeners;
exports.postMessage = postMessage;
exports.postMessageSync = postMessageSync;
exports.handleMessage = handleMessage;
exports.make = make;
/* include Not a pure module */
