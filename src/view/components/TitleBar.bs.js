// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var React = require("react");
var Colors = require("../Colors.bs.js");
var MaterialUi = require("@jsiebern/bs-material-ui/src/MaterialUi.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var component = ReasonReact.statelessComponent("TitleBar");

var title = Css.style(/* :: */[
      Css.backgroundColor(Colors.black),
      /* [] */0
    ]);

var gradient = Css.style(/* :: */[
      Css.height(Css.px(4)),
      /* :: */[
        Css.backgroundImage(Colors.gradient),
        /* [] */0
      ]
    ]);

var Styles = /* module */[
  /* title */title,
  /* gradient */gradient
];

function make(children) {
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
              return ReasonReact.element(/* None */0, /* None */0, MaterialUi.Grid[/* make */23](/* None */0, /* None */0, /* Some */[title], /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[true], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[/* V12 */13], /* None */0, /* None */0, /* array */[
                              children,
                              React.createElement("div", {
                                    className: gradient
                                  })
                            ]));
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