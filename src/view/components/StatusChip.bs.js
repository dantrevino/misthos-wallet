// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Theme = require("../Theme.bs.js");
var Colors = require("../Colors.bs.js");
var ViewCommon = require("../ViewCommon.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUi_Chip = require("@jsiebern/bs-material-ui/src/MaterialUi_Chip.bs.js");

var component = ReasonReact.statelessComponent("StatusChip");

function chip(status) {
  var tmp;
  switch (status) {
    case 0 : 
        tmp = Css.rgba(245, 166, 35, 0.2);
        break;
    case 1 : 
        tmp = Css.rgba(255, 50, 83, 0.2);
        break;
    case 2 : 
        tmp = Css.rgba(2, 162, 180, 0.2);
        break;
    
  }
  var tmp$1;
  switch (status) {
    case 0 : 
        tmp$1 = Css.hex("f5a623");
        break;
    case 1 : 
        tmp$1 = Css.hex("ff3253");
        break;
    case 2 : 
        tmp$1 = Colors.misthosTeal;
        break;
    
  }
  return Css.style(/* :: */[
              Css.backgroundColor(tmp),
              /* :: */[
                Css.color(tmp$1),
                /* :: */[
                  Css.fontFamily(Theme.sourceSansPro),
                  /* :: */[
                    Css.fontWeight(600),
                    /* :: */[
                      Css.textTransform(Css.uppercase),
                      /* :: */[
                        Css.borderRadius(Css.px(0)),
                        /* :: */[
                          Css.minWidth(Css.px(Theme.space(11))),
                          /* [] */0
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]);
}

var Styles = /* module */[/* chip */chip];

function make(status, label, _) {
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
              var label$1 = ViewCommon.text(label);
              return ReasonReact.element(/* None */0, /* None */0, MaterialUi_Chip.make(/* None */0, /* Some */[chip(status)], /* None */0, /* None */0, /* Some */[label$1], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[]));
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

exports.text = text;
exports.extractString = extractString;
exports.component = component;
exports.Styles = Styles;
exports.make = make;
/* component Not a pure module */
