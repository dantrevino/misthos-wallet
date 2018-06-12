// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var ReasonReact = require("reason-react/src/ReasonReact.js");
var Styles = require("material-ui/styles");
var JssProvider = require("react-jss/lib/JssProvider");

function make(registry, children) {
  return ReasonReact.wrapJsForReason(JssProvider.default, {
              registry: registry,
              generateClassName: Styles.createGenerateClassName()
            }, children);
}

exports.make = make;
/* ReasonReact Not a pure module */
