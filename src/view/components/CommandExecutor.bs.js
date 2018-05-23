// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Utils = require("../../utils/Utils.bs.js");
var MButton = require("./MButton.bs.js");
var Spinner = require("./Spinner.bs.js");
var ViewCommon = require("../ViewCommon.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var component = ReasonReact.reducerComponent("CommandExecuter");

function make(commands, lastResponse, onProcessStarted, children) {
  var wrapCommands = function (send) {
    return /* record */[
            /* proposePartner */(function (prospectId) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* proposePartner */0], prospectId)]);
              }),
            /* endorsePartner */(function (processId) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* endorsePartner */1], processId)]);
              }),
            /* rejectPartner */(function (processId) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* rejectPartner */2], processId)]);
              }),
            /* proposePartnerRemoval */(function (partnerId) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* proposePartnerRemoval */3], partnerId)]);
              }),
            /* endorsePartnerRemoval */(function (processId) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* endorsePartnerRemoval */5], processId)]);
              }),
            /* rejectPartnerRemoval */(function (processId) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* rejectPartnerRemoval */4], processId)]);
              }),
            /* proposePayout */(function (accountIdx, destinations, fee) {
                return Curry._1(send, /* CommandExecuted */[Curry._3(commands[/* proposePayout */6], accountIdx, destinations, fee)]);
              }),
            /* endorsePayout */(function (processId) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* endorsePayout */7], processId)]);
              }),
            /* rejectPayout */(function (processId) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* rejectPayout */8], processId)]);
              })
          ];
  };
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */(function (param) {
              var cmdStatus = param[/* state */1][/* cmdStatus */0];
              var tmp;
              if (typeof cmdStatus === "number" || cmdStatus.tag || !lastResponse) {
                tmp = cmdStatus;
              } else {
                var match = lastResponse[0];
                if (cmdStatus[0] === match[0]) {
                  var response = match[1];
                  if (response.tag) {
                    tmp = /* Error */Block.__(1, [response[0]]);
                  } else {
                    var success = response[0];
                    switch (success.tag | 0) {
                      case 0 : 
                          var processId = success[0];
                          Utils.mapOption((function (fn) {
                                  return Curry._1(fn, processId);
                                }), onProcessStarted);
                          tmp = /* Success */Block.__(2, [/* ProcessStarted */Block.__(0, [processId])]);
                          break;
                      case 1 : 
                      case 2 : 
                          tmp = /* Success */Block.__(2, [success]);
                          break;
                      
                    }
                  }
                } else {
                  tmp = cmdStatus;
                }
              }
              return /* record */[/* cmdStatus */tmp];
            }),
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (param) {
              return Curry._2(children, wrapCommands(param[/* send */3]), param[/* state */1][/* cmdStatus */0]);
            }),
          /* initialState */(function () {
              return /* record */[/* cmdStatus : Idle */0];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, _) {
              return /* Update */Block.__(0, [/* record */[/* cmdStatus : Pending */Block.__(0, [action[0]])]]);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

var component$1 = ReasonReact.statelessComponent("CommandStatus");

function make$1(cmdStatus, action, onRetry, _) {
  return /* record */[
          /* debugName */component$1[/* debugName */0],
          /* reactClassInternal */component$1[/* reactClassInternal */1],
          /* handedOffState */component$1[/* handedOffState */2],
          /* willReceiveProps */component$1[/* willReceiveProps */3],
          /* didMount */component$1[/* didMount */4],
          /* didUpdate */component$1[/* didUpdate */5],
          /* willUnmount */component$1[/* willUnmount */6],
          /* willUpdate */component$1[/* willUpdate */7],
          /* shouldUpdate */component$1[/* shouldUpdate */8],
          /* render */(function () {
              if (typeof cmdStatus === "number") {
                return null;
              } else {
                switch (cmdStatus.tag | 0) {
                  case 0 : 
                      var tmp;
                      switch (action) {
                        case 0 : 
                            tmp = "proposal";
                            break;
                        case 1 : 
                            tmp = "endorsement";
                            break;
                        case 2 : 
                            tmp = "rejection";
                            break;
                        
                      }
                      return ReasonReact.element(/* None */0, /* None */0, Spinner.make("Your " + (tmp + " is being submitted"), /* None */0, /* array */[]));
                  case 1 : 
                      switch (cmdStatus[0]) {
                        case 0 : 
                            return ViewCommon.text("RED: User is already a partner of this venture");
                        case 1 : 
                            return ViewCommon.text("RED: Id doesn't exist or user has never logged in");
                        case 2 : 
                            if (onRetry) {
                              var onRetry$1 = onRetry[0];
                              return /* array */[
                                      ViewCommon.text("RED: your submission could not be persisted"),
                                      ReasonReact.element(/* None */0, /* None */0, MButton.make(/* None */0, /* Some */[(function () {
                                                    return Curry._1(onRetry$1, /* () */0);
                                                  })], /* None */0, /* Some */[true], /* None */0, /* None */0, /* array */[ViewCommon.text("Try Again")]))
                                    ];
                            } else {
                              return ViewCommon.text("RED: your submission could not be persisted");
                            }
                        
                      }
                  case 2 : 
                      switch (cmdStatus[0].tag | 0) {
                        case 0 : 
                            return ViewCommon.text("GREEN: Your proposal has been submited");
                        case 1 : 
                            return ViewCommon.text("GREEN: Your endorsement has been submited");
                        case 2 : 
                            return ViewCommon.text("GREEN: Your rejection has been submited");
                        
                      }
                  
                }
              }
            }),
          /* initialState */component$1[/* initialState */10],
          /* retainedProps */component$1[/* retainedProps */11],
          /* reducer */component$1[/* reducer */12],
          /* subscriptions */component$1[/* subscriptions */13],
          /* jsElementWrapped */component$1[/* jsElementWrapped */14]
        ];
}

var Status = /* module */[
  /* component */component$1,
  /* make */make$1
];

var text = ViewCommon.text;

var extractString = ViewCommon.extractString;

exports.text = text;
exports.extractString = extractString;
exports.component = component;
exports.make = make;
exports.Status = Status;
/* component Not a pure module */
