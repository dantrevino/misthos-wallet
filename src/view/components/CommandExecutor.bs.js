// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Theme = require("../Theme.bs.js");
var Utils = require("../../utils/Utils.bs.js");
var Colors = require("../Colors.bs.js");
var ViewCommon = require("../ViewCommon.bs.js");
var MTypography = require("./MTypography.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUi_LinearProgress = require("@jsiebern/bs-material-ui/src/MaterialUi_LinearProgress.bs.js");

var component = ReasonReact.reducerComponent("CommandExecuter");

function make(commands, lastResponse, onProcessStarted, children) {
  var wrapCommands = function (send) {
    return /* record */[
            /* reset */(function () {
                return Curry._1(send, /* Reset */0);
              }),
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
            /* submitCustodianKeyChain */(function (keyChain) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* submitCustodianKeyChain */6], keyChain)]);
              }),
            /* proposePayout */(function (accountIdx, payoutTx) {
                return Curry._1(send, /* CommandExecuted */[Curry._2(commands[/* proposePayout */7], accountIdx, payoutTx)]);
              }),
            /* endorsePayout */(function (processId) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* endorsePayout */8], processId)]);
              }),
            /* rejectPayout */(function (processId) {
                return Curry._1(send, /* CommandExecuted */[Curry._1(commands[/* rejectPayout */9], processId)]);
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
                    if (typeof success === "number") {
                      tmp = /* Success */Block.__(2, [success]);
                    } else if (success.tag) {
                      tmp = /* Success */Block.__(2, [success]);
                    } else {
                      var processId = success[0];
                      Utils.mapOption((function (fn) {
                              return Curry._1(fn, processId);
                            }), onProcessStarted);
                      tmp = /* Success */Block.__(2, [/* ProcessStarted */Block.__(0, [processId])]);
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
              if (action) {
                return /* Update */Block.__(0, [/* record */[/* cmdStatus : Pending */Block.__(0, [action[0]])]]);
              } else {
                return /* Update */Block.__(0, [/* record */[/* cmdStatus : Idle */0]]);
              }
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

function message(variant, message$1) {
  var color = variant ? Colors.error : Colors.success;
  return ReasonReact.element(/* None */0, /* None */0, MTypography.make(/* Body2 */-904051920, /* Some */[Css.style(/* :: */[
                        Css.color(color),
                        /* [] */0
                      ])], /* None */0, /* None */0, /* None */0, /* None */0, /* array */[ViewCommon.text(message$1)]));
}

var component$1 = ReasonReact.statelessComponent("CommandStatus");

function make$1(cmdStatus, action, _) {
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
                            tmp = "Venture is being created";
                            break;
                        case 1 : 
                            tmp = "Joining venture";
                            break;
                        case 2 : 
                            tmp = "Loading venture";
                            break;
                        case 3 : 
                            tmp = "Your public keys are being submitted";
                            break;
                        case 4 : 
                            tmp = "Your proposal is being submitted";
                            break;
                        case 5 : 
                            tmp = "Your endorsement is being submitted";
                            break;
                        case 6 : 
                            tmp = "Your rejection is being submitted";
                            break;
                        
                      }
                      return /* array */[
                              ReasonReact.element(/* None */0, /* None */0, MTypography.make(/* Body2 */-904051920, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[ViewCommon.text(tmp)])),
                              ReasonReact.element(/* None */0, /* None */0, MaterialUi_LinearProgress.make(/* Some */[Css.style(/* :: */[
                                              Css.marginTop(Css.px(Theme.space(1))),
                                              /* [] */0
                                            ])], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[]))
                            ];
                  case 1 : 
                      switch (cmdStatus[0]) {
                        case 0 : 
                            return message(/* Error */1, "You are not a custodian of this venture");
                        case 1 : 
                            return message(/* Error */1, "Error joining venture. Please contact us if this problem persists.");
                        case 2 : 
                            return message(/* Error */1, "Error loading venture. Please contact us if this problem persist");
                        case 3 : 
                            return message(/* Error */1, "The maximum number of partners we currently support in a venture has been reached");
                        case 4 : 
                            return message(/* Error */1, "User is already a partner of this venture");
                        case 5 : 
                            return message(/* Error */1, "This user has already been proposed to join");
                        case 6 : 
                            return message(/* Error */1, "Blockstack id does not exist, or is corrupted");
                        case 7 : 
                            return message(/* Error */1, "Your submission could not be persisted, probably due to network connectivity.");
                        
                      }
                  case 2 : 
                      var tmp$1 = cmdStatus[0];
                      if (typeof tmp$1 === "number") {
                        return message(/* Success */0, "Your public Keys have been submitted");
                      } else {
                        switch (tmp$1.tag | 0) {
                          case 0 : 
                              return message(/* Success */0, "Your proposal has been submitted");
                          case 1 : 
                              return message(/* Success */0, "Your endorsement has been submitted");
                          case 2 : 
                              return message(/* Success */0, "Your rejection has been submitted");
                          
                        }
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
  /* message */message,
  /* component */component$1,
  /* make */make$1
];

var text = ViewCommon.text;

var extractString = ViewCommon.extractString;

var ignoreEvent = ViewCommon.ignoreEvent;

exports.text = text;
exports.extractString = extractString;
exports.ignoreEvent = ignoreEvent;
exports.component = component;
exports.make = make;
exports.Status = Status;
/* component Not a pure module */
