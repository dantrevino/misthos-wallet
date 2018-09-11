// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var Json = require("@glennsl/bs-json/src/Json.bs.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Event = require("./events/Event.bs.js");
var Utils = require("../utils/Utils.bs.js");
var Policy = require("./Policy.bs.js");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var EventLog = require("./events/EventLog.bs.js");
var UserInfo = require("./UserInfo.bs.js");
var Watchers = require("./watcher/Watchers.bs.js");
var Blockstack = require("../ffi/Blockstack.bs.js");
var Blockstack$1 = require("blockstack");
var WalletTypes = require("./wallet/WalletTypes.bs.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var PrimitiveTypes = require("./PrimitiveTypes.bs.js");
var Venture__Index = require("./Venture__Index.bs.js");
var Venture__State = require("./Venture__State.bs.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Venture__Wallet = require("./Venture__Wallet.bs.js");
var Venture__Validation = require("./Venture__Validation.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function logMessage(msg) {
  console.log("[Venture] - " + msg);
  return /* () */0;
}

var InvalidEvent = Caml_exceptions.create("Venture.InvalidEvent");

var NotPersistingNewEvents = Caml_exceptions.create("Venture.NotPersistingNewEvents");

function make(session, id) {
  return /* record */[
          /* session */session,
          /* id */id,
          /* log */Curry._1(EventLog.make, /* () */0),
          /* state */Venture__State.make(/* () */0),
          /* validation */Venture__Validation.make(/* () */0),
          /* wallet */Venture__Wallet.make(/* () */0),
          /* watchers : [] */0
        ];
}

function applyInternal($staropt$star, partnerId, issuer, $$event, oldLog, param) {
  var collector = param[3];
  var wallet = param[2];
  var state = param[1];
  var validation = param[0];
  var syncing = $staropt$star !== undefined ? $staropt$star : false;
  var match = Curry._3(EventLog.append, issuer, $$event, oldLog);
  var item = match[0];
  var result = Venture__Validation.validate(Js_primitive.some(partnerId), validation, item);
  var exit = 0;
  if (typeof result === "number") {
    if (result !== 1) {
      if (result !== 0) {
        exit = 1;
      } else {
        logMessage("Appended event to log:");
        logMessage(Json.stringify(Event.encode($$event)));
        var validation$1 = Venture__Validation.apply(item, validation);
        var state$1 = Venture__State.apply($$event, state);
        var wallet$1 = Venture__Wallet.apply($$event, wallet);
        var collector$1 = $$Array.append(collector, /* array */[item]);
        return /* tuple */[
                item,
                match[1],
                /* tuple */[
                  validation$1,
                  state$1,
                  wallet$1,
                  collector$1
                ]
              ];
      }
    } else {
      return /* tuple */[
              undefined,
              oldLog,
              /* tuple */[
                validation,
                state,
                wallet,
                collector
              ]
            ];
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    logMessage("Event:");
    logMessage(Json.stringify(Event.encode($$event)));
    logMessage("was rejected because of:");
    logMessage(Venture__Validation.resultToString(result));
    if (syncing) {
      return /* tuple */[
              undefined,
              oldLog,
              /* tuple */[
                validation,
                state,
                wallet,
                collector
              ]
            ];
    } else {
      throw [
            InvalidEvent,
            result
          ];
    }
  }
  
}

function apply($staropt$star, $staropt$star$1, $$event, param) {
  var state = param[/* state */3];
  var session = param[/* session */0];
  var systemEvent = $staropt$star !== undefined ? $staropt$star : false;
  var collector = $staropt$star$1 !== undefined ? $staropt$star$1 : /* array */[];
  var match = applyInternal(undefined, session[/* userId */0], systemEvent ? Venture__State.systemIssuer(state) : session[/* issuerKeyPair */2], $$event, param[/* log */2], /* tuple */[
        param[/* validation */4],
        state,
        param[/* wallet */5],
        collector
      ]);
  var match$1 = match[2];
  var match$2 = Watchers.applyAndProcessPending(session, match[0], match[1], (function (eta) {
          var arg = session[/* userId */0];
          var partial_arg = (function (param) {
                return (function (param$1, param$2, param$3, param$4) {
                    return applyInternal(param, arg, param$1, param$2, param$3, param$4);
                  });
              })(undefined);
          return (function (param, param$1, param$2) {
              return partial_arg(eta, param, param$1, param$2);
            });
        }), /* tuple */[
        match$1[0],
        match$1[1],
        match$1[2],
        match$1[3]
      ], param[/* watchers */6]);
  var match$3 = match$2[1];
  return /* tuple */[
          /* record */[
            /* session */session,
            /* id */param[/* id */1],
            /* log */match$2[0],
            /* state */match$3[1],
            /* validation */match$3[0],
            /* wallet */match$3[2],
            /* watchers */match$2[2]
          ],
          match$3[3]
        ];
}

function applyMany($staropt$star, venture) {
  var collector = $staropt$star !== undefined ? $staropt$star : /* array */[];
  var partial_arg = /* tuple */[
    venture,
    collector
  ];
  return (function (param) {
      return List.fold_left((function (param, $$event) {
                    return apply(undefined, param[1], $$event, param[0]);
                  }), partial_arg, param);
    });
}

function reconstruct(session, log) {
  var match = make(session, PrimitiveTypes.VentureId[/* make */10](/* () */0));
  var match$1 = Curry._3(EventLog.reduce, (function (param, item) {
          var $$event = item[/* event */0];
          var tmp;
          tmp = $$event.tag ? param[0] : $$event[0][/* ventureId */0];
          return /* tuple */[
                  tmp,
                  Venture__Validation.apply(item, param[1]),
                  Venture__State.apply($$event, param[2]),
                  Venture__Wallet.apply($$event, param[3]),
                  /* :: */[
                    item,
                    param[4]
                  ],
                  Watchers.apply(true, session, item, log, param[5])
                ];
        }), /* tuple */[
        PrimitiveTypes.VentureId[/* make */10](/* () */0),
        match[/* validation */4],
        match[/* state */3],
        match[/* wallet */5],
        /* [] */0,
        /* [] */0
      ], log);
  var match$2 = Watchers.processPending(session, log, (function (eta) {
          var arg = session[/* userId */0];
          var partial_arg = (function (param) {
                return (function (param$1, param$2, param$3, param$4) {
                    return applyInternal(param, arg, param$1, param$2, param$3, param$4);
                  });
              })(undefined);
          return (function (param, param$1, param$2) {
              return partial_arg(eta, param, param$1, param$2);
            });
        }), /* tuple */[
        match$1[1],
        match$1[2],
        match$1[3],
        /* array */[]
      ], match$1[5]);
  var match$3 = match$2[1];
  return /* tuple */[
          /* record */[
            /* session */session,
            /* id */match$1[0],
            /* log */match$2[0],
            /* state */match$3[1],
            /* validation */match$3[0],
            /* wallet */match$3[2],
            /* watchers */match$2[2]
          ],
          match$3[3]
        ];
}

function persist($staropt$star, param) {
  var collector = param[1];
  var venture = param[0];
  var shouldPersist = $staropt$star !== undefined ? $staropt$star : true;
  if (shouldPersist && collector.length > 0) {
    return Blockstack$1.putFile(PrimitiveTypes.VentureId[/* toString */0](venture[/* id */1]) + "/log.json", Json.stringify(Curry._1(EventLog.encode, venture[/* log */2]))).then((function () {
                    return Promise.resolve(/* Ok */Block.__(0, [/* tuple */[
                                    venture,
                                    collector
                                  ]]));
                  })).catch((function (err) {
                  return Promise.resolve(/* Error */Block.__(1, [err]));
                }));
  } else if (collector.length !== 0) {
    throw NotPersistingNewEvents;
  } else {
    return Promise.resolve(/* Ok */Block.__(0, [/* tuple */[
                    venture,
                    collector
                  ]]));
  }
}

function load($staropt$star, session, ventureId) {
  var shouldPersist = $staropt$star !== undefined ? $staropt$star : true;
  logMessage("Loading venture '" + (PrimitiveTypes.VentureId[/* toString */0](ventureId) + "'"));
  return Blockstack$1.getFile(PrimitiveTypes.VentureId[/* toString */0](ventureId) + "/log.json").then((function (nullLog) {
                    var tmp;
                    if (nullLog == null) {
                      throw Caml_builtin_exceptions.not_found;
                    } else {
                      tmp = reconstruct(session, Curry._1(EventLog.decode, Json.parseOrRaise(nullLog)));
                    }
                    return persist(shouldPersist, tmp);
                  })).then((function (param) {
                  if (param.tag) {
                    return Promise.resolve(/* CouldNotLoad */Block.__(1, [param[0]]));
                  } else {
                    var match = param[0];
                    return Promise.resolve(/* Ok */Block.__(0, [
                                  match[0],
                                  match[1]
                                ]));
                  }
                })).catch((function (err) {
                return Promise.resolve(/* CouldNotLoad */Block.__(1, [err]));
              }));
}

function join(session, userId, ventureId) {
  return load(undefined, session, ventureId).then((function (loadResult) {
                if (loadResult.tag) {
                  return Blockstack.getFileFromUserAndDecrypt(PrimitiveTypes.VentureId[/* toString */0](ventureId) + ("/" + (session[/* storagePrefix */3] + "/log.json")), PrimitiveTypes.UserId[/* toString */0](userId)).then((function (nullFile) {
                                    var tmp;
                                    if (nullFile == null) {
                                      logMessage("log file could not be loaded");
                                      throw Caml_builtin_exceptions.not_found;
                                    } else {
                                      var match = Json.parse(nullFile);
                                      if (match !== undefined) {
                                        tmp = reconstruct(session, Curry._1(EventLog.decode, Js_primitive.valFromOption(match)));
                                      } else {
                                        logMessage("error decoding log");
                                        throw Caml_builtin_exceptions.not_found;
                                      }
                                    }
                                    return persist(undefined, tmp);
                                  })).then((function (param) {
                                  if (param.tag) {
                                    return Promise.resolve(/* CouldNotJoin */Block.__(2, [param[0]]));
                                  } else {
                                    var venture = param[0][0];
                                    return Venture__Index.add(venture[/* id */1], Venture__State.ventureName(venture[/* state */3])).then((function (index) {
                                                  return Promise.resolve(/* Joined */Block.__(1, [
                                                                index,
                                                                venture
                                                              ]));
                                                }));
                                  }
                                })).catch((function (err) {
                                logMessage("Error while joining");
                                console.log(err);
                                return Promise.resolve(/* CouldNotJoin */Block.__(2, [err]));
                              }));
                } else {
                  var newItems = loadResult[1];
                  var venture = loadResult[0];
                  return Venture__Index.add(ventureId, Venture__State.ventureName(venture[/* state */3])).then((function (index) {
                                return Promise.resolve(/* AlreadyLoaded */Block.__(0, [
                                              index,
                                              venture,
                                              newItems
                                            ]));
                              }));
                }
              }));
}

function getId(param) {
  return param[/* id */1];
}

function getSummary(param) {
  return Curry._1(EventLog.getSummary, param[/* log */2]);
}

function getEventLog(param) {
  return param[/* log */2];
}

function exec(session, ventureName, defaultAccountSettings, initialPolicies) {
  logMessage("Executing 'Create' command");
  var ventureCreated = Event.VentureCreated[/* make */0](ventureName, session[/* userId */0], Utils.publicKeyFromKeyPair(session[/* issuerKeyPair */2]), defaultAccountSettings, Policy.defaultMetaPolicy, initialPolicies, session[/* network */5]);
  var makeResult = make(session, ventureCreated[/* ventureId */0]);
  return /* tuple */[
          ventureCreated[/* ventureId */0],
          persist(undefined, apply(undefined, undefined, /* VentureCreated */Block.__(0, [ventureCreated]), makeResult)).then((function (param) {
                  if (param.tag) {
                    return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                  } else {
                    var venture = param[0][0];
                    return Venture__Index.add(venture[/* id */1], Venture__State.ventureName(venture[/* state */3])).then((function (index) {
                                  return Promise.resolve(/* Ok */Block.__(0, [
                                                index,
                                                venture
                                              ]));
                                }));
                  }
                }))
        ];
}

var Create = /* module */[/* exec */exec];

function exec$1(integrationPubKey, venture) {
  return persist(undefined, apply(undefined, undefined, Event.makeIntergationRegistered(venture[/* session */0][/* userId */0], integrationPubKey), venture)).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                } else {
                  var match = param[0];
                  return Promise.resolve(/* Ok */Block.__(0, [
                                match[0],
                                match[1]
                              ]));
                }
              }));
}

var RegisterIntegration = /* module */[/* exec */exec$1];

function exec$2(partnerId, newItems, venture) {
  var session = venture[/* session */0];
  var match = $$Array.fold_left((function (param, item) {
          var $$event = item[/* event */0];
          var conflicts = param[2];
          var collector = param[1];
          var venture = param[0];
          var validation = venture[/* validation */4];
          var conflict = Venture__Validation.validate(partnerId, validation, item);
          var exit = 0;
          if (typeof conflict === "number") {
            if (conflict !== 1) {
              if (conflict !== 0) {
                exit = 1;
              } else {
                logMessage("Appending synced event to log:");
                logMessage(Json.stringify(Event.encode($$event)));
                var log = Curry._2(EventLog.appendItem, item, venture[/* log */2]);
                var validation$1 = Venture__Validation.apply(item, validation);
                var state = Venture__State.apply($$event, venture[/* state */3]);
                var wallet = Venture__Wallet.apply($$event, venture[/* wallet */5]);
                var collector$1 = $$Array.append(collector, /* array */[item]);
                var watchers = Watchers.apply(undefined, session, item, log, venture[/* watchers */6]);
                return /* tuple */[
                        /* record */[
                          /* session */venture[/* session */0],
                          /* id */venture[/* id */1],
                          /* log */log,
                          /* state */state,
                          /* validation */validation$1,
                          /* wallet */wallet,
                          /* watchers */watchers
                        ],
                        collector$1,
                        conflicts
                      ];
              }
            } else {
              return /* tuple */[
                      venture,
                      collector,
                      conflicts
                    ];
            }
          } else {
            exit = 1;
          }
          if (exit === 1) {
            logMessage("Encountered '" + (Venture__Validation.resultToString(conflict) + "'. Ignoring event:"));
            logMessage(Json.stringify(Event.encode($$event)));
            return /* tuple */[
                    venture,
                    collector,
                    $$Array.append(conflicts, /* array */[/* tuple */[
                            item,
                            conflict
                          ]])
                  ];
          }
          
        }), /* tuple */[
        venture,
        /* array */[],
        /* array */[]
      ], newItems);
  var conflicts = match[2];
  var match$1 = match[0];
  var partial_arg = session[/* userId */0];
  var partial_arg$1 = true;
  var match$2 = Watchers.processPending(session, match$1[/* log */2], (function (param, param$1, param$2, param$3) {
          return applyInternal(partial_arg$1, partial_arg, param, param$1, param$2, param$3);
        }), /* tuple */[
        match$1[/* validation */4],
        match$1[/* state */3],
        match$1[/* wallet */5],
        match[1]
      ], match$1[/* watchers */6]);
  var match$3 = match$2[1];
  return persist(undefined, /* tuple */[
                /* record */[
                  /* session */venture[/* session */0],
                  /* id */venture[/* id */1],
                  /* log */match$2[0],
                  /* state */match$3[1],
                  /* validation */match$3[0],
                  /* wallet */match$3[2],
                  /* watchers */match$2[2]
                ],
                match$3[3]
              ]).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(2, [param[0]]));
                } else {
                  var match = param[0];
                  var collector = match[1];
                  var venture = match[0];
                  return Promise.resolve(conflicts.length !== 0 ? /* WithConflicts */Block.__(1, [
                                  venture,
                                  collector,
                                  conflicts
                                ]) : /* Ok */Block.__(0, [
                                  venture,
                                  collector
                                ]));
                }
              }));
}

var SynchronizeLogs = /* module */[/* exec */exec$2];

function exec$3(broadcasts, broadcastFailures, incomeEvents, unlockedEvents, txConfs, venture) {
  logMessage("Synchronizing wallet");
  var __x = List.fold_left((function (param, $$event) {
          return apply(true, param[1], /* IncomeDetected */Block.__(42, [$$event]), param[0]);
        }), /* tuple */[
        venture,
        /* array */[]
      ], incomeEvents);
  var __x$1 = List.fold_left((function (param, $$event) {
          return apply(true, param[1], /* IncomeUnlocked */Block.__(43, [$$event]), param[0]);
        }), __x, unlockedEvents);
  var __x$2 = List.fold_left((function (param, $$event) {
          return apply(true, param[1], /* PayoutBroadcast */Block.__(35, [$$event]), param[0]);
        }), __x$1, broadcasts);
  var __x$3 = List.fold_left((function (param, $$event) {
          return apply(true, param[1], /* PayoutBroadcastFailed */Block.__(37, [$$event]), param[0]);
        }), __x$2, broadcastFailures);
  return persist(undefined, List.fold_left((function (param, $$event) {
                      return apply(true, param[1], /* TransactionConfirmed */Block.__(44, [$$event]), param[0]);
                    }), __x$3, txConfs)).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                } else {
                  var match = param[0];
                  return Promise.resolve(/* Ok */Block.__(0, [
                                match[0],
                                match[1]
                              ]));
                }
              }));
}

var SynchronizeWallet = /* module */[/* exec */exec$3];

function exec$4(keyChain, venture) {
  var userId = venture[/* session */0][/* userId */0];
  var match = Venture__State.custodianAcceptedFor(userId, venture[/* state */3]);
  if (match !== undefined) {
    return persist(undefined, apply(undefined, undefined, /* CustodianKeyChainUpdated */Block.__(38, [Event.CustodianKeyChainUpdated[/* make */0](match[/* processId */0], userId, keyChain)]), venture)).then((function (param) {
                  if (param.tag) {
                    return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                  } else {
                    var match = param[0];
                    return Promise.resolve(/* Ok */Block.__(0, [
                                  match[0],
                                  match[1]
                                ]));
                  }
                }));
  } else {
    return Promise.resolve(/* NotACustodian */0);
  }
}

var SubmitCustodianKeyChain = /* module */[/* exec */exec$4];

function exec$5(prospectId, venture) {
  var state = venture[/* state */3];
  var session = venture[/* session */0];
  logMessage("Executing 'ProposePartner' command");
  if (Venture__State.isPartner(prospectId, state)) {
    return Promise.resolve(/* PartnerAlreadyExists */2);
  } else if (Belt_Set.size(Venture__State.currentPartners(state)) >= 12) {
    return Promise.resolve(/* MaxPartnersReached */0);
  } else {
    return Blockstack$1.lookupProfile(PrimitiveTypes.UserId[/* toString */0](prospectId)).then((function () {
                        return UserInfo.Public[/* read */0](prospectId);
                      })).then((function (param) {
                      if (param) {
                        return Promise.resolve(param[0][/* appPubKey */0]);
                      } else {
                        return Promise.resolve(undefined);
                      }
                    })).then((function (prospectPubKey) {
                    var partnerProposed = Event.getPartnerProposedExn(Event.makePartnerProposed(prospectPubKey, Venture__State.currentPartners(state), session[/* userId */0], prospectId, Venture__State.lastRemovalOfPartner(prospectId, state), Venture__State.currentPolicy(Event.Partner[/* processName */1], state), /* () */0));
                    if (Venture__State.isPartnerProposalUnique(partnerProposed, state)) {
                      var custodianProposal = Event.getCustodianProposedExn(Event.makeCustodianProposed(Venture__State.currentPartners(state), Venture__State.lastRemovalOfCustodian(prospectId, state), partnerProposed, session[/* userId */0], WalletTypes.AccountIndex[/* default */11], Venture__State.currentPolicy(Event.Custodian[/* processName */1], state)));
                      return persist(undefined, applyMany(undefined, venture)(/* :: */[
                                        /* PartnerProposed */Block.__(2, [partnerProposed]),
                                        /* :: */[
                                          Event.makePartnerEndorsed(partnerProposed[/* processId */0], session[/* userId */0]),
                                          /* :: */[
                                            /* CustodianProposed */Block.__(17, [custodianProposal]),
                                            /* :: */[
                                              Event.makeCustodianEndorsed(custodianProposal[/* processId */0], session[/* userId */0]),
                                              /* [] */0
                                            ]
                                          ]
                                        ]
                                      ])).then((function (param) {
                                    if (param.tag) {
                                      return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                                    } else {
                                      var match = param[0];
                                      return Promise.resolve(/* Ok */Block.__(0, [
                                                    partnerProposed[/* processId */0],
                                                    match[0],
                                                    match[1]
                                                  ]));
                                    }
                                  }));
                    } else {
                      return Promise.resolve(/* ProposalAlreadyExists */1);
                    }
                  })).catch((function () {
                  return Promise.resolve(/* UserIdDoesNotExist */3);
                }));
  }
}

function exec$6(processId, venture) {
  var session = venture[/* session */0];
  logMessage("Executing 'RejectPartner' command");
  var custodianProcessId = Venture__State.custodianProcessForPartnerProcess(processId, venture[/* state */3]);
  return persist(undefined, applyMany(undefined, venture)(/* :: */[
                    Event.makePartnerRejected(processId, session[/* userId */0]),
                    /* :: */[
                      Event.makeCustodianRejected(custodianProcessId, session[/* userId */0]),
                      /* [] */0
                    ]
                  ])).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                } else {
                  var match = param[0];
                  return Promise.resolve(/* Ok */Block.__(0, [
                                match[0],
                                match[1]
                              ]));
                }
              }));
}

var RejectPartner = /* module */[/* exec */exec$6];

function exec$7(processId, venture) {
  var session = venture[/* session */0];
  logMessage("Executing 'EndorsePartner' command");
  var custodianProcessId = Venture__State.custodianProcessForPartnerProcess(processId, venture[/* state */3]);
  return persist(undefined, applyMany(undefined, venture)(/* :: */[
                    Event.makePartnerEndorsed(processId, session[/* userId */0]),
                    /* :: */[
                      Event.makeCustodianEndorsed(custodianProcessId, session[/* userId */0]),
                      /* [] */0
                    ]
                  ])).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                } else {
                  var match = param[0];
                  return Promise.resolve(/* Ok */Block.__(0, [
                                match[0],
                                match[1]
                              ]));
                }
              }));
}

var EndorsePartner = /* module */[/* exec */exec$7];

function exec$8(partnerId, venture) {
  var state = venture[/* state */3];
  var session = venture[/* session */0];
  logMessage("Executing 'ProposePartnerRemoval' command");
  if (Venture__State.isPartner(partnerId, state) === false) {
    return Promise.resolve(/* PartnerDoesNotExist */0);
  } else {
    var match = Venture__State.custodianAcceptedFor(partnerId, state);
    var param;
    if (match !== undefined) {
      var custodianRemoval = Event.getCustodianRemovalProposedExn(Event.makeCustodianRemovalProposed(Venture__State.currentPartners(state), match, session[/* userId */0], WalletTypes.AccountIndex[/* default */11], Venture__State.currentPolicy(Event.Custodian[/* Removal */9][/* processName */1], state)));
      param = applyMany(undefined, venture)(/* :: */[
            /* CustodianRemovalProposed */Block.__(22, [custodianRemoval]),
            /* :: */[
              Event.makeCustodianRemovalEndorsed(custodianRemoval[/* processId */0], session[/* userId */0]),
              /* [] */0
            ]
          ]);
    } else {
      param = /* tuple */[
        venture,
        /* array */[]
      ];
    }
    var proposal = Event.getPartnerRemovalProposedExn(Event.makePartnerRemovalProposed(Venture__State.currentPartners(state), Venture__State.lastPartnerAccepted(partnerId, state), session[/* userId */0], Venture__State.currentPolicy(Event.Partner[/* Removal */9][/* processName */1], state)));
    return persist(undefined, applyMany(param[1], param[0])(/* :: */[
                      /* PartnerRemovalProposed */Block.__(8, [proposal]),
                      /* :: */[
                        Event.makePartnerRemovalEndorsed(proposal[/* processId */0], session[/* userId */0]),
                        /* [] */0
                      ]
                    ])).then((function (param) {
                  if (param.tag) {
                    return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                  } else {
                    var match = param[0];
                    return Promise.resolve(/* Ok */Block.__(0, [
                                  proposal[/* processId */0],
                                  match[0],
                                  match[1]
                                ]));
                  }
                }));
  }
}

var ProposePartnerRemoval = /* module */[/* exec */exec$8];

function exec$9(processId, venture) {
  logMessage("Executing 'RejectPartnerRemoval' command");
  return persist(undefined, apply(undefined, undefined, Event.makePartnerRemovalRejected(processId, venture[/* session */0][/* userId */0]), venture)).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                } else {
                  var match = param[0];
                  return Promise.resolve(/* Ok */Block.__(0, [
                                match[0],
                                match[1]
                              ]));
                }
              }));
}

var RejectPartnerRemoval = /* module */[/* exec */exec$9];

function exec$10(processId, venture) {
  var session = venture[/* session */0];
  logMessage("Executing 'EndorsePartnerRemoval' command");
  var match = Venture__State.custodianRemovalProcessForPartnerRemovalProcess(processId, venture[/* state */3]);
  var param = match !== undefined ? apply(undefined, undefined, Event.makeCustodianRemovalEndorsed(Js_primitive.valFromOption(match), session[/* userId */0]), venture) : /* tuple */[
      venture,
      /* array */[]
    ];
  return persist(undefined, apply(undefined, param[1], Event.makePartnerRemovalEndorsed(processId, session[/* userId */0]), param[0])).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                } else {
                  var match = param[0];
                  return Promise.resolve(/* Ok */Block.__(0, [
                                match[0],
                                match[1]
                              ]));
                }
              }));
}

var EndorsePartnerRemoval = /* module */[/* exec */exec$10];

function exec$11(accountIdx, venture) {
  logMessage("Executing 'GetIncomeAddress' command");
  var exposeEvent = Venture__Wallet.exposeNextIncomeAddress(venture[/* session */0][/* userId */0], accountIdx, venture[/* wallet */5]);
  return persist(undefined, apply(undefined, undefined, /* IncomeAddressExposed */Block.__(41, [exposeEvent]), venture)).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                } else {
                  var match = param[0];
                  return Promise.resolve(/* Ok */Block.__(0, [
                                exposeEvent[/* address */1][/* displayAddress */5],
                                match[0],
                                match[1]
                              ]));
                }
              }));
}

var ExposeIncomeAddress = /* module */[/* exec */exec$11];

function exec$12(accountIdx, payoutTx, signatures, venture) {
  var session = venture[/* session */0];
  logMessage("Executing 'ProposePayout' command");
  var param = Venture__Wallet.preparePayoutTx(Venture__State.currentPartners(venture[/* state */3]), session, accountIdx, payoutTx, signatures, venture[/* wallet */5]);
  if (param) {
    var proposal = param[0];
    return persist(undefined, applyMany(undefined, venture)(/* :: */[
                      /* PayoutProposed */Block.__(27, [proposal]),
                      /* :: */[
                        Event.makePayoutEndorsed(proposal[/* processId */0], session[/* userId */0]),
                        /* [] */0
                      ]
                    ])).then((function (param) {
                  if (param.tag) {
                    return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                  } else {
                    var match = param[0];
                    return Promise.resolve(/* Ok */Block.__(0, [
                                  proposal[/* processId */0],
                                  match[0],
                                  match[1]
                                ]));
                  }
                }));
  } else {
    return Promise.resolve(/* NotEnoughFunds */0);
  }
}

var ProposePayout = /* module */[/* exec */exec$12];

function exec$13(processId, venture) {
  logMessage("Executing 'RejectPayout' command");
  return persist(undefined, apply(undefined, undefined, Event.makePayoutRejected(processId, venture[/* session */0][/* userId */0]), venture)).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                } else {
                  var match = param[0];
                  return Promise.resolve(/* Ok */Block.__(0, [
                                match[0],
                                match[1]
                              ]));
                }
              }));
}

var RejectPayout = /* module */[/* exec */exec$13];

function exec$14(processId, signatures, venture) {
  logMessage("Executing 'EndorsePayout' command");
  return persist(undefined, applyMany(undefined, venture)(Venture__Wallet.endorsePayout(processId, signatures, venture[/* session */0], venture[/* wallet */5]))).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                } else {
                  var match = param[0];
                  return Promise.resolve(/* Ok */Block.__(0, [
                                match[0],
                                match[1]
                              ]));
                }
              }));
}

var EndorsePayout = /* module */[/* exec */exec$14];

function exec$15(processId, signatures, venture) {
  logMessage("Executing 'EndorsePayout' command");
  return persist(undefined, applyMany(undefined, venture)(Venture__Wallet.signPayout(processId, signatures, venture[/* session */0], venture[/* wallet */5]))).then((function (param) {
                if (param.tag) {
                  return Promise.resolve(/* CouldNotPersist */Block.__(1, [param[0]]));
                } else {
                  var match = param[0];
                  return Promise.resolve(/* Ok */Block.__(0, [
                                match[0],
                                match[1]
                              ]));
                }
              }));
}

var SignPayout = /* module */[/* exec */exec$15];

var Index = [
  Venture__Index.load,
  Venture__Index.encode,
  Venture__Index.decode
];

var Validation = [Venture__Validation.resultToString];

var Cmd_005 = [exec$5];

var Cmd = [
  Create,
  RegisterIntegration,
  SynchronizeLogs,
  SynchronizeWallet,
  SubmitCustodianKeyChain,
  Cmd_005,
  RejectPartner,
  EndorsePartner,
  ProposePartnerRemoval,
  RejectPartnerRemoval,
  EndorsePartnerRemoval,
  ExposeIncomeAddress,
  ProposePayout,
  RejectPayout,
  EndorsePayout,
  SignPayout
];

exports.Index = Index;
exports.Validation = Validation;
exports.InvalidEvent = InvalidEvent;
exports.NotPersistingNewEvents = NotPersistingNewEvents;
exports.load = load;
exports.join = join;
exports.getId = getId;
exports.getEventLog = getEventLog;
exports.getSummary = getSummary;
exports.reconstruct = reconstruct;
exports.Cmd = Cmd;
/* Event Not a pure module */
