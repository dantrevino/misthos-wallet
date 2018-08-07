// Generated by BUCKLESCRIPT VERSION 4.0.3, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Icons = require("./Icons.bs.js");
var Theme = require("./Theme.bs.js");
var React = require("react");
var Colors = require("./Colors.bs.js");
var ViewCommon = require("./ViewCommon.bs.js");
var BreakPoints = require("./BreakPoints.bs.js");
var Environment = require("../web/Environment.bs.js");
var MTypography = require("./components/MTypography.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUi_Input = require("@jsiebern/bs-material-ui/src/MaterialUi_Input.bs.js");
var MaterialUi_Button = require("@jsiebern/bs-material-ui/src/MaterialUi_Button.bs.js");
var MaterialUi_MuiThemeProvider = require("@jsiebern/bs-material-ui/src/MaterialUi_MuiThemeProvider.bs.js");

var component = ReasonReact.statelessComponent("Footer");

var grid = Css.style(/* :: */[
      Css.display(Css.grid),
      /* :: */[
        BreakPoints.md(/* :: */[
              Css.unsafe("gridTemplateAreas", "\n           \". . . . .\"\n           \". footer1 footer2 footer3 .\"\n           \". notice . . .\"\n           \". . . . .\"\n           "),
              /* :: */[
                Css.unsafe("gridTemplateColumns", "[begin] 0px 1fr 1fr 1fr 0px [end]"),
                /* :: */[
                  Css.unsafe("gridTemplateRows", "[begin] 0px min-content min-content 0px [end]"),
                  /* [] */0
                ]
              ]
            ]),
        /* :: */[
          BreakPoints.sm(/* :: */[
                Css.unsafe("gridTemplateAreas", "\n           \". . . .\"\n           \". footer1 . .\"\n           \". footer2 footer3 .\"\n           \". notice notice .\"\n           \". . . .\"\n           "),
                /* :: */[
                  Css.unsafe("gridTemplateRows", "[begin] 0px min-content min-content min-content 0px [end]"),
                  /* :: */[
                    Css.unsafe("gridTemplateColumns", "[begin] 0px 1fr 1fr 0px [end]"),
                    /* :: */[
                      Css.gridGap(Css.px(Theme.space(3))),
                      /* [] */0
                    ]
                  ]
                ]
              ]),
          /* :: */[
            BreakPoints.xs(/* :: */[
                  Css.unsafe("gridTemplateAreas", "\n           \". . .\"\n           \". footer1 . \"\n           \". footer2 .\"\n           \". footer3 .\"\n           \". notice .\"\n           \". . .\"\n           "),
                  /* :: */[
                    Css.unsafe("gridTemplateRows", "[begin] 0px min-content min-content min-content min-content 0px [end]"),
                    /* :: */[
                      Css.unsafe("gridTemplateColumns", "[begin] 0px 1fr 0px [end]"),
                      /* :: */[
                        Css.gridGap(Css.px(Theme.space(2))),
                        /* [] */0
                      ]
                    ]
                  ]
                ]),
            /* [] */0
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
      /* :: */[
        Css.display(Css.block),
        /* [] */0
      ]
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

var social = Css.style(/* :: */[
      Css.marginTop(Css.px(Theme.space(4))),
      /* [] */0
    ]);

var socialIcon = Css.style(/* :: */[
      Css.marginRight(Css.px(Theme.space(2))),
      /* [] */0
    ]);

var Styles = /* module */[
  /* grid */grid,
  /* area */area,
  /* bg */bg,
  /* logo */logo,
  /* notice */notice,
  /* link */link,
  /* social */social,
  /* socialIcon */socialIcon
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
              var environment = Environment.get(/* () */0);
              return ReasonReact.element(undefined, undefined, MaterialUi_MuiThemeProvider.make(undefined, undefined, /* `ObjectGeneric */[
                              -317959944,
                              Theme.toJsUnsafe(Theme.theme(true, /* () */0))
                            ], /* array */[React.createElement("div", {
                                    className: grid
                                  }, React.createElement("div", {
                                        className: bg
                                      }), React.createElement("div", {
                                        className: area("footer1")
                                      }, React.createElement("a", {
                                            className: logo,
                                            href: environment[/* webDomain */3] + "/"
                                          }, Icons.misthosWordMark)), React.createElement("div", {
                                        className: area("footer2")
                                      }, ReasonReact.element(undefined, undefined, MTypography.make(/* Title */594052472, undefined, true, true, undefined, /* Primary */-791844958, /* array */[ViewCommon.text("Company")])), React.createElement("a", {
                                            className: link,
                                            href: environment[/* webDomain */3] + "/faq"
                                          }, ViewCommon.text("Frequently Asked Questions")), React.createElement("a", {
                                            className: link,
                                            href: "mailto:contact@misthos.io"
                                          }, ViewCommon.text("Contact us")), React.createElement("a", {
                                            className: link,
                                            href: "mailto:jobs@misthos.io"
                                          }, ViewCommon.text("Jobs")), React.createElement("a", {
                                            className: link,
                                            href: environment[/* webDomain */3] + "/datenschutzerklarung"
                                          }, ViewCommon.text("Datenschutzerklärung")), React.createElement("a", {
                                            className: link,
                                            href: environment[/* webDomain */3] + "/impressum"
                                          }, ViewCommon.text("Impressum"))), React.createElement("div", {
                                        className: area("footer3")
                                      }, ReasonReact.element(undefined, undefined, MTypography.make(/* Title */594052472, undefined, true, true, undefined, /* Primary */-791844958, /* array */[ViewCommon.text("Stay Connected")])), React.createElement("form", {
                                            action: "https://misthos.us17.list-manage.com/subscribe/post?u=1696fffacc1f8609ca14818f3&id=e0d336cc53",
                                            method: "post",
                                            target: "_blank"
                                          }, ReasonReact.element(undefined, undefined, MaterialUi_Input.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "EMAIL", undefined, undefined, undefined, undefined, undefined, undefined, undefined, "Email Address", undefined, undefined, undefined, undefined, "email", undefined, undefined, undefined, /* array */[])), ReasonReact.element(undefined, undefined, MaterialUi_Button.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "submit", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("Sign Up")])), React.createElement("div", {
                                                className: social
                                              }, React.createElement("a", {
                                                    className: socialIcon,
                                                    href: "https://twitter.com/misthosio"
                                                  }, Icons.twitter), React.createElement("a", {
                                                    className: socialIcon,
                                                    href: "https://www.linkedin.com/company/misthos-io"
                                                  }, Icons.linkedin), React.createElement("a", {
                                                    className: socialIcon,
                                                    href: "https://medium.com/@misthosio"
                                                  }, Icons.medium)))), React.createElement("div", {
                                        className: notice
                                      }, ViewCommon.text("© Misthos 2018. All rights reserved.")))]));
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
