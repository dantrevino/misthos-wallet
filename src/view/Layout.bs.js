// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Icons = require("./Icons.bs.js");
var Theme = require("./Theme.bs.js");
var Utils = require("../utils/Utils.bs.js");
var React = require("react");
var Colors = require("./Colors.bs.js");
var Router = require("./Router.bs.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var BreakPoints = require("./BreakPoints.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUi_Grid = require("@jsiebern/bs-material-ui/src/MaterialUi_Grid.bs.js");
var MaterialUi_Modal = require("@jsiebern/bs-material-ui/src/MaterialUi_Modal.bs.js");
var MaterialUi_Paper = require("@jsiebern/bs-material-ui/src/MaterialUi_Paper.bs.js");
var MaterialUi_AppBar = require("@jsiebern/bs-material-ui/src/MaterialUi_AppBar.bs.js");
var MaterialUi_Drawer = require("@jsiebern/bs-material-ui/src/MaterialUi_Drawer.bs.js");
var MaterialUi_Toolbar = require("@jsiebern/bs-material-ui/src/MaterialUi_Toolbar.bs.js");
var MaterialUi_IconButton = require("@jsiebern/bs-material-ui/src/MaterialUi_IconButton.bs.js");

var component = ReasonReact.reducerComponent("Layout");

Css.$$global("html, body, #root, #__next", /* :: */[
      Css.height(/* `percent */[
            -119887163,
            100.0
          ]),
      /* [] */0
    ]);

var flex_ = Css.style(/* :: */[
      Css.flex(1),
      /* [] */0
    ]);

var appBar = Css.style(/* :: */[
      Css.backgroundColor(Colors.white),
      /* :: */[
        Css.boxShadow(/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, Colors.white),
        /* [] */0
      ]
    ]);

var container = Css.style(/* :: */[
      Css.flexGrow(1),
      /* :: */[
        Css.width(/* `percent */[
              -119887163,
              100.0
            ]),
        /* :: */[
          Css.height(/* `percent */[
                -119887163,
                100.0
              ]),
          /* :: */[
            Css.margin(Css.px(0)),
            /* :: */[
              Css.overflow(Css.hidden),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

var grid = Css.style(/* :: */[
      Css.width(/* `percent */[
            -119887163,
            100.0
          ]),
      /* :: */[
        Css.minHeight(/* `calc */[
              -1044768619,
              /* tuple */[
                /* sub */5745024,
                Css.px(Theme.space(88)),
                /* `px */[
                  25096,
                  64
                ]
              ]
            ]),
        /* :: */[
          Css.height(/* `calc */[
                -1044768619,
                /* tuple */[
                  /* sub */5745024,
                  /* `vh */[
                    26418,
                    100.0
                  ],
                  /* `px */[
                    25096,
                    64
                  ]
                ]
              ]),
          /* :: */[
            Css.margin(Css.px(0)),
            /* :: */[
              Css.paddingBottom(Css.px(Theme.space(8))),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

var drawer = Css.style(/* :: */[
      Css.width(/* `px */[
            25096,
            440
          ]),
      /* :: */[
        Css.flex(1),
        /* [] */0
      ]
    ]);

var modalContent = Css.style(/* :: */[
      Css.height(/* `calc */[
            -1044768619,
            /* tuple */[
              /* sub */5745024,
              /* `percent */[
                -119887163,
                100.0
              ],
              /* `px */[
                25096,
                64
              ]
            ]
          ]),
      /* :: */[
        Css.paddingBottom(Css.px(Theme.space(8))),
        /* [] */0
      ]
    ]);

var modal = Css.style(/* :: */[
      BreakPoints.md(/* :: */[
            Css.width(/* `vw */[
                  26433,
                  90.0
                ]),
            /* :: */[
              Css.height(/* `vh */[
                    26418,
                    90.0
                  ]),
              /* :: */[
                Css.margin2(/* `vh */[
                      26418,
                      5.0
                    ], /* `vw */[
                      26433,
                      5.0
                    ]),
                /* [] */0
              ]
            ]
          ]),
      /* :: */[
        Css.width(/* `percent */[
              -119887163,
              100.0
            ]),
        /* :: */[
          Css.height(/* `percent */[
                -119887163,
                100.0
              ]),
          /* :: */[
            Css.focus(/* :: */[
                  Css.outlineStyle(/* none */-922086728),
                  /* [] */0
                ]),
            /* [] */0
          ]
        ]
      ]
    ]);

var logo = Css.style(/* :: */[
      Css.hover(/* :: */[
            Css.backgroundColor(Css.transparent),
            /* [] */0
          ]),
      /* :: */[
        Css.borderRadius(Css.px(0)),
        /* [] */0
      ]
    ]);

var Styles = /* module */[
  /* flex_ */flex_,
  /* appBar */appBar,
  /* container */container,
  /* grid */grid,
  /* drawer */drawer,
  /* modalContent */modalContent,
  /* modal */modal,
  /* logo */logo
];

function make(drawer$1, modal$1, children) {
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
          /* render */(function (param) {
              var send = param[/* send */3];
              var theme = Theme.toJsUnsafe(Theme.theme);
              var modalContainer = Js_option.getWithDefault(null, Utils.mapOption((function (param) {
                          var onClose = param[1];
                          var inner = React.cloneElement(ReasonReact.element(/* None */0, /* None */0, MaterialUi_Paper.make(/* Some */[modal], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[
                                        ReasonReact.element(/* None */0, /* None */0, MaterialUi_Toolbar.make(/* None */0, /* None */0, /* None */0, /* None */0, /* array */[
                                                  React.createElement("div", {
                                                        className: flex_
                                                      }),
                                                  ReasonReact.element(/* None */0, /* None */0, MaterialUi_IconButton.make(/* None */0, /* Some */[/* Inherit */-72987685], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[onClose], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[Icons.close]))
                                                ])),
                                        React.createElement("div", {
                                              className: modalContent
                                            }, param[0])
                                      ])), {
                                id: "modal"
                              });
                          return ReasonReact.element(/* None */0, /* None */0, MaterialUi_Modal.make(/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[onClose], /* None */0, /* None */0, /* None */0, true, /* None */0, /* None */0, /* array */[inner]));
                        }), modal$1));
              return React.createElement("div", {
                          className: container
                        }, drawer$1 ? ReasonReact.element(/* None */0, /* None */0, MaterialUi_AppBar.make(/* Some */[appBar], /* None */0, /* Some */[/* Static */982536398], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[
                                    ReasonReact.element(/* None */0, /* None */0, MaterialUi_Toolbar.make(/* None */0, /* None */0, /* None */0, /* None */0, /* array */[
                                              ReasonReact.element(/* None */0, /* None */0, MaterialUi_IconButton.make(/* Some */[logo], /* Some */[/* Inherit */-72987685], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[(function (param) {
                                                            return Router.clickToRoute(/* Home */0, param);
                                                          })], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[Icons.logoSolid])),
                                              React.createElement("div", {
                                                    className: flex_
                                                  }),
                                              ReasonReact.element(/* None */0, /* None */0, MaterialUi_IconButton.make(/* None */0, /* Some */[/* Inherit */-72987685], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[(function () {
                                                            return Curry._1(send, /* OpenDrawer */0);
                                                          })], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[Icons.menu]))
                                            ])),
                                    ReasonReact.element(/* None */0, /* None */0, MaterialUi_Drawer.make(/* Some */[/* Right */-57574468], /* None */0, /* None */0, /* None */0, /* Some */[(function () {
                                                  return Curry._1(send, /* CloseDrawer */1);
                                                })], /* Some */[param[/* state */1][/* drawerOpen */0]], /* None */0, /* None */0, /* Some */[theme], /* None */0, /* Some */[/* Temporary */-103274127], /* None */0, /* None */0, /* array */[React.createElement("div", {
                                                    className: drawer,
                                                    role: "button",
                                                    tabIndex: 0,
                                                    onClick: (function () {
                                                        return Curry._1(send, /* CloseDrawer */1);
                                                      })
                                                  }, drawer$1[0])]))
                                  ])) : null, modalContainer, ReasonReact.element(/* None */0, /* None */0, MaterialUi_Grid.make(/* None */0, /* None */0, /* Some */[grid], /* None */0, /* Some */[true], /* Some */[/* Row */4102650], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */[/* V24 */3], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[children])));
            }),
          /* initialState */(function () {
              return /* record */[/* drawerOpen */false];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, _) {
              if (action) {
                return /* Update */Block.__(0, [/* record */[/* drawerOpen */false]]);
              } else {
                return /* Update */Block.__(0, [/* record */[/* drawerOpen */true]]);
              }
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

exports.component = component;
exports.Styles = Styles;
exports.make = make;
/* component Not a pure module */
