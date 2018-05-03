// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var WebWorker = require("../ffi/WebWorker.bs.js");
var WorkerLocalStorage = require("./WorkerLocalStorage.bs.js");
var PersistWorkerMessage = require("./PersistWorkerMessage.bs.js");
var VentureWorkerMessage = require("./VentureWorkerMessage.bs.js");
var Persist_workerBsJs = require("./Persist_worker.bs.js");

var Config = /* module */[/* decodeOutgoing */PersistWorkerMessage.decodeOutgoing];

var include = WebWorker.MakeClient([
      PersistWorkerMessage.decodeOutgoing,
      (function () {
          return new Persist_workerBsJs();
        })
    ]);

function updateSession(worker) {
  worker.postMessage(/* UpdateSession */Block.__(0, [WorkerLocalStorage.readBlockstackItemsFromStorage(/* () */0)]));
  return /* () */0;
}

function ventureMessage(msg, worker) {
  worker.postMessage(/* VentureWorkerMessage */Block.__(1, [VentureWorkerMessage.encodeOutgoing(msg)]));
  return /* () */0;
}

var make = include[0];

exports.Config = Config;
exports.make = make;
exports.updateSession = updateSession;
exports.ventureMessage = ventureMessage;
/* include Not a pure module */
