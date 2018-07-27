// Generated by BUCKLESCRIPT VERSION 4.0.1, PLEASE EDIT WITH CARE
'use strict';

var App = require("./view/App.bs.js");
var Theme = require("./view/Theme.bs.js");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var JssProvider = require("./view/JssProvider.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var SessionStore = require("./view/SessionStore.bs.js");
var MaterialUi_CssBaseline = require("@jsiebern/bs-material-ui/src/MaterialUi_CssBaseline.bs.js");
var MaterialUi_MuiThemeProvider = require("@jsiebern/bs-material-ui/src/MaterialUi_MuiThemeProvider.bs.js");

((window.blockstack = require('blockstack')));

var theme = Theme.toJsUnsafe(Theme.theme(undefined, /* () */0));

ReactDOMRe.renderToElementWithId(ReasonReact.element(undefined, undefined, JssProvider.make(/* array */[ReasonReact.element(undefined, undefined, SessionStore.make((function (session, updateSession, signTAC) {
                          return ReasonReact.element(undefined, undefined, MaterialUi_MuiThemeProvider.make(undefined, undefined, /* `ObjectGeneric */[
                                          -317959944,
                                          theme
                                        ], /* array */[ReasonReact.element(undefined, undefined, MaterialUi_CssBaseline.make(/* array */[ReasonReact.element(undefined, undefined, App.make(session, updateSession, signTAC, /* array */[]))]))]));
                        })))])), "root");

exports.theme = theme;
/*  Not a pure module */
