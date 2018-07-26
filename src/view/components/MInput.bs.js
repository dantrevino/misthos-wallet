// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Block = require("bs-platform/lib/js/block.js");
var Theme = require("../Theme.bs.js");
var ViewCommon = require("../ViewCommon.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUi_Input = require("@jsiebern/bs-material-ui/src/MaterialUi_Input.bs.js");
var MaterialUi_FormControl = require("@jsiebern/bs-material-ui/src/MaterialUi_FormControl.bs.js");
var MaterialUi_FormHelperText = require("@jsiebern/bs-material-ui/src/MaterialUi_FormHelperText.bs.js");

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

var inputRoot = Css.style(/* :: */[
      Css.fontSize(Css.px(14)),
      /* [] */0
    ]);

var Styles = /* module */[
  /* margin */margin,
  /* inputRoot */inputRoot
];

function make(placeholder, value, onChange, autoFocus, fullWidth, endAdornment, error, name, inputProps, type_, $staropt$star, _) {
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
              var match = error ? /* tuple */[
                  true,
                  error[0]
                ] : /* tuple */[
                  false,
                  ""
                ];
              var error$1 = match[0];
              return ReasonReact.element(/* None */0, /* None */0, MaterialUi_FormControl.make(/* Some */[margin(ensuring ? 4 : 3, 0)], /* None */0, /* None */0, /* Some */[error$1], fullWidth, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[
                              ReasonReact.element(/* None */0, /* None */0, MaterialUi_Input.make(/* None */0, autoFocus, /* None */0, /* None */0, /* None */0, /* None */0, endAdornment, /* None */0, /* None */0, /* None */0, /* None */0, inputProps, /* None */0, /* None */0, /* None */0, name, /* None */0, onChange, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, placeholder, /* None */0, /* None */0, /* None */0, /* None */0, type_, value, /* Some */[/* :: */[
                                          /* Root */Block.__(0, [inputRoot]),
                                          /* [] */0
                                        ]], /* None */0, /* array */[])),
                              error$1 ? ReasonReact.element(/* None */0, /* None */0, MaterialUi_FormHelperText.make(/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[ViewCommon.text(match[1])])) : null
                            ]));
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
