// Generated by BUCKLESCRIPT VERSION 4.0.1, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Icons = require("../Icons.bs.js");
var Theme = require("../Theme.bs.js");
var React = require("react");
var Colors = require("../Colors.bs.js");
var ViewCommon = require("../ViewCommon.bs.js");
var BreakPoints = require("../BreakPoints.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUi_Typography = require("@jsiebern/bs-material-ui/src/MaterialUi_Typography.bs.js");

var component = ReasonReact.statelessComponent("MisthosIs");

var arrowIcon = Icons.asDataUrl(Icons.arrowDownBig);

var grid = Css.style(/* :: */[
      Css.height(Css.vh(95.0)),
      /* :: */[
        BreakPoints.md(/* :: */[
              Css.unsafe("gridTemplateAreas", "\n           \". .    line .   .\"\n           \". text line img .\"\n           \". .    line .   .\"\n           "),
              /* :: */[
                Css.unsafe("gridTemplateColumns", "0px 1fr 1px 1fr 0px"),
                /* :: */[
                  Css.unsafe("gridTemplateRows", "auto min-content auto"),
                  /* :: */[
                    Css.gridGap(Css.px(Theme.space(5))),
                    /* :: */[
                      Css.display(Css.grid),
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]),
        /* :: */[
          BreakPoints.xs(/* :: */[
                Css.unsafe("gridTemplateAreas", "\n           \". .    .\"\n           \". text .\"\n           \". img  .\"\n           \". .    .\"\n           "),
                /* :: */[
                  Css.unsafe("gridTemplateColumns", "0px 1fr 0px"),
                  /* :: */[
                    Css.unsafe("gridTemplateRows", "auto min-content min-content auto"),
                    /* :: */[
                      Css.gridGap(Css.px(Theme.space(1))),
                      /* :: */[
                        Css.display(Css.none),
                        /* [] */0
                      ]
                    ]
                  ]
                ]
              ]),
          /* :: */[
            Css.backgroundImage(Css.url(arrowIcon)),
            /* :: */[
              Css.backgroundRepeat(Css.noRepeat),
              /* :: */[
                Css.unsafe("backgroundPosition", "top, center"),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

var last = Css.style(/* :: */[
      Css.unsafe("backgroundImage", "url(" + (String(arrowIcon) + ("), url(" + (String(arrowIcon) + ")")))),
      /* :: */[
        Css.unsafe("backgroundPosition", "top center, bottom 24px center"),
        /* :: */[
          Css.unsafe("backgroundRepeat", "no-repeat, no-repeat"),
          /* [] */0
        ]
      ]
    ]);

var img = Css.style(/* :: */[
      Css.unsafe("gridArea", "img"),
      /* :: */[
        Css.display(/* flex */-1010954439),
        /* :: */[
          Css.flexDirection(Css.column),
          /* :: */[
            Css.alignItems(Css.center),
            /* :: */[
              Css.children(/* :: */[
                    Css.unsafe("boxShadow", "2px 2px 0 0 #000000"),
                    /* [] */0
                  ]),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

var text = Css.style(/* :: */[
      Css.unsafe("gridArea", "text"),
      /* :: */[
        Css.display(/* flex */-1010954439),
        /* :: */[
          Css.flexDirection(Css.column),
          /* :: */[
            Css.justifyContent(Css.center),
            /* :: */[
              Css.alignItems(Css.flexStart),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

var display1 = Css.style(/* [] */0);

var display2 = Css.style(/* :: */[
      Css.fontSize(Css.px(62)),
      /* :: */[
        Css.textTransform(Css.uppercase),
        /* [] */0
      ]
    ]);

var display4 = Css.style(/* :: */[
      BreakPoints.lg(/* :: */[
            Css.fontSize(Css.px(80)),
            /* [] */0
          ]),
      /* :: */[
        BreakPoints.xs(/* :: */[
              Css.fontSize(Css.px(65)),
              /* [] */0
            ]),
        /* :: */[
          Css.unsafe("backgroundImage", Colors.uGradientAquaLight),
          /* :: */[
            Css.unsafe("padding", "0px 16px"),
            /* :: */[
              Css.unsafe("margin", "-34px 0px 26px -16px"),
              /* :: */[
                Css.unsafe("zIndex", "-1"),
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]);

function line(last) {
  return Css.style(/* :: */[
              Css.unsafe("gridArea", "line"),
              /* :: */[
                Css.marginTop(Css.px(45)),
                /* :: */[
                  Css.marginBottom(Css.px(last ? 69 : 0)),
                  /* :: */[
                    Css.backgroundColor(Css.hex("1f2532")),
                    /* :: */[
                      Css.display(Css.none),
                      /* :: */[
                        BreakPoints.md(/* :: */[
                              Css.display(Css.block),
                              /* [] */0
                            ]),
                        /* [] */0
                      ]
                    ]
                  ]
                ]
              ]
            ]);
}

var Styles = /* module */[
  /* arrowIcon */arrowIcon,
  /* grid */grid,
  /* last */last,
  /* img */img,
  /* text */text,
  /* display1 */display1,
  /* display2 */display2,
  /* display4 */display4,
  /* line */line
];

function make(primary, secondary, img$1, $staropt$star, _) {
  var last$1 = $staropt$star !== undefined ? $staropt$star : false;
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
                          className: grid + (" " + (
                              last$1 ? last : ""
                            ))
                        }, React.createElement("div", {
                              className: text
                            }, ReasonReact.element(undefined, undefined, MaterialUi_Typography.make(undefined, display2, undefined, undefined, undefined, undefined, undefined, undefined, /* Display2 */-11760688, undefined, undefined, /* array */[ViewCommon.text("Misthos is")])), ReasonReact.element(undefined, undefined, MaterialUi_Typography.make(undefined, display4, undefined, undefined, undefined, undefined, undefined, undefined, /* Display4 */-11760686, undefined, undefined, /* array */[ViewCommon.text(primary)])), ReasonReact.element(undefined, undefined, MaterialUi_Typography.make(undefined, display1, undefined, undefined, undefined, undefined, undefined, undefined, /* Display1 */-11760689, undefined, undefined, /* array */[ViewCommon.text(secondary)]))), React.createElement("div", {
                              className: line(last$1)
                            }), React.createElement("div", {
                              className: img
                            }, img$1));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

var text$1 = ViewCommon.text;

var extractString = ViewCommon.extractString;

var ignoreEvent = ViewCommon.ignoreEvent;

exports.text = text$1;
exports.extractString = extractString;
exports.ignoreEvent = ignoreEvent;
exports.component = component;
exports.Styles = Styles;
exports.make = make;
/* component Not a pure module */
