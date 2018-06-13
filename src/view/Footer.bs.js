// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Icons = require("./Icons.bs.js");
var Theme = require("./Theme.bs.js");
var React = require("react");
var Colors = require("./Colors.bs.js");
var ViewCommon = require("./ViewCommon.bs.js");
var MTypography = require("./components/MTypography.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

var component = ReasonReact.statelessComponent("Footer");

var grid = Css.style(/* :: */[
      Css.display(Css.grid),
      /* :: */[
        Css.unsafe("gridTemplateAreas", "\n           \". . . . .\"\n           \". footer1 footer2 footer3 .\"\n           \". notice . . .\"\n           \". . . . .\"\n           "),
        /* :: */[
          Css.unsafe("gridTemplateColumns", "[begin] 0px 1fr 1fr 1fr 0px [end]"),
          /* :: */[
            Css.unsafe("gridTemplateRows", "[begin] 0px min-content min-content 0px [end]"),
            /* :: */[
              Css.gridGap(Css.px(Theme.space(2))),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

function area(area$1) {
  return Css.style(/* :: */[
              Css.unsafe("gridArea", area$1),
              /* [] */0
            ]);
}

var bg = Css.style(/* :: */[
      Css.backgroundColor(Colors.darkGray),
      /* :: */[
        Css.unsafe("gridColumn", "begin / end"),
        /* :: */[
          Css.unsafe("gridRow", "begin / end"),
          /* [] */0
        ]
      ]
    ]);

var logo = Css.style(/* :: */[
      Css.marginTop(Css.px(Theme.space(4))),
      /* [] */0
    ]);

var notice = Css.style(/* :: */[
      Css.unsafe("gridArea", "notice"),
      /* :: */[
        Css.fontFamily(Theme.sourceSansPro),
        /* :: */[
          Css.fontSize(Css.px(14)),
          /* :: */[
            Css.color(Colors.white),
            /* [] */0
          ]
        ]
      ]
    ]);

var link = Css.style(/* :: */[
      Css.display(Css.block),
      /* :: */[
        Css.height(Css.px(Theme.space(3))),
        /* :: */[
          Css.marginBottom(Css.px(12)),
          /* :: */[
            Css.fontFamily(Theme.oswald),
            /* :: */[
              Css.fontWeight(600),
              /* :: */[
                Css.fontSize(Css.px(14)),
                /* :: */[
                  Css.color(Colors.white),
                  /* :: */[
                    Css.textDecoration(Css.underline),
                    /* :: */[
                      Css.textTransform(Css.uppercase),
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]);

var Styles = /* module */[
  /* grid */grid,
  /* area */area,
  /* bg */bg,
  /* logo */logo,
  /* notice */notice,
  /* link */link
];

function make() {
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
                          className: grid
                        }, React.createElement("div", {
                              className: bg
                            }), React.createElement("div", {
                              className: area("footer1")
                            }, React.createElement("div", {
                                  className: logo
                                }, Icons.misthosWordMark)), React.createElement("div", {
                              className: area("footer2")
                            }, ReasonReact.element(/* None */0, /* None */0, MTypography.make(/* Headline */579538228, /* None */0, /* array */[ViewCommon.text("Company")])), React.createElement("a", {
                                  className: link
                                }, ViewCommon.text("Frequently Asked Questions")), React.createElement("a", {
                                  className: link,
                                  href: "mailto:contact@misthos.io"
                                }, ViewCommon.text("Contact us")), React.createElement("a", {
                                  className: link,
                                  href: "mailto:jobs@misthos.io"
                                }, ViewCommon.text("Jobs")), React.createElement("a", {
                                  className: link
                                }, ViewCommon.text("Datenshutzerklärung")), React.createElement("a", {
                                  className: link
                                }, ViewCommon.text("Impressum"))), React.createElement("div", {
                              className: area("footer3")
                            }, ReasonReact.element(/* None */0, /* None */0, MTypography.make(/* Headline */579538228, /* None */0, /* array */[ViewCommon.text("Stay Connected")]))), React.createElement("div", {
                              className: notice
                            }, ViewCommon.text("© Misthos 2018. All rights reserved.")));
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
