// Generated by BUCKLESCRIPT VERSION 4.0.4, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("../../application/wallet/BTC.bs.js");
var Css = require("bs-css/src/Css.js");
var Theme = require("../Theme.bs.js");
var React = require("react");
var ViewCommon = require("../ViewCommon.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

var component = ReasonReact.statelessComponent("Balance");

var balance = Css.style(/* :: */[
      Css.fontFamily(Theme.sourceSansPro),
      /* :: */[
        Css.fontWeight(600),
        /* :: */[
          Css.fontSize(Css.px(92)),
          /* :: */[
            Css.fontStyle(Css.normal),
            /* :: */[
              Css.lineHeight(1.0),
              /* :: */[
                Css.letterSpacing(Css.px(1)),
                /* :: */[
                  Css.unsafe("fill", "rgba(0, 0, 0, 1)"),
                  /* [] */0
                ]
              ]
            ]
          ]
        ]
      ]
    ]);

var btc = Css.style(/* :: */[
      Css.fontWeight(300),
      /* [] */0
    ]);

var reserved = Css.style(/* :: */[
      Css.fontSize(Css.px(36)),
      /* :: */[
        Css.unsafe("fill", "rgba(0, 0, 0, 0.5)"),
        /* [] */0
      ]
    ]);

var container = Css.style(/* :: */[
      Css.textAlign(Css.center),
      /* [] */0
    ]);

var Styles = /* module */[
  /* balance */balance,
  /* btc */btc,
  /* reserved */reserved,
  /* container */container
];

function make(currentSpendable, reserved$1, _) {
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
              var viewBox = reserved$1 !== undefined ? "0 -92 640 184" : "0 -77 640 92";
              return React.createElement("svg", {
                          className: balance,
                          width: "100%",
                          viewBox: viewBox
                        }, React.createElement("text", undefined, ViewCommon.text(BTC.format(currentSpendable)), React.createElement("tspan", {
                                  key: "currentSpendable",
                                  className: btc
                                }, ViewCommon.text(" BTC"))), reserved$1 !== undefined ? React.createElement("text", {
                                className: reserved,
                                dy: "55px"
                              }, ViewCommon.text(BTC.format(Js_primitive.valFromOption(reserved$1))), React.createElement("tspan", {
                                    key: "currentSpendable",
                                    className: btc
                                  }, ViewCommon.text(" BTC IN RESERVE"))) : null);
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
