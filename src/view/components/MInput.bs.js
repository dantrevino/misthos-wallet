// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Theme = require("../Theme.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUi_Input = require("@jsiebern/bs-material-ui/src/MaterialUi_Input.bs.js");

var component = ReasonReact.statelessComponent("MInput");

function margin(tf, bf) {
  return Css.style(/* :: */[
              Css.marginTop(Css.px(Theme.space(tf))),
              /* :: */[
                Css.marginBottom(Css.px(Theme.space(bf))),
                /* [] */0
              ]
            ]);
}

var Styles = /* module */[/* margin */margin];

function make(placeholder, value, onChange, autoFocus, fullWidth, endAdornment, $staropt$star, _) {
  var ensuring = $staropt$star ? $staropt$star[0] : false;
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
              return ReasonReact.element(/* None */0, /* None */0, MaterialUi_Input.make(/* None */0, autoFocus, /* Some */[margin(ensuring ? 4 : 3, 0)], /* None */0, /* None */0, /* None */0, endAdornment, /* None */0, fullWidth, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, onChange, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, placeholder, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, value, /* None */0, /* None */0, /* array */[]));
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
