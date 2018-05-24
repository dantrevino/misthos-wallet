// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Theme = require("../Theme.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUi_Typography = require("@jsiebern/bs-material-ui/src/MaterialUi_Typography.bs.js");

var component = ReasonReact.statelessComponent("MTypography");

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

function make(variant, $staropt$star, children) {
  var className = $staropt$star ? $staropt$star[0] : "";
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
              var style = variant !== -904051920 ? (
                  variant !== 579538228 ? (
                      variant !== 594052472 ? margin(0, 0) : margin(4, 0)
                    ) : margin(4, 4)
                ) : margin(3, 0);
              return ReasonReact.element(/* None */0, /* None */0, MaterialUi_Typography.make(/* None */0, /* Some */[style + (" " + className)], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[variant], /* None */0, /* None */0, /* array */[children]));
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
