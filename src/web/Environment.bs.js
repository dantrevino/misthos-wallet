// Generated by BUCKLESCRIPT VERSION 4.0.4, PLEASE EDIT WITH CARE
'use strict';


function get() {
  var hostname;
  try {
    hostname = location.hostname;
  }
  catch (exn){
    hostname = "server";
  }
  switch (hostname) {
    case "localhost" : 
        return /* record */[
                /* redirectURI */"https://localhost:3000/",
                /* manifestURI */"https://localhost:3000/manifest.json",
                /* appDomain */"https://localhost:3000",
                /* webDomain */"https://localhost:3001",
                /* cookieDomain */"localhost",
                /* network : Testnet */1,
                /* monitoringEnvironment */"dev"
              ];
    case "server" : 
        return /* record */[
                /* redirectURI */"",
                /* manifestURI */"",
                /* appDomain */"",
                /* webDomain */"",
                /* cookieDomain */"",
                /* network : Testnet */1,
                /* monitoringEnvironment */"web"
              ];
    case "staging.misthos.io" : 
    case "web-staging.misthos.io" : 
        return /* record */[
                /* redirectURI */"https://staging.misthos.io/",
                /* manifestURI */"https://staging.misthos.io/manifest.json",
                /* appDomain */"https://staging.misthos.io",
                /* webDomain */"https://web-staging.misthos.io",
                /* cookieDomain */"misthos.io",
                /* network : Testnet */1,
                /* monitoringEnvironment */"staging"
              ];
    case "testnet.misthos.io" : 
    case "web-testnet.misthos.io" : 
        return /* record */[
                /* redirectURI */"https://testnet.misthos.io/",
                /* manifestURI */"https://testnet.misthos.io/manifest.json",
                /* appDomain */"https://testnet.misthos.io",
                /* webDomain */"https://web-testnet.misthos.io",
                /* cookieDomain */"misthos.io",
                /* network : Testnet */1,
                /* monitoringEnvironment */"testnet"
              ];
    case "app.misthos.io" : 
    case "www.misthos.io" : 
        return /* record */[
                /* redirectURI */"https://app.misthos.io/",
                /* manifestURI */"https://app.misthos.io/manifest.json",
                /* appDomain */"https://app.misthos.io",
                /* webDomain */"https://www.misthos.io",
                /* cookieDomain */"misthos.io",
                /* network : Mainnet */2,
                /* monitoringEnvironment */"mainnet"
              ];
    default:
      return /* record */[
              /* redirectURI */location.origin + "/",
              /* manifestURI */location.origin + "/manifest.json",
              /* appDomain */location.origin,
              /* webDomain */location.origin,
              /* cookieDomain */"misthos.io",
              /* network : Testnet */1,
              /* monitoringEnvironment */"unknown"
            ];
  }
}

exports.get = get;
/* No side effect */
