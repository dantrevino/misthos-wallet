// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Environment = require("../application/Environment.bs.js");

function getEnvironment() {
  var match = window.location.hostname;
  switch (match) {
    case "localhost" : 
        return /* record */[
                /* redirectURI */(function () {
                    return "http://localhost:3000/";
                  }),
                /* manifestURI */(function () {
                    return "http://localhost:3000/manifest.json";
                  }),
                /* appDomain */(function () {
                    return "http://localhost:3000";
                  })
              ];
    case "web-staging.misthos.io" : 
        return /* record */[
                /* redirectURI */(function () {
                    return "https://staging.misthos.io/";
                  }),
                /* manifestURI */(function () {
                    return "https://staging.misthos.io/manifest.json";
                  }),
                /* appDomain */(function () {
                    return "https://staging.misthos.io";
                  })
              ];
    case "web-testnet.misthos.io" : 
        return /* record */[
                /* redirectURI */(function () {
                    return "https://testnet.misthos.io/";
                  }),
                /* manifestURI */(function () {
                    return "https://testnet.misthos.io/manifest.json";
                  }),
                /* appDomain */(function () {
                    return "https://testnet.misthos.io";
                  })
              ];
    default:
      return Environment.$$default;
  }
}

function getCookieDomain() {
  var match = window.location.hostname;
  switch (match) {
    case "localhost" : 
        return "localhost";
    case "web-staging" : 
    case "web-testnet" : 
        return "misthos.io";
    default:
      return window.location.hostname;
  }
}

exports.getEnvironment = getEnvironment;
exports.getCookieDomain = getCookieDomain;
/* No side effect */