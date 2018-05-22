// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("../application/wallet/BTC.bs.js");
var Css = require("bs-css/src/Css.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Body4 = require("./components/Body4.bs.js");
var Theme = require("./Theme.bs.js");
var Utils = require("../utils/Utils.bs.js");
var React = require("react");
var Router = require("./Router.bs.js");
var Balance = require("./components/Balance.bs.js");
var Partner = require("./components/Partner.bs.js");
var MDivider = require("./components/MDivider.bs.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var LinkButton = require("./components/LinkButton.bs.js");
var MFabButton = require("./components/MFabButton.bs.js");
var MaterialUi = require("@jsiebern/bs-material-ui/src/MaterialUi.bs.js");
var ViewCommon = require("./ViewCommon.bs.js");
var MTypography = require("./components/MTypography.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Transaction = require("./components/Transaction.bs.js");
var PrimitiveTypes = require("../application/PrimitiveTypes.bs.js");

var component = ReasonReact.statelessComponent("SelectedVenture");

function make(viewData, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function () {
              var prospects = List.map((function (prospect) {
                      var partial_arg_000 = viewData[/* ventureId */0];
                      var partial_arg_001 = /* Partner */Block.__(0, [prospect[/* processId */0]]);
                      var partial_arg = /* Venture */Block.__(0, [
                          partial_arg_000,
                          partial_arg_001
                        ]);
                      var match = prospect[/* processType */2];
                      return ReasonReact.element(/* Some */[PrimitiveTypes.ProcessId[/* toString */0](prospect[/* processId */0])], /* None */0, MaterialUi.ListItem[/* make */1](/* Some */[true], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[(function (param) {
                                          return Router.clickToRoute(partial_arg, param);
                                        })], /* None */0, /* array */[ViewCommon.text((
                                            match ? "Addition" : "Removal"
                                          ) + (" of '" + (PrimitiveTypes.UserId[/* toString */0](prospect[/* userId */1]) + "' proposed")))]));
                    }), viewData[/* prospects */4]);
              var partners = $$Array.of_list(Belt_List.concat(prospects, List.map((function (partner) {
                              return ReasonReact.element(/* Some */[PrimitiveTypes.UserId[/* toString */0](partner[/* userId */0])], /* None */0, Partner.make(partner[/* userId */0], partner[/* name */1], /* None */0, /* array */[]));
                            }), viewData[/* partners */3])));
              var payouts = List.map((function (param) {
                      var processId = param[/* processId */0];
                      var partial_arg_000 = viewData[/* ventureId */0];
                      var partial_arg_001 = /* Payout */Block.__(1, [processId]);
                      var partial_arg = /* Venture */Block.__(0, [
                          partial_arg_000,
                          partial_arg_001
                        ]);
                      return ReasonReact.element(/* Some */[PrimitiveTypes.ProcessId[/* toString */0](processId)], /* None */0, MaterialUi.ListItem[/* make */1](/* Some */[true], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[(function (param) {
                                          return Router.clickToRoute(partial_arg, param);
                                        })], /* None */0, /* array */[ViewCommon.text("'" + (PrimitiveTypes.ProcessId[/* toString */0](processId) + ("' - " + BTC.format(param[/* data */4][/* summary */1][/* spentWithFees */2]))))]));
                    }), viewData[/* payoutsPendingApproval */7]);
              var unconfirmed = viewData[/* unconfirmedTxs */5];
              var confirmed = viewData[/* confirmedTxs */6];
              var transactions = $$Array.of_list(Utils.intersperse((function (key) {
                          return ReasonReact.element(/* Some */[key], /* None */0, MDivider.make(/* array */[]));
                        }), Belt_List.concatMany(/* array */[
                            payouts,
                            List.mapi((function (iter, tx) {
                                    return ReasonReact.element(/* Some */[String(iter)], /* None */0, Transaction.make(tx, /* array */[]));
                                  }), unconfirmed),
                            List.mapi((function (iter, tx) {
                                    return ReasonReact.element(/* Some */[String(iter + List.length(unconfirmed) | 0)], /* None */0, Transaction.make(tx, /* array */[]));
                                  }), confirmed)
                          ])));
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
                                          ]), /* array */[ViewCommon.text("PAY OUT")]))), React.createElement("div", undefined, match ? React.createElement("b", undefined, ViewCommon.text("YOU HAVE BEEN REMOVED FROM THIS VENTURE; VENTURE IS IN READ ONLY")) : null, ReasonReact.element(/* None */0, /* None */0, MaterialUi.List[/* make */1](/* None */0, /* None */0, /* None */0, /* Some */[true], /* None */0, /* None */0, /* array */[partners])), ReasonReact.element(/* None */0, /* None */0, LinkButton.make(/* Venture */Block.__(0, [
                                            viewData[/* ventureId */0],
                                            /* ManagePartners */1
                                          ]), /* Some */[true], /* array */[ViewCommon.text("Add or Remove Partners")]))), React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, MaterialUi.List[/* make */1](/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[transactions]))), /* array */[]));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
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
