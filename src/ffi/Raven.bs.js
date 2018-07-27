// Generated by BUCKLESCRIPT VERSION 4.0.1, PLEASE EDIT WITH CARE
'use strict';

var RavenJs = require("raven-js");
var Environment = require("../web/Environment.bs.js");

var environment = Environment.get(/* () */0)[/* monitoringEnvironment */6];

function initialize() {
  return RavenJs.config("https://cb163cef7ce04d4e97641c77cc1b7802@sentry.io/1240624", {
                environment: environment
              }).install();
}

function captureException(error) {
  RavenJs.captureException(error);
  return /* () */0;
}

exports.environment = environment;
exports.initialize = initialize;
exports.captureException = captureException;
/* environment Not a pure module */
