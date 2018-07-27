// Generated by BUCKLESCRIPT VERSION 4.0.1, PLEASE EDIT WITH CARE
'use strict';

var Json = require("@glennsl/bs-json/src/Json.bs.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var EventLog = require("../application/events/EventLog.bs.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Blockstack = require("../ffi/Blockstack.bs.js");
var WorkerUtils = require("./WorkerUtils.bs.js");
var Belt_SetString = require("bs-platform/lib/js/belt_SetString.js");
var PrimitiveTypes = require("../application/PrimitiveTypes.bs.js");
var VentureWorkerMessage = require("./VentureWorkerMessage.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function postMessage$1(msg) {
  postMessage({
        payload: VentureWorkerMessage.encodeIncoming(msg),
        correlationId: ""
      });
  return /* () */0;
}

var logLabel = "[Log Sync]";

function logMessage(param) {
  return WorkerUtils.logMessage(logLabel, param);
}

function catchAndLogError(param) {
  return WorkerUtils.catchAndLogError(logLabel, param);
}

var intervalId = /* record */[/* contents */undefined];

var determinPartnerIds = Curry._2(EventLog.reduce, (function (ids, param) {
        var $$event = param[/* event */0];
        switch ($$event.tag | 0) {
          case 4 : 
              return /* :: */[
                      $$event[0][/* data */2][/* id */1],
                      ids
                    ];
          case 10 : 
              var data = $$event[0][/* data */2];
              return Belt_List.keep(ids, (function (id) {
                            return PrimitiveTypes.UserId[/* neq */6](id, data[/* id */0]);
                          }));
          default:
            return ids;
        }
      }), /* [] */0);

function getSummaryFromUser(ventureId, userId, storagePrefix) {
  return Blockstack.getFileFromUserAndDecrypt(PrimitiveTypes.VentureId[/* toString */0](ventureId) + ("/" + (storagePrefix + "/summary.json")), PrimitiveTypes.UserId[/* toString */0](userId)).catch((function () {
                  throw Caml_builtin_exceptions.not_found;
                })).then((function (nullFile) {
                if (nullFile == null) {
                  throw Caml_builtin_exceptions.not_found;
                } else {
                  return Promise.resolve(Curry._1(EventLog.decodeSummary, Json.parseOrRaise(nullFile)));
                }
              }));
}

function getLogFromUser(ventureId, userId, storagePrefix) {
  return Blockstack.getFileFromUserAndDecrypt(PrimitiveTypes.VentureId[/* toString */0](ventureId) + ("/" + (storagePrefix + "/log.json")), PrimitiveTypes.UserId[/* toString */0](userId)).catch((function () {
                  throw Caml_builtin_exceptions.not_found;
                })).then((function (nullFile) {
                if (nullFile == null) {
                  throw Caml_builtin_exceptions.not_found;
                } else {
                  return Promise.resolve(Curry._1(EventLog.decode, Json.parseOrRaise(nullFile)));
                }
              }));
}

function findNewItemsFromPartner(ventureId, userId, storagePrefix, eventLog) {
  getLogFromUser(ventureId, userId, storagePrefix).then((function (other) {
          var items = Curry._2(EventLog.findNewItems, other, eventLog);
          return Promise.resolve(items.length !== 0 ? postMessage$1(/* NewItemsDetected */Block.__(14, [
                              ventureId,
                              items,
                              userId
                            ])) : /* () */0);
        }));
  return /* () */0;
}

function syncEventsFromPartner(storagePrefix, ventureId, knownItems, eventLog, userId) {
  getSummaryFromUser(ventureId, userId, storagePrefix).then((function (otherSummary) {
            return Promise.resolve(Belt_SetString.subset(otherSummary[/* knownItems */0], knownItems) === false ? findNewItemsFromPartner(ventureId, userId, storagePrefix, eventLog) : 0);
          })).catch((function () {
          return Promise.resolve(/* () */0);
        }));
  return /* () */0;
}

function syncEventsFromVenture(storagePrefix, ventureId, eventLog) {
  logMessage("Finding new events for venture '" + (PrimitiveTypes.VentureId[/* toString */0](ventureId) + "'"));
  var summary = Curry._1(EventLog.getSummary, eventLog);
  var partial_arg = summary[/* knownItems */0];
  return Belt_List.forEach(Curry._1(determinPartnerIds, eventLog), (function (param) {
                return syncEventsFromPartner(storagePrefix, ventureId, partial_arg, eventLog, param);
              }));
}

function syncLogs(storagePrefix, ventures) {
  return Belt_Map.forEachU(ventures, (function (id, log) {
                return syncEventsFromVenture(storagePrefix, id, log);
              }));
}

var tenSecondsInMilliseconds = 10000;

var syncInterval = 10000;

exports.postMessage = postMessage$1;
exports.logLabel = logLabel;
exports.logMessage = logMessage;
exports.catchAndLogError = catchAndLogError;
exports.intervalId = intervalId;
exports.tenSecondsInMilliseconds = tenSecondsInMilliseconds;
exports.syncInterval = syncInterval;
exports.determinPartnerIds = determinPartnerIds;
exports.getSummaryFromUser = getSummaryFromUser;
exports.getLogFromUser = getLogFromUser;
exports.findNewItemsFromPartner = findNewItemsFromPartner;
exports.syncEventsFromPartner = syncEventsFromPartner;
exports.syncEventsFromVenture = syncEventsFromVenture;
exports.syncLogs = syncLogs;
/* determinPartnerIds Not a pure module */
