// Generated by BUCKLESCRIPT VERSION 4.0.4, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("../../utils/Utils.bs.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Caml_oo_curry = require("bs-platform/lib/js/caml_oo_curry.js");
var Watcher__AddPubKey = require("./Watcher__AddPubKey.bs.js");
var Watcher__AbortPayout = require("./Watcher__AbortPayout.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");
var Watcher__FinalizePayout = require("../events/Watcher__FinalizePayout.bs.js");
var Watcher__PayoutApproval = require("./Watcher__PayoutApproval.bs.js");
var Watcher__AccountKeyChain = require("./Watcher__AccountKeyChain.bs.js");
var Watcher__PartnerApproval = require("./Watcher__PartnerApproval.bs.js");
var Watcher__CustodianApproval = require("./Watcher__CustodianApproval.bs.js");
var Watcher__CustodianKeyChain = require("./Watcher__CustodianKeyChain.bs.js");
var Watcher__InitializeVenture = require("./Watcher__InitializeVenture.bs.js");
var Watcher__PartnerRemovalApproval = require("./Watcher__PartnerRemovalApproval.bs.js");
var Watcher__AccountCreationApproval = require("./Watcher__AccountCreationApproval.bs.js");
var Watcher__AutoEndorseCustodianSelf = require("./Watcher__AutoEndorseCustodianSelf.bs.js");
var Watcher__CustodianRemovalApproval = require("./Watcher__CustodianRemovalApproval.bs.js");

function initWatcherFor(session, param, log) {
  var $$event = param[/* event */0];
  switch ($$event.tag | 0) {
    case 0 : 
        return /* :: */[
                Watcher__InitializeVenture.make(session, $$event[0], log),
                /* [] */0
              ];
    case 1 : 
        return /* :: */[
                Watcher__PartnerApproval.make($$event[0], log),
                /* [] */0
              ];
    case 4 : 
        return /* :: */[
                Watcher__AddPubKey.make(session, $$event[0], log),
                /* [] */0
              ];
    case 7 : 
        return /* :: */[
                Watcher__PartnerRemovalApproval.make($$event[0], log),
                /* [] */0
              ];
    case 12 : 
        return /* :: */[
                Watcher__AccountCreationApproval.make($$event[0], log),
                /* [] */0
              ];
    case 15 : 
        return /* :: */[
                Watcher__AccountKeyChain.make(session, $$event[0], log),
                /* [] */0
              ];
    case 16 : 
        var proposal = $$event[0];
        return /* :: */[
                Watcher__AutoEndorseCustodianSelf.make(session, proposal, log),
                /* :: */[
                  Watcher__CustodianApproval.make(proposal, log),
                  /* [] */0
                ]
              ];
    case 19 : 
        return /* :: */[
                Watcher__CustodianKeyChain.make(session, $$event[0], log),
                /* [] */0
              ];
    case 21 : 
        return /* :: */[
                Watcher__CustodianRemovalApproval.make($$event[0], log),
                /* [] */0
              ];
    case 26 : 
        var proposal$1 = $$event[0];
        return /* :: */[
                Watcher__PayoutApproval.make(proposal$1, log),
                /* :: */[
                  Watcher__AbortPayout.make(proposal$1, log),
                  /* [] */0
                ]
              ];
    case 29 : 
        return /* :: */[
                Watcher__FinalizePayout.make($$event[0], log),
                /* [] */0
              ];
    default:
      return /* [] */0;
  }
}

function apply($staropt$star, session, item, log, watchers) {
  var reconstruct = $staropt$star !== undefined ? $staropt$star : false;
  if (item !== undefined) {
    var item$1 = item;
    if (reconstruct === false) {
      List.iter((function (w) {
              return Caml_oo_curry.js2(710435299, 3, w, item$1);
            }), watchers);
    }
    return List.filter((function (w) {
                    return Caml_oo_curry.js2(111581468, 4, w, /* () */0) === false;
                  }))(List.append(initWatcherFor(session, item$1, log), watchers));
  } else {
    return watchers;
  }
}

function processPending(session, log, eventFound, state, watchers) {
  var session$1 = session;
  var eventFound$1 = eventFound;
  var _param = /* tuple */[
    log,
    state,
    watchers
  ];
  while(true) {
    var param = _param;
    var watchers$1 = param[2];
    var state$1 = param[1];
    var log$1 = param[0];
    var tmp;
    try {
      tmp = Js_primitive.some(List.find((function (w) {
                  return Js_option.isSome(Caml_oo_curry.js2(761988163, 5, w, /* () */0));
                }), watchers$1));
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        tmp = undefined;
      } else {
        throw exn;
      }
    }
    var nextEvent = Utils.mapOption((function (w) {
            return Js_option.getExn(Caml_oo_curry.js2(761988163, 6, w, /* () */0));
          }), tmp);
    if (nextEvent !== undefined) {
      var match = nextEvent;
      var match$1 = Curry._4(eventFound$1, match[0], match[1], log$1, state$1);
      var log$2 = match$1[1];
      _param = /* tuple */[
        log$2,
        match$1[2],
        apply(undefined, session$1, match$1[0], log$2, watchers$1)
      ];
      continue ;
    } else {
      return /* tuple */[
              log$1,
              state$1,
              watchers$1
            ];
    }
  };
}

function applyAndProcessPending(session, item, log, eventFound, state, watchers) {
  return processPending(session, log, eventFound, state, apply(undefined, session, item, log, watchers));
}

var Initialize = 0;

var PartnerApproval = 0;

var AddPubKey = 0;

var PartnerRemovalApproval = 0;

var AccountCreationApproval = 0;

var CustodianApproval = 0;

var CustodianRemovalApproval = 0;

var AutoEndorseCustodianSelf = 0;

var CustodianKeyChain = 0;

var AccountKeyChain = 0;

var AbortPayout = 0;

var PayoutApproval = 0;

var FinalizePayout = 0;

exports.Initialize = Initialize;
exports.PartnerApproval = PartnerApproval;
exports.AddPubKey = AddPubKey;
exports.PartnerRemovalApproval = PartnerRemovalApproval;
exports.AccountCreationApproval = AccountCreationApproval;
exports.CustodianApproval = CustodianApproval;
exports.CustodianRemovalApproval = CustodianRemovalApproval;
exports.AutoEndorseCustodianSelf = AutoEndorseCustodianSelf;
exports.CustodianKeyChain = CustodianKeyChain;
exports.AccountKeyChain = AccountKeyChain;
exports.AbortPayout = AbortPayout;
exports.PayoutApproval = PayoutApproval;
exports.FinalizePayout = FinalizePayout;
exports.initWatcherFor = initWatcherFor;
exports.apply = apply;
exports.processPending = processPending;
exports.applyAndProcessPending = applyAndProcessPending;
/* Utils Not a pure module */
