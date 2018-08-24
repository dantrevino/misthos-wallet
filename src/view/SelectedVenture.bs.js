// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("../application/wallet/BTC.bs.js");
var Css = require("bs-css/src/Css.js");
var Grid = require("./components/Grid.bs.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Icons = require("./Icons.bs.js");
var Theme = require("./Theme.bs.js");
var React = require("react");
var Colors = require("./Colors.bs.js");
var Router = require("./Router.bs.js");
var Balance = require("./components/Balance.bs.js");
var MButton = require("./components/MButton.bs.js");
var Partner = require("./components/Partner.bs.js");
var Belt_Map = require("bs-platform/lib/js/belt_Map.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var MFabButton = require("./components/MFabButton.bs.js");
var ScrollList = require("./components/ScrollList.bs.js");
var StatusChip = require("./components/StatusChip.bs.js");
var ViewCommon = require("./ViewCommon.bs.js");
var Environment = require("../web/Environment.bs.js");
var MTypography = require("./components/MTypography.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Transaction = require("./components/Transaction.bs.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var WarningsText = require("./text/WarningsText.bs.js");
var AlertListItem = require("./components/AlertListItem.bs.js");
var MListSubheader = require("./components/MListSubheader.bs.js");
var PrimitiveTypes = require("../application/PrimitiveTypes.bs.js");
var MaterialUi_List = require("@jsiebern/bs-material-ui/src/MaterialUi_List.bs.js");
var MaterialUi_IconButton = require("@jsiebern/bs-material-ui/src/MaterialUi_IconButton.bs.js");

var component = ReasonReact.reducerComponent("SelectedVenture");

var addressesButtonIcon = Css.style(/* :: */[
      Css.marginTop(Css.px(Caml_int32.imul(Theme.space(2), -1))),
      /* :: */[
        Css.marginLeft(Css.px(Theme.space(1))),
        /* :: */[
          Css.marginBottom(Css.px(Caml_int32.imul(Theme.space(1), -1))),
          /* :: */[
            Css.color(Colors.black),
            /* [] */0
          ]
        ]
      ]
    ]);

var atRiskAddressButtonIcon = Css.style(/* :: */[
      Css.marginTop(Css.px(Caml_int32.imul(Theme.space(2), -1))),
      /* :: */[
        Css.marginLeft(Css.px(Theme.space(1))),
        /* :: */[
          Css.marginBottom(Css.px(Caml_int32.imul(Theme.space(1), -1))),
          /* :: */[
            Css.color(Colors.error),
            /* [] */0
          ]
        ]
      ]
    ]);

var settingsButtonIcon = Css.style(/* :: */[
      Css.marginTop(Css.px(Caml_int32.imul(Theme.space(2), -1))),
      /* :: */[
        Css.marginBottom(Css.px(Caml_int32.imul(Theme.space(1), -1))),
        /* :: */[
          Css.color(Colors.black),
          /* [] */0
        ]
      ]
    ]);

var atRiskSettingsButtonIcon = Css.style(/* :: */[
      Css.marginTop(Css.px(Caml_int32.imul(Theme.space(2), -1))),
      /* :: */[
        Css.marginBottom(Css.px(Caml_int32.imul(Theme.space(1), -1))),
        /* :: */[
          Css.color(Colors.error),
          /* [] */0
        ]
      ]
    ]);

var ledgerBacked = Css.style(/* :: */[
      Css.fontSize(Css.px(12)),
      /* :: */[
        Css.color(Colors.black),
        /* [] */0
      ]
    ]);

var Styles = /* module */[
  /* addressesButtonIcon */addressesButtonIcon,
  /* atRiskAddressButtonIcon */atRiskAddressButtonIcon,
  /* settingsButtonIcon */settingsButtonIcon,
  /* atRiskSettingsButtonIcon */atRiskSettingsButtonIcon,
  /* ledgerBacked */ledgerBacked
];

function updateLoggedInStatus(partners, send) {
  return Belt_List.forEach(Belt_List.keep(partners, (function (p) {
                    return p[/* joinedWallet */5] === false;
                  })), (function (p) {
                p[/* hasLoggedIn */4].then((function (known) {
                        return Promise.resolve(Curry._1(send, /* SetHasLoggedIn */[
                                        p[/* userId */0],
                                        known
                                      ]));
                      }));
                return /* () */0;
              }));
}

function make(viewData, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */(function (param) {
              updateLoggedInStatus(viewData[/* partners */5], param[/* send */3]);
              return /* record */[
                      /* viewData */viewData,
                      /* loggedInStatus */param[/* state */1][/* loggedInStatus */1]
                    ];
            }),
          /* didMount */(function (param) {
              return updateLoggedInStatus(viewData[/* partners */5], param[/* send */3]);
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (param) {
              var match = param[/* state */1];
              var loggedInStatus = match[/* loggedInStatus */1];
              var viewData = match[/* viewData */0];
              var match$1 = Environment.get(/* () */0)[/* network */5];
              var warning = match$1 !== 1 ? undefined : Js_primitive.some(WarningsText.testnet);
              var getPartnerStatusChip = function ($staropt$star, endorsed, joinedWallet, hasLoggedIn) {
                var ledgerBacked$1 = $staropt$star !== undefined ? $staropt$star : false;
                if (endorsed) {
                  if (joinedWallet) {
                    if (ledgerBacked$1) {
                      return ReasonReact.element(undefined, undefined, MTypography.make(/* Body2 */-904051920, ledgerBacked, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("LEDGER BACKED")]));
                    } else {
                      return null;
                    }
                  } else {
                    var exit = 0;
                    if (hasLoggedIn !== undefined && !hasLoggedIn) {
                      return ReasonReact.element(undefined, undefined, StatusChip.make(/* Pending */1, "SIGN IN REQUIRED", /* array */[]));
                    } else {
                      exit = 1;
                    }
                    if (exit === 1) {
                      return ReasonReact.element(undefined, undefined, StatusChip.make(/* Pending */1, "SYNC REQUIRED", /* array */[]));
                    }
                    
                  }
                } else {
                  return ReasonReact.element(undefined, undefined, StatusChip.make(/* Pending */1, "PENDING", /* array */[]));
                }
              };
              var alerts = Belt_List.keepMap(Belt_List.concat(viewData[/* proposedAdditions */7], viewData[/* proposedRemovals */8]), (function (prospect) {
                      var match = prospect[/* canVote */3];
                      if (match) {
                        var match$1 = prospect[/* data */5][/* processType */1];
                        var partial_arg_000 = viewData[/* ventureId */0];
                        var partial_arg_001 = /* Partner */Block.__(0, [prospect[/* processId */0]]);
                        var partial_arg = /* Venture */Block.__(0, [
                            partial_arg_000,
                            partial_arg_001
                          ]);
                        var match$2 = prospect[/* data */5][/* processType */1];
                        return Js_primitive.some(ReasonReact.element(PrimitiveTypes.ProcessId[/* toString */0](prospect[/* processId */0]), undefined, AlertListItem.make(match$1 ? /* Plus */0 : /* Minus */1, (function (param) {
                                              return Router.clickToRoute(partial_arg, param);
                                            }), ViewCommon.text((
                                                match$2 ? "Addition" : "Removal"
                                              ) + (" of '" + (PrimitiveTypes.UserId[/* toString */0](prospect[/* data */5][/* userId */0]) + "'"))), Js_primitive.some(ViewCommon.text("proposed by " + PrimitiveTypes.UserId[/* toString */0](prospect[/* proposedBy */2]))), /* array */[])));
                      }
                      
                    }));
              var additions = Belt_List.map(viewData[/* proposedAdditions */7], (function (partner) {
                      var partial_arg_000 = viewData[/* ventureId */0];
                      var partial_arg_001 = /* Partner */Block.__(0, [partner[/* processId */0]]);
                      var partial_arg = /* Venture */Block.__(0, [
                          partial_arg_000,
                          partial_arg_001
                        ]);
                      return ReasonReact.element(PrimitiveTypes.UserId[/* toString */0](partner[/* data */5][/* userId */0]) + "-prospect", undefined, Partner.make(partner[/* data */5][/* userId */0], undefined, undefined, (function (param) {
                                        return getPartnerStatusChip(param, false, false, false);
                                      }), (function (param) {
                                        return Router.clickToRoute(partial_arg, param);
                                      }), undefined, /* array */[]));
                    }));
              var removals = Belt_List.map(viewData[/* proposedRemovals */8], (function (partner) {
                      var partial_arg_000 = viewData[/* ventureId */0];
                      var partial_arg_001 = /* Partner */Block.__(0, [partner[/* processId */0]]);
                      var partial_arg = /* Venture */Block.__(0, [
                          partial_arg_000,
                          partial_arg_001
                        ]);
                      return ReasonReact.element(PrimitiveTypes.UserId[/* toString */0](partner[/* data */5][/* userId */0]) + "-prospect", undefined, Partner.make(partner[/* data */5][/* userId */0], undefined, undefined, (function (param) {
                                        return getPartnerStatusChip(param, false, false, false);
                                      }), (function (param) {
                                        return Router.clickToRoute(partial_arg, param);
                                      }), undefined, /* array */[]));
                    }));
              var currentPartners = Belt_List.map(viewData[/* partners */5], (function (partner) {
                      var partial_arg_000 = viewData[/* ventureId */0];
                      var partial_arg_001 = /* Partner */Block.__(0, [partner[/* processId */1]]);
                      var partial_arg = /* Venture */Block.__(0, [
                          partial_arg_000,
                          partial_arg_001
                        ]);
                      return ReasonReact.element(PrimitiveTypes.UserId[/* toString */0](partner[/* userId */0]), undefined, Partner.make(partner[/* userId */0], partner[/* name */2], undefined, Js_primitive.some(getPartnerStatusChip(Belt_Set.has(viewData[/* ledgerBacked */6], partner[/* userId */0]), true, partner[/* joinedWallet */5], Belt_Map.get(loggedInStatus, partner[/* userId */0]))), (function (param) {
                                        return Router.clickToRoute(partial_arg, param);
                                      }), undefined, /* array */[]));
                    }));
              var stickyHeader = function ($staropt$star, header) {
                var first = $staropt$star !== undefined ? $staropt$star : false;
                return /* :: */[
                        ReasonReact.element(undefined, undefined, MListSubheader.make(first, /* array */[ViewCommon.text(header)])),
                        /* [] */0
                      ];
              };
              var showAdditionsHeader = Belt_List.length(additions) !== 0;
              var showRemovalsHeader = Belt_List.length(removals) !== 0;
              var match$2 = showAdditionsHeader || showRemovalsHeader;
              var partners = Belt_List.toArray(Belt_List.concatMany(/* array */[
                        alerts,
                        showAdditionsHeader ? stickyHeader(true, "Proposed Addition") : /* [] */0,
                        additions,
                        showRemovalsHeader ? stickyHeader(!showAdditionsHeader, "Proposed Removal") : /* [] */0,
                        removals,
                        match$2 ? stickyHeader(undefined, "Current") : /* [] */0,
                        currentPartners
                      ]));
              var payouts = Belt_List.toArray(Belt_List.map(viewData[/* payoutsPendingBroadcast */11], (function (param) {
                          var processId = param[/* processId */0];
                          var partial_arg_000 = viewData[/* ventureId */0];
                          var partial_arg_001 = /* Payout */Block.__(1, [processId]);
                          var partial_arg = /* Venture */Block.__(0, [
                              partial_arg_000,
                              partial_arg_001
                            ]);
                          return ReasonReact.element(PrimitiveTypes.ProcessId[/* toString */0](processId), undefined, AlertListItem.make(/* ArrowUp */2, (function (param) {
                                            return Router.clickToRoute(partial_arg, param);
                                          }), ViewCommon.text("Payout of " + (BTC.format(param[/* data */5][/* summary */3][/* spentWithFees */2]) + " BTC")), Js_primitive.some(ViewCommon.text("proposed by " + PrimitiveTypes.UserId[/* toString */0](param[/* proposedBy */2]))), /* array */[]));
                        })));
              var unconfirmed = viewData[/* unconfirmedTxs */9];
              var confirmed = viewData[/* confirmedTxs */10];
              var transactions = Belt_List.toArray(Belt_List.concatMany(/* array */[
                        Belt_List.mapWithIndex(unconfirmed, (function (iter, tx) {
                                var match = tx[/* txType */0];
                                var match$1 = match ? /* tuple */[
                                    /* Payout */1,
                                    "unconfirmed payout"
                                  ] : /* tuple */[
                                    /* Income */0,
                                    "unconfirmed income"
                                  ];
                                var partial_arg = tx[/* detailsLink */5];
                                return ReasonReact.element(String(iter), undefined, Transaction.make(match$1[0], match$1[1], tx[/* amount */3], tx[/* date */4], undefined, (function (param) {
                                                  return Router.clickToRoute(partial_arg, param);
                                                }), /* array */[]));
                              })),
                        Belt_List.mapWithIndex(confirmed, (function (iter, tx) {
                                var match = tx[/* txType */0];
                                var match$1 = match ? /* tuple */[
                                    /* Payout */1,
                                    "payout"
                                  ] : /* tuple */[
                                    /* Income */0,
                                    "income"
                                  ];
                                var partial_arg = tx[/* detailsLink */5];
                                return ReasonReact.element(String(iter + Belt_List.length(unconfirmed) | 0), undefined, Transaction.make(match$1[0], match$1[1], tx[/* amount */3], tx[/* date */4], undefined, (function (param) {
                                                  return Router.clickToRoute(partial_arg, param);
                                                }), /* array */[]));
                              }))
                      ]));
              var match$3 = viewData[/* atRiskWarning */1];
              var partial_arg_000 = viewData[/* ventureId */0];
              var partial_arg = /* Venture */Block.__(0, [
                  partial_arg_000,
                  /* Addresses */5
                ]);
              var match$4 = viewData[/* keyRotationWarning */2];
              var partial_arg_000$1 = viewData[/* ventureId */0];
              var partial_arg$1 = /* Venture */Block.__(0, [
                  partial_arg_000$1,
                  /* Settings */1
                ]);
              var match$5 = viewData[/* readOnly */4];
              var partial_arg_000$2 = viewData[/* ventureId */0];
              var partial_arg$2 = /* Venture */Block.__(0, [
                  partial_arg_000$2,
                  /* ManagePartners */2
                ]);
              return ReasonReact.element(undefined, undefined, Grid.make(Js_primitive.some(ViewCommon.text("Partners")), Js_primitive.some(ViewCommon.text("Transactions")), Js_primitive.some(React.createElement("div", undefined, ReasonReact.element(undefined, undefined, MTypography.make(/* Title */594052472, undefined, undefined, undefined, undefined, undefined, /* array */[
                                              ViewCommon.text(viewData[/* ventureName */3]),
                                              ReasonReact.element(undefined, undefined, MaterialUi_IconButton.make(match$3 ? atRiskAddressButtonIcon : addressesButtonIcon, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, (function (param) {
                                                          return Router.clickToRoute(partial_arg, param);
                                                        }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* array */[Icons.clock])),
                                              ReasonReact.element(undefined, undefined, MaterialUi_IconButton.make(match$4 ? atRiskSettingsButtonIcon : settingsButtonIcon, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, (function (param) {
                                                          return Router.clickToRoute(partial_arg$1, param);
                                                        }), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* array */[Icons.settings]))
                                            ])), ReasonReact.element(undefined, undefined, Balance.make(viewData[/* balance */12][/* currentSpendable */0], Js_primitive.some(viewData[/* balance */12][/* reserved */1]), /* array */[])))), Js_primitive.some(React.createElement("div", {
                                      className: Css.style(/* :: */[
                                            Css.display(/* flex */-1010954439),
                                            /* [] */0
                                          ])
                                    }, ReasonReact.element(undefined, undefined, MFabButton.make(/* Aqua */0, /* Venture */Block.__(0, [
                                                viewData[/* ventureId */0],
                                                /* Receive */6
                                              ]), /* array */[ViewCommon.text("RECEIVE")])), React.createElement("div", {
                                          className: Css.style(/* :: */[
                                                Css.width(Css.px(Theme.space(8))),
                                                /* [] */0
                                              ])
                                        }), ReasonReact.element(undefined, undefined, MFabButton.make(/* Orange */1, /* Venture */Block.__(0, [
                                                viewData[/* ventureId */0],
                                                /* CreatePayout */3
                                              ]), /* array */[ViewCommon.text("PAY OUT")])))), Js_primitive.some(React.createElement("div", {
                                      className: ScrollList.containerStyles
                                    }, match$5 ? React.createElement("b", undefined, ViewCommon.text("YOU HAVE BEEN REMOVED FROM THIS VENTURE; VENTURE IS IN READ ONLY")) : null, ReasonReact.element(undefined, undefined, ScrollList.make(/* array */[ReasonReact.element(undefined, undefined, MaterialUi_List.make(undefined, undefined, undefined, true, undefined, undefined, undefined, /* array */[partners]))])), ReasonReact.element(undefined, undefined, MButton.make(undefined, (function (param) {
                                                return Router.clickToRoute(partial_arg$2, param);
                                              }), undefined, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* array */[ViewCommon.text("Add or Remove Partners")])))), Js_primitive.some(React.createElement("div", {
                                      className: ScrollList.containerStyles
                                    }, ReasonReact.element(undefined, undefined, ScrollList.make(/* array */[
                                              ReasonReact.element(undefined, undefined, MaterialUi_List.make(undefined, undefined, undefined, true, undefined, undefined, undefined, /* array */[payouts])),
                                              ReasonReact.element(undefined, undefined, MaterialUi_List.make(undefined, undefined, undefined, true, undefined, undefined, undefined, /* array */[transactions]))
                                            ])))), undefined, warning, /* array */[]));
            }),
          /* initialState */(function () {
              return /* record */[
                      /* viewData */viewData,
                      /* loggedInStatus */PrimitiveTypes.UserId[/* makeMap */8](/* () */0)
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, state) {
              return /* Update */Block.__(0, [/* record */[
                          /* viewData */state[/* viewData */0],
                          /* loggedInStatus */Belt_Map.set(state[/* loggedInStatus */1], action[0], action[1])
                        ]]);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

var text = ViewCommon.text;

var extractString = ViewCommon.extractString;

var ignoreEvent = ViewCommon.ignoreEvent;

var ViewData = 0;

exports.text = text;
exports.extractString = extractString;
exports.ignoreEvent = ignoreEvent;
exports.ViewData = ViewData;
exports.component = component;
exports.Styles = Styles;
exports.updateLoggedInStatus = updateLoggedInStatus;
exports.make = make;
/* component Not a pure module */
