// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Json = require("bs-json/src/Json.js");
var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("../utils/Utils.bs.js");
var Session = require("../application/Session.bs.js");
var Venture = require("../application/Venture.bs.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var EventLog = require("../application/events/EventLog.bs.js");
var Blockstack = require("../ffi/Blockstack.bs.js");
var WorkerUtils = require("./WorkerUtils.bs.js");
var PrimitiveTypes = require("../application/PrimitiveTypes.bs.js");
var WorkerLocalStorage = require("./WorkerLocalStorage.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

(( self.localStorage = require("./fakeLocalStorage").localStorage ));

(( self.window = { localStorage: self.localStorage , location: { origin: self.origin } } ));

function logMessage(msg) {
  console.log("[Sync Worker] - " + msg);
  return /* () */0;
}

var intervalId = [/* None */0];

function determinPartnerIds(localUserId) {
  return Curry._2(EventLog.reduce, (function (ids, param) {
                var $$event = param[/* event */0];
                switch ($$event.tag | 0) {
                  case 3 : 
                      var data = $$event[0][/* data */2];
                      if (PrimitiveTypes.UserId[/* neq */6](data[/* id */1], localUserId)) {
                        return /* :: */[
                                data[/* id */1],
                                ids
                              ];
                      } else {
                        return ids;
                      }
                  case 6 : 
                      var data$1 = $$event[0][/* data */2];
                      return List.filter((function (id) {
                                      return PrimitiveTypes.UserId[/* neq */6](id, data$1[/* id */0]);
                                    }))(ids);
                  default:
                    return ids;
                }
              }), /* [] */0);
}

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
          return Promise.resolve(items ? (postMessage(/* NewItemsDetected */Block.__(12, [
                                ventureId,
                                List.map(EventLog.encodeItem, items)
                              ])), /* () */0) : /* () */0);
        }));
  return /* () */0;
}

function syncEventsFromPartner(storagePrefix, ventureId, summary, eventLog, userId) {
  getSummaryFromUser(ventureId, userId, storagePrefix).then((function (otherSummary) {
            return Promise.resolve(List.length(List.filter((function (item) {
                                    return List.mem(item, summary[/* knownItems */0]) === false;
                                  }))(otherSummary[/* knownItems */0])) > 0 ? findNewItemsFromPartner(ventureId, userId, storagePrefix, eventLog) : 0);
          })).catch((function () {
          return Promise.resolve(/* () */0);
        }));
  return /* () */0;
}

function syncEventsFromVenture(ventureId, localUserId, storagePrefix) {
  logMessage("Finding new events for venture '" + (PrimitiveTypes.VentureId[/* toString */0](ventureId) + "'"));
  return WorkerUtils.loadVenture(ventureId).then((function (eventLog) {
                var summary = Curry._1(EventLog.getSummary, eventLog);
                var partnerKeys = Curry._1(determinPartnerIds(localUserId), eventLog);
                List.iter((function (param) {
                        return syncEventsFromPartner(storagePrefix, ventureId, summary, eventLog, param);
                      }), partnerKeys);
                return Promise.resolve(/* () */0);
              }));
}

function findNewEventsForAll() {
  return Session.getCurrentSession(/* () */0).then((function (param) {
                if (typeof param === "number") {
                  return Promise.resolve(/* () */0);
                } else {
                  var match = param[0];
                  var storagePrefix = match[/* storagePrefix */3];
                  var userId = match[/* userId */0];
                  return Venture.Index[/* load */0](/* () */0).then((function (index) {
                                return Promise.resolve(List.iter((function (param) {
                                                  syncEventsFromVenture(param[/* id */0], userId, storagePrefix);
                                                  return /* () */0;
                                                }), index));
                              }));
                }
              }));
}

function handleMsg(param) {
  logMessage("Handling 'UpdateSession'");
  WorkerLocalStorage.setBlockstackItems(param[0]);
  findNewEventsForAll(/* () */0);
  return setInterval((function () {
                findNewEventsForAll(/* () */0);
                return /* () */0;
              }), 10000);
}

self.onmessage = (function (msg) {
    var newIntervalid = handleMsg(msg.data);
    Utils.mapOption((function (id) {
            if (Caml_obj.caml_notequal(newIntervalid, id)) {
              clearInterval(id);
              return /* () */0;
            } else {
              return 0;
            }
          }), intervalId[0]);
    intervalId[0] = /* Some */[newIntervalid];
    return /* () */0;
  });

var Message = 0;

var tenSecondsInMilliseconds = 10000;

var syncInterval = 10000;

exports.Message = Message;
exports.logMessage = logMessage;
exports.intervalId = intervalId;
exports.tenSecondsInMilliseconds = tenSecondsInMilliseconds;
exports.syncInterval = syncInterval;
exports.determinPartnerIds = determinPartnerIds;
exports.getSummaryFromUser = getSummaryFromUser;
exports.getLogFromUser = getLogFromUser;
exports.findNewItemsFromPartner = findNewItemsFromPartner;
exports.syncEventsFromPartner = syncEventsFromPartner;
exports.syncEventsFromVenture = syncEventsFromVenture;
exports.findNewEventsForAll = findNewEventsForAll;
exports.handleMsg = handleMsg;
/*  Not a pure module */