// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Body4 = require("./components/Body4.bs.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Theme = require("./Theme.bs.js");
var Utils = require("../utils/Utils.bs.js");
var React = require("react");
var Balance = require("./components/Balance.bs.js");
var Partner = require("./components/Partner.bs.js");
var MDivider = require("./components/MDivider.bs.js");
var LinkButton = require("./components/LinkButton.bs.js");
var MFabButton = require("./components/MFabButton.bs.js");
var MaterialUi = require("@jsiebern/bs-material-ui/src/MaterialUi.bs.js");
var ViewCommon = require("./ViewCommon.bs.js");
var MTypography = require("./components/MTypography.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Transaction = require("./components/Transaction.bs.js");
var PrimitiveTypes = require("../application/PrimitiveTypes.bs.js");

var component = ReasonReact.reducerComponent("SelectedVenture");

function make(viewData, session, commands, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */(function () {
              return /* record */[/* viewData */viewData];
            }),
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (param) {
              var send = param[/* send */3];
              var viewData = param[/* state */1][/* viewData */0];
              var partners = $$Array.of_list(List.map((function (partner) {
                          return ReasonReact.element(/* Some */[PrimitiveTypes.UserId[/* toString */0](partner[/* userId */0])], /* None */0, Partner.make(partner, /* None */0, /* array */[]));
                        }), viewData[/* partners */3]));
              var prospects = $$Array.of_list(List.map((function (prospect) {
                          return React.createElement("li", {
                                      key: PrimitiveTypes.UserId[/* toString */0](prospect[/* userId */1])
                                    }, ViewCommon.text("'" + (PrimitiveTypes.UserId[/* toString */0](prospect[/* userId */1]) + ("' endorsed by: " + List.fold_left((function (state, partnerId) {
                                                    return state + (partnerId + " ");
                                                  }), "", List.map(PrimitiveTypes.UserId[/* toString */0], prospect[/* endorsedBy */2]))))), List.mem(session[/* userId */0], prospect[/* endorsedBy */2]) === false ? React.createElement("button", {
                                            onClick: (function () {
                                                return Curry._1(send, /* EndorsePartner */Block.__(0, [prospect[/* processId */0]]));
                                              })
                                          }, ViewCommon.text("Endorse Partner")) : null);
                        }), viewData[/* prospects */4]));
              var removalProspects = $$Array.of_list(List.map((function (prospect) {
                          return React.createElement("li", {
                                      key: PrimitiveTypes.UserId[/* toString */0](prospect[/* userId */1])
                                    }, ViewCommon.text("'" + (PrimitiveTypes.UserId[/* toString */0](prospect[/* userId */1]) + ("' endorsed by: " + List.fold_left((function (state, partnerId) {
                                                    return state + (partnerId + " ");
                                                  }), "", List.map(PrimitiveTypes.UserId[/* toString */0], prospect[/* endorsedBy */2]))))), List.mem(session[/* userId */0], prospect[/* endorsedBy */2]) === false ? React.createElement("button", {
                                            onClick: (function () {
                                                return Curry._1(send, /* EndorsePartnerRemoval */Block.__(1, [prospect[/* processId */0]]));
                                              })
                                          }, ViewCommon.text("Endorse Removal")) : null);
                        }), viewData[/* removalProspects */5]));
              var unconfirmed = viewData[/* unconfirmedTxs */6];
              var confirmed = viewData[/* confirmedTxs */7];
              var transactions = $$Array.of_list(Utils.intersperse((function (key) {
                          return ReasonReact.element(/* Some */[key], /* None */0, MDivider.make(/* array */[]));
                        }), List.append(List.mapi((function (iter, tx) {
                                  return ReasonReact.element(/* Some */[String(iter)], /* None */0, Transaction.make(tx, /* array */[]));
                                }), unconfirmed), List.mapi((function (iter, tx) {
                                  return ReasonReact.element(/* Some */[String(iter + List.length(unconfirmed) | 0)], /* None */0, Transaction.make(tx, /* array */[]));
                                }), confirmed))));
              var match = viewData[/* readOnly */2];
              return ReasonReact.element(/* None */0, /* None */0, Body4.make(/* Some */[/* :: */[
                                "Partners",
                                /* :: */[
                                  "Transactions",
                                  /* [] */0
                                ]
                              ]], React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, MTypography.make(/* Title */594052472, /* None */0, /* array */[ViewCommon.text(viewData[/* ventureName */1])])), ReasonReact.element(/* None */0, /* None */0, Balance.make(viewData[/* balance */8][/* currentSpendable */0], /* Some */[viewData[/* balance */8][/* reserved */1]], /* array */[]))), React.createElement("div", {
                                  className: Css.style(/* :: */[
                                        Css.display(/* flex */-1010954439),
                                        /* [] */0
                                      ])
                                }, ReasonReact.element(/* None */0, /* None */0, MFabButton.make(/* Aqua */0, /* Venture */Block.__(0, [
                                            viewData[/* ventureId */0],
                                            /* Receive */3
                                          ]), /* array */[ViewCommon.text("RECEIVE")])), React.createElement("div", {
                                      className: Css.style(/* :: */[
                                            Css.width(Css.px(Theme.space(8))),
                                            /* [] */0
                                          ])
                                    }), ReasonReact.element(/* None */0, /* None */0, MFabButton.make(/* Orange */1, /* Venture */Block.__(0, [
                                            viewData[/* ventureId */0],
                                            /* CreatePayout */2
                                          ]), /* array */[ViewCommon.text("PAY OUT")]))), React.createElement("div", undefined, match ? React.createElement("b", undefined, ViewCommon.text("YOU HAVE BEEN REMOVED FROM THIS VENTURE; VENTURE IS IN READ ONLY")) : null, ReasonReact.element(/* None */0, /* None */0, MaterialUi.List[/* make */1](/* None */0, /* None */0, /* None */0, /* Some */[true], /* None */0, /* None */0, /* array */[partners])), React.createElement("h4", undefined, ViewCommon.text("Prospects:")), React.createElement("ul", undefined, prospects), React.createElement("h4", undefined, ViewCommon.text("To be removed:")), React.createElement("ul", undefined, removalProspects), ReasonReact.element(/* None */0, /* None */0, LinkButton.make(/* Venture */Block.__(0, [
                                            viewData[/* ventureId */0],
                                            /* ManagePartners */1
                                          ]), /* Some */[true], /* array */[ViewCommon.text("Add or Remove Partners")]))), React.createElement("div", undefined, React.createElement("h4", undefined, ViewCommon.text("Payout processes:")), ReasonReact.element(/* None */0, /* None */0, MaterialUi.List[/* make */1](/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[transactions]))), /* array */[]));
            }),
          /* initialState */(function () {
              return /* record */[/* viewData */viewData];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
              var match = state[/* viewData */0][/* readOnly */2];
              if (match) {
                return /* NoUpdate */0;
              } else {
                switch (action.tag | 0) {
                  case 0 : 
                      Curry._1(commands[/* endorsePartner */1], action[0]);
                      return /* NoUpdate */0;
                  case 1 : 
                      Curry._1(commands[/* endorsePartnerRemoval */5], action[0]);
                      return /* NoUpdate */0;
                  case 2 : 
                      Curry._1(commands[/* rejectPayout */8], action[0]);
                      return /* NoUpdate */0;
                  case 3 : 
                      Curry._1(commands[/* endorsePayout */7], action[0]);
                      return /* NoUpdate */0;
                  
                }
              }
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

var text = ViewCommon.text;

var extractString = ViewCommon.extractString;

var ViewData = 0;

exports.text = text;
exports.extractString = extractString;
exports.ViewData = ViewData;
exports.component = component;
exports.make = make;
/* component Not a pure module */
