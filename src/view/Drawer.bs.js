// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Css = require("bs-css/src/Css.js");
var Grid = require("./components/Grid.bs.js");
var React = require("react");
var Router = require("./Router.bs.js");
var MButton = require("./components/MButton.bs.js");
var ScrollList = require("./components/ScrollList.bs.js");
var ViewCommon = require("./ViewCommon.bs.js");
var Environment = require("../web/Environment.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var VentureList = require("./VentureList.bs.js");

var alignStart = Css.style(/* :: */[
      Css.alignSelf(Css.flexStart),
      /* [] */0
    ]);

var Styles = /* module */[/* alignStart */alignStart];

var component = ReasonReact.statelessComponent("Drawer");

function make(onSignOut, index, selected, _) {
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
              return ReasonReact.element(/* None */0, /* None */0, Grid.make(/* Some */[ViewCommon.text("My Ventures")], /* None */0, /* None */0, /* None */0, /* Some */[React.createElement("div", {
                                    className: ScrollList.containerStyles
                                  }, ReasonReact.element(/* None */0, /* None */0, ScrollList.make(/* array */[ReasonReact.element(/* None */0, /* None */0, VentureList.make(selected, index, /* array */[]))])), ReasonReact.element(/* None */0, /* None */0, MButton.make(/* None */0, /* Some */[(function (param) {
                                                return Router.clickToRoute(/* CreateVenture */1, param);
                                              })], /* None */0, /* Some */[true], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[ViewCommon.text("Create a Venture")])), React.createElement("div", {
                                        className: Css.style(/* :: */[
                                              Css.flex(100),
                                              /* [] */0
                                            ])
                                      }), ReasonReact.element(/* None */0, /* None */0, MButton.make(/* Some */[/* Inherit */-72987685], /* None */0, /* None */0, /* None */0, /* Some */[/* Flat */0], /* Some */[alignStart], /* Some */[true], /* None */0, /* Some */[environment[/* webDomain */3] + "/faq"], /* Some */[true], /* array */["frequently asked questions"])), ReasonReact.element(/* None */0, /* None */0, MButton.make(/* Some */[/* Inherit */-72987685], /* None */0, /* None */0, /* None */0, /* Some */[/* Flat */0], /* Some */[alignStart], /* Some */[false], /* None */0, /* Some */["mailto:contact@misthos.io"], /* None */0, /* array */["Contact us"])), ReasonReact.element(/* None */0, /* None */0, MButton.make(/* Some */[/* Inherit */-72987685], /* Some */[onSignOut], /* None */0, /* None */0, /* Some */[/* Flat */0], /* Some */[alignStart], /* Some */[false], /* Some */[true], /* None */0, /* None */0, /* array */["Sign Out"])))], /* None */0, /* None */0, /* array */[]));
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
exports.Styles = Styles;
exports.component = component;
exports.make = make;
/* alignStart Not a pure module */
