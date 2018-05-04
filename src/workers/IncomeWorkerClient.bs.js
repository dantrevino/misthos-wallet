// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var WebWorker = require("../ffi/WebWorker.bs.js");
var WorkerLocalStorage = require("./WorkerLocalStorage.bs.js");
var IncomeWorkerMessage = require("./IncomeWorkerMessage.bs.js");
var Income_workerBsJs = require("./Income_worker.bs.js");

var Config = /* module */[/* decodeOutgoing */IncomeWorkerMessage.decodeOutgoing];

var include = WebWorker.MakeClient([
      IncomeWorkerMessage.decodeOutgoing,
      (function () {
          return new Income_workerBsJs();
        })
    ]);

function updateSession(worker) {
  worker.postMessage(/* UpdateSession */[WorkerLocalStorage.readBlockstackItemsFromStorage(/* () */0)]);
  return /* () */0;
}

var make = include[0];

exports.Config = Config;
exports.make = make;
exports.updateSession = updateSession;
/* include Not a pure module */