// Generated by BUCKLESCRIPT VERSION 4.0.4, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Utils = require("../utils/Utils.bs.js");
var React = require("react");
var Colors = require("./Colors.bs.js");
var Router = require("./Router.bs.js");
var Spinner = require("./components/Spinner.bs.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var ViewCommon = require("./ViewCommon.bs.js");
var MTypography = require("./components/MTypography.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var PrimitiveTypes = require("../application/PrimitiveTypes.bs.js");
var MaterialUi_List = require("@jsiebern/bs-material-ui/src/MaterialUi_List.bs.js");
var MaterialUi_ListItem = require("@jsiebern/bs-material-ui/src/MaterialUi_ListItem.bs.js");
var MaterialUi_ListItemText = require("@jsiebern/bs-material-ui/src/MaterialUi_ListItemText.bs.js");

var component = ReasonReact.statelessComponent("VentureList");

var linkSelected = Css.style(/* :: */[
      Css.color(Colors.misthosTeal),
      /* [] */0
    ]);

var link = Css.style(/* :: */[
      Css.fontSize(Css.px(16)),
      /* :: */[
        Css.textDecoration(Css.underline),
        /* [] */0
      ]
    ]);

var Styles = /* module */[
  /* linkSelected */linkSelected,
  /* link */link
];

function make(selected, index, _) {
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
              var ventures = Utils.mapOption((function (param) {
                      return param[/* ventures */0];
                    }), index);
              var breakingChange = Utils.mapOption((function (param) {
                      return param[/* breakingChange */1];
                    }), index);
              var breakingNotification = breakingChange !== undefined && breakingChange ? ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, Css.style(/* :: */[
                              Css.color(Colors.error),
                              /* [] */0
                            ]), true, undefined, undefined, undefined, /* array */[ViewCommon.text("In preparation for our mainnet launch it has been necessary to make a breaking change. As a result your testnet ventures are no longer accessible. We will garuantee backwards compatibility following our public release on mainnet.")])) : null;
              var ventureList;
              if (ventures !== undefined) {
                var ventures$1 = ventures;
                ventureList = ventures$1 ? $$Array.of_list(List.map((function (param) {
                              var id = param[/* id */0];
                              var ids = PrimitiveTypes.VentureId[/* toString */0](id);
                              var partial_arg = /* Venture */Block.__(0, [
                                  id,
                                  /* None */0
                                ]);
                              var match = Caml_obj.caml_equal(Js_primitive.some(id), selected);
                              return ReasonReact.element(ids, undefined, MaterialUi_ListItem.make(true, undefined, /* `String */[
                                              -976970511,
                                              "li"
                                            ], undefined, undefined, true, undefined, undefined, undefined, undefined, /* `String */[
                                              -976970511,
                                              ids
                                            ], undefined, (function (param) {
                                                return Router.clickToRoute(partial_arg, param);
                                              }), undefined, undefined, /* array */[ReasonReact.element(undefined, undefined, MaterialUi_ListItemText.make(undefined, undefined, undefined, Js_primitive.some(ReasonReact.element(undefined, undefined, MTypography.make(/* Title */594052472, link + (" " + (
                                                                      match ? linkSelected : ""
                                                                    )), undefined, undefined, undefined, undefined, /* array */[ViewCommon.text(param[/* name */1])]))), undefined, undefined, undefined, undefined, undefined, /* array */[]))]));
                            }), ventures$1)) : ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("You are not part of any Ventures yet. Create a new Venture, or join an existing Venture if you have an invite link from a Partner.")]));
              } else {
                ventureList = ReasonReact.element(undefined, undefined, Spinner.make("loading index", undefined, /* array */[]));
              }
              return React.createElement("div", undefined, ReasonReact.element(undefined, undefined, MaterialUi_List.make(undefined, undefined, true, true, undefined, undefined, undefined, /* array */[
                                  breakingNotification,
                                  ventureList
                                ])));
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

var ignoreEvent = ViewCommon.ignoreEvent;

exports.text = text;
exports.extractString = extractString;
exports.ignoreEvent = ignoreEvent;
exports.component = component;
exports.Styles = Styles;
exports.make = make;
/* component Not a pure module */
