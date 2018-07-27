// Generated by BUCKLESCRIPT VERSION 4.0.1, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Utils = require("../utils/Utils.bs.js");
var Cookie = require("../ffi/Cookie.bs.js");
var TACText = require("../view/text/TACText.bs.js");
var UserInfo = require("../application/UserInfo.bs.js");
var Blockstack = require("blockstack");
var Environment = require("./Environment.bs.js");
var SessionData = require("../application/SessionData.bs.js");
var LocalStorage = require("../ffi/LocalStorage.bs.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var KeysJs = require("blockstack/lib/keys.js");

function initMasterKey(sessionData) {
  var appPubKey = Utils.publicKeyFromKeyPair(sessionData[/* issuerKeyPair */2]);
  return UserInfo.getOrInit(appPubKey, sessionData[/* userId */0]).then((function (param) {
                return Promise.resolve(/* tuple */[
                            /* record */[
                              /* userId */sessionData[/* userId */0],
                              /* appPrivateKey */sessionData[/* appPrivateKey */1],
                              /* issuerKeyPair */sessionData[/* issuerKeyPair */2],
                              /* storagePrefix */sessionData[/* storagePrefix */3],
                              /* masterKeyChain */BitcoinjsLib.bip32.fromPrivateKey(sessionData[/* issuerKeyPair */2].privateKey, param[0][/* chainCode */0], sessionData[/* issuerKeyPair */2].network),
                              /* network */sessionData[/* network */5]
                            ],
                            param[1]
                          ]);
              }));
}

function completeLogIn() {
  var environment = Environment.get(/* () */0);
  Utils.mapOption((function (key) {
          LocalStorage.setItem("blockstack-transit-private-key", key);
          return Cookie.$$delete("transitKey", environment[/* cookieDomain */4]);
        }), Cookie.get("transitKey"));
  return Blockstack.handlePendingSignIn().then((function (userData) {
                var match = SessionData.fromUserData(userData, environment[/* network */5]);
                if (match !== undefined) {
                  return initMasterKey(match).then((function (param) {
                                var userInfo = param[1];
                                var session = param[0];
                                var match = UserInfo.hasSignedTAC(TACText.hash, userInfo);
                                if (match) {
                                  return Promise.resolve(/* LoggedIn */Block.__(1, [session]));
                                } else {
                                  return Promise.resolve(/* MustAggreeToTAC */Block.__(0, [
                                                session,
                                                userInfo
                                              ]));
                                }
                              }));
                } else {
                  return Promise.resolve(/* NamelessLogin */3);
                }
              }));
}

function getCurrentSession() {
  if (Blockstack.isUserSignedIn()) {
    var match = Blockstack.loadUserData();
    if (match == null) {
      return Promise.resolve(/* NotLoggedIn */2);
    } else {
      var match$1 = SessionData.fromUserData(match, Environment.get(/* () */0)[/* network */5]);
      if (match$1 !== undefined) {
        return initMasterKey(match$1).then((function (param) {
                      var userInfo = param[1];
                      var session = param[0];
                      var match = UserInfo.hasSignedTAC(TACText.hash, userInfo);
                      if (match) {
                        return Promise.resolve(/* LoggedIn */Block.__(1, [session]));
                      } else {
                        return Promise.resolve(/* MustAggreeToTAC */Block.__(0, [
                                      session,
                                      userInfo
                                    ]));
                      }
                    }));
      } else {
        return Promise.resolve(/* NamelessLogin */3);
      }
    }
  } else if (Blockstack.isSignInPending()) {
    return completeLogIn(/* () */0);
  } else {
    return Promise.resolve(/* NotLoggedIn */2);
  }
}

function signOut() {
  Blockstack.signUserOut();
  location.replace(Environment.get(/* () */0)[/* webDomain */3]);
  return /* NotLoggedIn */2;
}

function signIn() {
  signOut(/* () */0);
  var transitKey = KeysJs.makeECPrivateKey();
  var environment = Environment.get(/* () */0);
  Cookie.set("transitKey", transitKey, environment[/* cookieDomain */4]);
  Blockstack.redirectToSignInWithAuthRequest(Blockstack.makeAuthRequest(transitKey, environment[/* redirectURI */0], environment[/* manifestURI */1], /* array */[
            "store_write",
            "publish_data"
          ], environment[/* appDomain */2]));
  return /* LoginPending */1;
}

exports.initMasterKey = initMasterKey;
exports.completeLogIn = completeLogIn;
exports.getCurrentSession = getCurrentSession;
exports.signOut = signOut;
exports.signIn = signIn;
/* Utils Not a pure module */
