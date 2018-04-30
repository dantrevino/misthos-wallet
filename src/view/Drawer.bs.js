// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Utils = require("../utils/Utils.bs.js");
var React = require("react");
var LinkButton = require("./components/LinkButton.bs.js");
var MaterialUi = require("@jsiebern/bs-material-ui/src/MaterialUi.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var VentureList = require("./VentureList.bs.js");

var component = ReasonReact.statelessComponent("Drawer");

var container = Css.style(/* :: */[
      Css.display(/* flex */-1010954439),
      /* :: */[
        Css.flexDirection(Css.column),
        /* [] */0
      ]
    ]);

var flex_ = Css.style(/* :: */[
      Css.flex(1),
      /* [] */0
    ]);

var Styles = /* module */[
  /* container */container,
  /* flex_ */flex_
];

function make(onSignOut, index, selected, _) {
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
              return React.createElement("div", {
                          className: container
                        }, ReasonReact.element(/* None */0, /* None */0, VentureList.make(selected, index, /* array */[])), React.createElement("div", {
                              className: flex_
                            }), ReasonReact.element(/* None */0, /* None */0, LinkButton.make(/* CreateVenture */1, /* array */[Utils.text("Create a Venture")])), React.createElement("div", {
                              className: flex_
                            }), ReasonReact.element(/* None */0, /* None */0, MaterialUi.Button[/* make */7](/* None */0, /* Some */[/* Inherit */-72987685], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[onSignOut], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */["Sign Out"])));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

exports.component = component;
exports.Styles = Styles;
exports.make = make;
/* component Not a pure module */
