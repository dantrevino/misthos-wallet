// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Body2 = require("./components/Body2.bs.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var MInput = require("./components/MInput.bs.js");
var $$String = require("bs-platform/lib/js/string.js");
var MButton = require("./components/MButton.bs.js");
var Partner = require("./components/Partner.bs.js");
var Spinner = require("./components/Spinner.bs.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var MaterialUi = require("@jsiebern/bs-material-ui/src/MaterialUi.bs.js");
var ViewCommon = require("./ViewCommon.bs.js");
var MTypography = require("./components/MTypography.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var PrimitiveTypes = require("../application/PrimitiveTypes.bs.js");
var RemovePartnerSvg = require("../assets/img/remove-partner.svg");

var component = ReasonReact.reducerComponent("ManagePartners");

function make(viewData, commands, cmdStatus, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */(function (param) {
              return /* record */[
                      /* viewData */viewData,
                      /* inputs */param[/* state */1][/* inputs */1]
                    ];
            }),
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (param) {
              var send = param[/* send */3];
              var match = param[/* state */1];
              var viewData = match[/* viewData */0];
              var feedback;
              if (typeof cmdStatus === "number") {
                feedback = null;
              } else {
                switch (cmdStatus.tag | 0) {
                  case 0 : 
                      feedback = ReasonReact.element(/* None */0, /* None */0, Spinner.make("waiting for result", /* None */0, /* array */[]));
                      break;
                  case 1 : 
                      feedback = ViewCommon.text("Could not execute teh command");
                      break;
                  case 2 : 
                      feedback = null;
                      break;
                  
                }
              }
              var partners = $$Array.of_list(Belt_List.keepMapU(viewData[/* partners */0], (function (partner) {
                          var match = partner[/* canProposeRemoval */2];
                          if (match) {
                            return /* Some */[ReasonReact.element(/* Some */[PrimitiveTypes.UserId[/* toString */0](partner[/* userId */0])], /* None */0, Partner.make(partner[/* userId */0], partner[/* name */1], /* Some */[ReasonReact.element(/* None */0, /* None */0, MaterialUi.IconButton[/* make */3](/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[(function () {
                                                            return Curry._1(send, /* RemovePartner */Block.__(1, [partner[/* userId */0]]));
                                                          })], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[React.createElement("img", {
                                                              alt: "Remove",
                                                              src: RemovePartnerSvg
                                                            })]))], /* array */[]))];
                          } else {
                            return /* None */0;
                          }
                        })));
              return ReasonReact.element(/* None */0, /* None */0, Body2.make(/* Some */[/* :: */[
                                "Add a partner",
                                /* :: */[
                                  "Remove a partner",
                                  /* [] */0
                                ]
                              ]], React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, MTypography.make(/* Body2 */-904051920, /* None */0, /* array */[ViewCommon.text("\n                 To propose adding a new partner to the venture,\n                 enter a valid Blockstack ID below. When enough partners endorse this proposal,\n                 the partner will be added.\n                ")])), ReasonReact.element(/* None */0, /* None */0, MInput.make(/* Some */["Enter a Blockstack ID"], /* Some */[/* `String */[
                                            -976970511,
                                            match[/* inputs */1][/* prospectId */0]
                                          ]], /* Some */[(function (e) {
                                              return Curry._1(send, /* ChangeNewPartnerId */Block.__(0, [ViewCommon.extractString(e)]));
                                            })], /* Some */[false], /* Some */[true], /* None */0, /* None */0, /* array */[])), ReasonReact.element(/* None */0, /* None */0, MButton.make(/* None */0, /* Some */[(function () {
                                              return Curry._1(send, /* ProposePartner */0);
                                            })], /* None */0, /* Some */[true], /* None */0, /* None */0, /* array */[ViewCommon.text("Propose partner addition")])), ReasonReact.element(/* None */0, /* None */0, MTypography.make(/* Body2 */-904051920, /* None */0, /* array */[ViewCommon.text("\n               Please send the following URL to the proposed Partner so they can access the Venture:\n               ")])), ReasonReact.element(/* None */0, /* None */0, MTypography.make(/* Body2 */-904051920, /* None */0, /* array */[ViewCommon.text(viewData[/* joinVentureUrl */1])])), feedback), React.createElement("div", undefined, ReasonReact.element(/* None */0, /* None */0, MTypography.make(/* Body2 */-904051920, /* None */0, /* array */[ViewCommon.text("\n               To propose the removal of a partner from this venture,\n               select his or her name below and submit your proposal.\n               When enough partners endorse this proposal, the partner will be removed.\n               ")])), ReasonReact.element(/* None */0, /* None */0, MaterialUi.List[/* make */1](/* None */0, /* None */0, /* None */0, /* Some */[true], /* None */0, /* None */0, /* array */[partners]))), /* array */[]));
            }),
          /* initialState */(function () {
              return /* record */[
                      /* viewData */viewData,
                      /* inputs : record */[/* prospectId */""]
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
              if (typeof action === "number") {
                var prospectId = $$String.trim(state[/* inputs */1][/* prospectId */0]);
                if (prospectId === "") {
                  return /* NoUpdate */0;
                } else {
                  Curry._1(commands[/* proposePartner */0], PrimitiveTypes.UserId[/* fromString */1](prospectId));
                  return /* Update */Block.__(0, [/* record */[
                              /* viewData */state[/* viewData */0],
                              /* inputs : record */[/* prospectId */""]
                            ]]);
                }
              } else if (action.tag) {
                Curry._1(commands[/* proposePartnerRemoval */3], action[0]);
                return /* NoUpdate */0;
              } else {
                return /* Update */Block.__(0, [/* record */[
                            /* viewData */state[/* viewData */0],
                            /* inputs : record */[/* prospectId */action[0]]
                          ]]);
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
