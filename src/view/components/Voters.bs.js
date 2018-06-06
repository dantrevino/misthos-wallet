// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Partner = require("./Partner.bs.js");
var ScrollList = require("./ScrollList.bs.js");
var StatusChip = require("./StatusChip.bs.js");
var ViewCommon = require("../ViewCommon.bs.js");
var MTypography = require("./MTypography.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var MaterialUi_List = require("@jsiebern/bs-material-ui/src/MaterialUi_List.bs.js");

var component = ReasonReact.statelessComponent("Voters");

function make(voters, _) {
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
              var voters$1 = $$Array.of_list(List.map((function (param) {
                          var match;
                          switch (param[/* voteStatus */1]) {
                            case 0 : 
                                match = /* tuple */[
                                  "Pending",
                                  /* Pending */0
                                ];
                                break;
                            case 1 : 
                                match = /* tuple */[
                                  "Endorsed",
                                  /* Success */2
                                ];
                                break;
                            case 2 : 
                                match = /* tuple */[
                                  "Rejected",
                                  /* Failure */1
                                ];
                                break;
                            
                          }
                          return ReasonReact.element(/* None */0, /* None */0, Partner.make(param[/* userId */0], /* None */0, /* None */0, /* Some */[ReasonReact.element(/* None */0, /* None */0, StatusChip.make(match[1], match[0], /* array */[]))], /* None */0, /* array */[]));
                        }), voters));
              return /* array */[
                      ReasonReact.element(/* None */0, /* None */0, MTypography.make(/* Title */594052472, /* None */0, /* array */[ViewCommon.text("Endorsement Status")])),
                      ReasonReact.element(/* None */0, /* None */0, ScrollList.make(/* array */[ReasonReact.element(/* None */0, /* None */0, MaterialUi_List.make(/* None */0, /* None */0, /* None */0, /* Some */[true], /* None */0, /* None */0, /* None */0, /* array */[voters$1]))]))
                    ];
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
exports.component = component;
exports.make = make;
/* component Not a pure module */
