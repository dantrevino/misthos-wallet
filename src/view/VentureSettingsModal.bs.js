// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Grid = require("./components/Grid.bs.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Colors = require("./Colors.bs.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var ScrollList = require("./components/ScrollList.bs.js");
var ViewCommon = require("./ViewCommon.bs.js");
var MTypography = require("./components/MTypography.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var MaterialUi_Table = require("@jsiebern/bs-material-ui/src/MaterialUi_Table.bs.js");
var SingleActionButton = require("./components/SingleActionButton.bs.js");
var MaterialUi_TableRow = require("@jsiebern/bs-material-ui/src/MaterialUi_TableRow.bs.js");
var MaterialUi_TableBody = require("@jsiebern/bs-material-ui/src/MaterialUi_TableBody.bs.js");
var MaterialUi_TableCell = require("@jsiebern/bs-material-ui/src/MaterialUi_TableCell.bs.js");
var MaterialUi_TableHead = require("@jsiebern/bs-material-ui/src/MaterialUi_TableHead.bs.js");

var atRiskKeyStatus = Css.style(/* :: */[
      Css.color(Colors.error),
      /* [] */0
    ]);

var Styles = /* module */[/* atRiskKeyStatus */atRiskKeyStatus];

function policyDescription(param) {
  if (typeof param === "number") {
    if (param === 0) {
      return "Unanimous";
    } else {
      return "Unanimous minus 1";
    }
  } else if (param.tag) {
    return "At least " + String(param[0][/* n */0]);
  } else {
    return String(param[0][/* percentage */0]) + "%";
  }
}

var component = ReasonReact.statelessComponent("VentureSettings");

function make(viewData, commands, cmdStatus, _) {
  var executeSubmit = function () {
    Curry._1(commands[/* preSubmit */13], "Please connect your Ledger device and open the BTC app");
    Curry._1(viewData[/* getCustodianKeyChain */2], /* () */0).then((function (param) {
            if (typeof param === "number") {
              return Promise.resolve(Curry._1(commands[/* preSubmitError */14], "This device has the wrong seed"));
            } else if (param.tag) {
              var match = param[0];
              if (match) {
                return Promise.resolve(Curry._1(commands[/* preSubmitError */14], match[0]));
              } else {
                return Promise.resolve(Curry._1(commands[/* preSubmitError */14], "An unknown error has occured"));
              }
            } else {
              return Promise.resolve(Curry._1(commands[/* submitCustodianKeyChain */8], param[0]));
            }
          }));
    return /* () */0;
  };
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
              var match = viewData[/* ledgerId */0];
              var match$1 = viewData[/* ledgerUpToDate */1];
              var match$2 = match !== undefined ? (
                  match$1 ? /* tuple */[
                      "You have integrated your Ledger device.",
                      "Up to date"
                    ] : /* tuple */[
                      "You have integrated your Ledger device.",
                      "Needs rotating"
                    ]
                ) : /* tuple */[
                  "You currently have no Ledger device integrated into this venture.",
                  "Not submitted"
                ];
              var nSigs = Belt_Array.slice(Belt_Array.mapWithIndexU(viewData[/* accountSettings */3][/* coSignerList */0], (function (idx, nCoSigners) {
                          return ReasonReact.element(undefined, undefined, MaterialUi_TableRow.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* array */[
                                          ReasonReact.element(undefined, undefined, MaterialUi_TableCell.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* array */[ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text(String(idx))]))])),
                                          ReasonReact.element(undefined, undefined, MaterialUi_TableCell.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* array */[ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text(String(nCoSigners) + ("-of-" + String(idx)))]))]))
                                        ]));
                        })), 1, 10);
              var needsKeyRotation = !viewData[/* ledgerUpToDate */1] && Js_option.isSome(viewData[/* ledgerId */0]);
              var match$3 = viewData[/* accountSettings */3][/* sequence */1];
              var tmp;
              if (match$3 !== undefined) {
                var nBlocks = match$3;
                tmp = /* array */[
                  ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("Degrading multisig is enabled.")])),
                  ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, true, undefined, undefined, undefined, /* array */[ViewCommon.text("The unlock time is " + (String(nBlocks) + (" blocks (approximately " + (String(nBlocks / 144 | 0) + " days)."))))]))
                ];
              } else {
                tmp = ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("Degrading multisig is disabled.")]));
              }
              var match$4 = viewData[/* ledgerUpToDate */1] && Js_option.isSome(viewData[/* ledgerId */0]);
              return ReasonReact.element(undefined, undefined, Grid.make(Js_primitive.some(ViewCommon.text("Venture Configuration")), undefined, undefined, undefined, Js_primitive.some(React.createElement("div", {
                                      className: ScrollList.containerStyles
                                    }, ReasonReact.element(undefined, undefined, MTypography.make(/* Title */594052472, undefined, true, undefined, undefined, undefined, /* array */[ViewCommon.text("Policies")])), ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, true, undefined, undefined, undefined, /* array */[ViewCommon.text("The policies determine the threshold at which a proposal will be accepted. This Venture has the following policies:")])), ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("Partner addition: " + policyDescription(viewData[/* policies */4][/* addPartner */0]))])), ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("Partner removal: " + policyDescription(viewData[/* policies */4][/* removePartner */2]))])), ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("Payout: " + policyDescription(viewData[/* policies */4][/* payout */4]))])), ReasonReact.element(undefined, undefined, MTypography.make(/* Title */594052472, undefined, true, true, undefined, undefined, /* array */[ViewCommon.text("Wallet")])), tmp, ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, true, undefined, undefined, undefined, /* array */[ViewCommon.text("Here is an overview of the required signatures depending on the number of Custodians backing an address:")])), ReasonReact.element(undefined, undefined, ScrollList.make(/* array */[ReasonReact.element(undefined, undefined, MaterialUi_Table.make(undefined, undefined, undefined, undefined, /* array */[
                                                        ReasonReact.element(undefined, undefined, MaterialUi_TableHead.make(undefined, undefined, /* array */[ReasonReact.element("header", undefined, MaterialUi_TableRow.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* array */[
                                                                            ReasonReact.element(undefined, undefined, MaterialUi_TableCell.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* array */[ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("Number of Partners")]))])),
                                                                            ReasonReact.element(undefined, undefined, MaterialUi_TableCell.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* array */[ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("Signatures Required")]))]))
                                                                          ]))])),
                                                        ReasonReact.element(undefined, undefined, MaterialUi_TableBody.make(undefined, undefined, /* array */[nSigs]))
                                                      ]))])))), Js_primitive.some(React.createElement("div", undefined, ReasonReact.element(undefined, undefined, MTypography.make(/* Title */594052472, undefined, true, undefined, undefined, undefined, /* array */[ViewCommon.text("Hardware Wallet Integration")])), ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, true, undefined, undefined, undefined, /* array */[ViewCommon.text(match$2[0])])), ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[
                                              ViewCommon.text("Key status: "),
                                              React.createElement("span", {
                                                    className: needsKeyRotation ? atRiskKeyStatus : ""
                                                  }, ViewCommon.text(match$2[1]))
                                            ])), match$4 ? null : ReasonReact.element(undefined, undefined, SingleActionButton.make("Submit public keys", undefined, executeSubmit, undefined, undefined, true, false, /* SubmitKeys */3, cmdStatus, /* array */[])))), undefined, undefined, /* array */[]));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

var text = ViewCommon.text;

var extractString = ViewCommon.extractString;

var ignoreEvent = ViewCommon.ignoreEvent;

var ViewData = 0;

exports.text = text;
exports.extractString = extractString;
exports.ignoreEvent = ignoreEvent;
exports.ViewData = ViewData;
exports.Styles = Styles;
exports.policyDescription = policyDescription;
exports.component = component;
exports.make = make;
/* atRiskKeyStatus Not a pure module */
