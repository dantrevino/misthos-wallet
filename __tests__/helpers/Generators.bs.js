// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var BTC = require("../../src/application/wallet/BTC.bs.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Event = require("../../src/application/events/Event.bs.js");
var Utils = require("../../src/utils/Utils.bs.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Policy = require("../../src/application/Policy.bs.js");
var $$String = require("bs-platform/lib/js/string.js");
var Crypto = require("crypto");
var Address = require("../../src/application/wallet/Address.bs.js");
var Network = require("../../src/application/wallet/Network.bs.js");
var V4 = require("uuid/v4");
var Belt_Set = require("bs-platform/lib/js/belt_Set.js");
var EventLog = require("../../src/application/events/EventLog.bs.js");
var UserInfo = require("../../src/application/UserInfo.bs.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var WalletTypes = require("../../src/application/wallet/WalletTypes.bs.js");
var BitcoinjsLib = require("bitcoinjs-lib");
var PrimitiveTypes = require("../../src/application/PrimitiveTypes.bs.js");
var AccountKeyChain = require("../../src/application/wallet/AccountKeyChain.bs.js");
var CustodianKeyChain = require("../../src/application/wallet/CustodianKeyChain.bs.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

function userSession(id) {
  var appPrivateKey = Utils.bufToHex(Crypto.randomBytes(32));
  var issuerKeyPair = Utils.keyPairFromPrivateKey(Network.bitcoinNetwork(/* Regtest */0), appPrivateKey);
  var appPubKey = Utils.publicKeyFromKeyPair(issuerKeyPair);
  return /* record */[
          /* userId */id,
          /* appPrivateKey */appPrivateKey,
          /* issuerKeyPair */issuerKeyPair,
          /* storagePrefix */UserInfo.storagePrefix(Utils.publicKeyFromKeyPair(issuerKeyPair)),
          /* masterKeyChain */new BitcoinjsLib.HDNode(issuerKeyPair, Utils.bufFromHex($$String.sub(appPubKey, 0, 64))),
          /* network : Regtest */0
        ];
}

function withUserSessions(n) {
  return $$Array.of_list(Belt_List.makeBy(n, (function (i) {
                    return userSession(PrimitiveTypes.UserId[/* fromString */1]("user" + String(i)));
                  })));
}

function twoUserSessionsFromArray(sessions) {
  return /* tuple */[
          Caml_array.caml_array_get(sessions, 0),
          Caml_array.caml_array_get(sessions, 1)
        ];
}

function threeUserSessionsFromArray(sessions) {
  return /* tuple */[
          Caml_array.caml_array_get(sessions, 0),
          Caml_array.caml_array_get(sessions, 1),
          Caml_array.caml_array_get(sessions, 2)
        ];
}

function fourUserSessionsFromArray(sessions) {
  return /* tuple */[
          Caml_array.caml_array_get(sessions, 0),
          Caml_array.caml_array_get(sessions, 1),
          Caml_array.caml_array_get(sessions, 2),
          Caml_array.caml_array_get(sessions, 3)
        ];
}

function twoUserSessions() {
  return /* tuple */[
          userSession(PrimitiveTypes.UserId[/* fromString */1]("user1")),
          userSession(PrimitiveTypes.UserId[/* fromString */1]("user2"))
        ];
}

function threeUserSessions() {
  return /* tuple */[
          userSession(PrimitiveTypes.UserId[/* fromString */1]("user1")),
          userSession(PrimitiveTypes.UserId[/* fromString */1]("user2")),
          userSession(PrimitiveTypes.UserId[/* fromString */1]("user3"))
        ];
}

function fourUserSessions() {
  return /* tuple */[
          userSession(PrimitiveTypes.UserId[/* fromString */1]("user1")),
          userSession(PrimitiveTypes.UserId[/* fromString */1]("user2")),
          userSession(PrimitiveTypes.UserId[/* fromString */1]("user3")),
          userSession(PrimitiveTypes.UserId[/* fromString */1]("user4"))
        ];
}

function custodianKeyChain($staropt$star, ventureId, keyChainIdx, param) {
  var accountIdx = $staropt$star ? $staropt$star[0] : WalletTypes.AccountIndex[/* default */11];
  return CustodianKeyChain.toPublicKeyChain(CustodianKeyChain.make(ventureId, accountIdx, WalletTypes.CustodianKeyChainIndex[/* fromInt */1](keyChainIdx), param[/* masterKeyChain */4]));
}

var partial_arg = WalletTypes.AccountIndex[/* default */11];

function accountKeyChainFrom(param) {
  return AccountKeyChain.make(partial_arg, param);
}

function accountKeyChain($staropt$star, $staropt$star$1, users) {
  var ventureId = $staropt$star ? $staropt$star[0] : PrimitiveTypes.VentureId[/* fromString */1]("test");
  var keyChainIdx = $staropt$star$1 ? $staropt$star$1[0] : 0;
  return accountKeyChainFrom(List.map((function (user) {
                    return /* tuple */[
                            user[/* userId */0],
                            custodianKeyChain(/* None */0, ventureId, keyChainIdx, user)
                          ];
                  }), users));
}

function createVenture(session) {
  return Event.VentureCreated[/* make */0](PrimitiveTypes.UserId[/* toString */0](session[/* userId */0]) + "-testventure", session[/* userId */0], Utils.publicKeyFromKeyPair(session[/* issuerKeyPair */2]), Policy.unanimous, session[/* network */5]);
}

function partnerProposed($staropt$star, eligibleWhenProposing, $staropt$star$1, lastRemovalAccepted, proposerSession, prospectSession) {
  var withPubKey = $staropt$star ? $staropt$star[0] : true;
  var policy = $staropt$star$1 ? $staropt$star$1[0] : Policy.unanimous;
  return Event.getPartnerProposedExn(withPubKey ? Event.makePartnerProposed(/* Some */[Utils.publicKeyFromKeyPair(prospectSession[/* issuerKeyPair */2])], eligibleWhenProposing, proposerSession[/* userId */0], prospectSession[/* userId */0], lastRemovalAccepted, policy, /* () */0) : Event.makePartnerProposed(/* None */0, eligibleWhenProposing, proposerSession[/* userId */0], prospectSession[/* userId */0], lastRemovalAccepted, policy, /* () */0));
}

function partnerEndorsed(supporter, param) {
  return Event.getPartnerEndorsedExn(Event.makePartnerEndorsed(param[/* processId */0], supporter[/* userId */0]));
}

function partnerRejected(rejector, param) {
  return Event.getPartnerRejectedExn(Event.makePartnerRejected(param[/* processId */0], rejector[/* userId */0]));
}

var partnerAccepted = Event.Partner[/* Accepted */6][/* fromProposal */0];

var partnerDenied = Event.Partner[/* Denied */7][/* fromProposal */0];

function partnerPubKeyAdded(partner) {
  return Curry._2(Event.Partner[/* PubKeyAdded */10][/* make */0], partner[/* userId */0], Utils.publicKeyFromKeyPair(partner[/* issuerKeyPair */2]));
}

function partnerRemovalProposed(eligibleWhenProposing, lastPartnerAccepted, proposerSession) {
  return Event.getPartnerRemovalProposedExn(Event.makePartnerRemovalProposed(eligibleWhenProposing, lastPartnerAccepted, proposerSession[/* userId */0], Policy.unanimousMinusOne));
}

function partnerRemovalEndorsed(supporter, param) {
  return Event.getPartnerRemovalEndorsedExn(Event.makePartnerRemovalEndorsed(param[/* processId */0], supporter[/* userId */0]));
}

var partnerRemovalAccepted = Event.Partner[/* Removal */9][/* Accepted */6][/* fromProposal */0];

function accountCreationProposed(eligibleWhenProposing, param) {
  return Event.getAccountCreationProposedExn(Event.makeAccountCreationProposed(eligibleWhenProposing, param[/* userId */0], "test", WalletTypes.AccountIndex[/* default */11], Policy.unanimous));
}

function accountCreationEndorsed(supporter, param) {
  return Event.getAccountCreationEndorsedExn(Event.makeAccountCreationEndorsed(param[/* processId */0], supporter[/* userId */0]));
}

var accountCreationAccepted = Event.AccountCreation[/* Accepted */6][/* fromProposal */0];

function custodianProposed(eligibleWhenProposing, lastCustodianRemovalAccepted, param, partnerProposal) {
  return Event.getCustodianProposedExn(Event.makeCustodianProposed(eligibleWhenProposing, lastCustodianRemovalAccepted, partnerProposal, param[/* userId */0], WalletTypes.AccountIndex[/* default */11], Policy.unanimous));
}

function custodianEndorsed(supporter, param) {
  return Event.getCustodianEndorsedExn(Event.makeCustodianEndorsed(param[/* processId */0], supporter[/* userId */0]));
}

function custodianRejected(rejector, param) {
  return Event.getCustodianRejectedExn(Event.makeCustodianRejected(param[/* processId */0], rejector[/* userId */0]));
}

var custodianAccepted = Event.Custodian[/* Accepted */6][/* fromProposal */0];

var custodianDenied = Event.Custodian[/* Denied */7][/* fromProposal */0];

function custodianRemovalProposed(eligibleWhenProposing, custodianAccepted, proposerSession) {
  return Event.getCustodianRemovalProposedExn(Event.makeCustodianRemovalProposed(eligibleWhenProposing, custodianAccepted, proposerSession[/* userId */0], WalletTypes.AccountIndex[/* default */11], Policy.unanimousMinusOne));
}

function custodianRemovalEndorsed(supporter, param) {
  return Event.getCustodianRemovalEndorsedExn(Event.makeCustodianRemovalEndorsed(param[/* processId */0], supporter[/* userId */0]));
}

var custodianRemovalAccepted = Event.Custodian[/* Removal */9][/* Accepted */6][/* fromProposal */0];

var custodianKeyChainUpdated = Event.CustodianKeyChainUpdated[/* make */0];

var accountKeyChainIdentified = Event.AccountKeyChainIdentified[/* make */0];

function accountKeyChainActivated($staropt$star, custodian, identifier) {
  var sequence = $staropt$star ? $staropt$star[0] : 0;
  return Event.AccountKeyChainActivated[/* make */0](WalletTypes.AccountIndex[/* default */11], custodian[/* userId */0], identifier, sequence);
}

var incomeAddressExposed = Event.IncomeAddressExposed[/* make */0];

function incomeDetected(address, coordinates) {
  return Event.IncomeDetected[/* make */0](0, coordinates, address, V4(), BTC.fromSatoshis(/* int64 */[
                  /* hi */0,
                  /* lo */10000000
                ]));
}

var Event$1 = /* module */[
  /* createVenture */createVenture,
  /* partnerProposed */partnerProposed,
  /* partnerEndorsed */partnerEndorsed,
  /* partnerRejected */partnerRejected,
  /* partnerAccepted */partnerAccepted,
  /* partnerDenied */partnerDenied,
  /* partnerPubKeyAdded */partnerPubKeyAdded,
  /* partnerRemovalProposed */partnerRemovalProposed,
  /* partnerRemovalEndorsed */partnerRemovalEndorsed,
  /* partnerRemovalAccepted */partnerRemovalAccepted,
  /* accountCreationProposed */accountCreationProposed,
  /* accountCreationEndorsed */accountCreationEndorsed,
  /* accountCreationAccepted */accountCreationAccepted,
  /* custodianProposed */custodianProposed,
  /* custodianEndorsed */custodianEndorsed,
  /* custodianRejected */custodianRejected,
  /* custodianAccepted */custodianAccepted,
  /* custodianDenied */custodianDenied,
  /* custodianRemovalProposed */custodianRemovalProposed,
  /* custodianRemovalEndorsed */custodianRemovalEndorsed,
  /* custodianRemovalAccepted */custodianRemovalAccepted,
  /* custodianKeyChainUpdated */custodianKeyChainUpdated,
  /* accountKeyChainIdentified */accountKeyChainIdentified,
  /* accountKeyChainActivated */accountKeyChainActivated,
  /* incomeAddressExposed */incomeAddressExposed,
  /* incomeDetected */incomeDetected
];

function eligiblePartners(param) {
  return Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], $$Array.of_list(Curry._3(EventLog.reduce, (function (res, param) {
                        var $$event = param[/* event */0];
                        switch ($$event.tag | 0) {
                          case 4 : 
                              return /* :: */[
                                      $$event[0][/* data */2][/* id */1],
                                      res
                                    ];
                          case 10 : 
                              var id = $$event[0][/* data */2][/* id */0];
                              var partial_arg = PrimitiveTypes.UserId[/* neq */6];
                              return List.filter((function (param) {
                                              return partial_arg(id, param);
                                            }))(res);
                          default:
                            return res;
                        }
                      }), /* [] */0, param[/* log */3])));
}

function reduce(f, s, param) {
  return Curry._3(EventLog.reduce, f, s, param[/* log */3]);
}

function ventureId(param) {
  return param[/* ventureId */0];
}

function systemIssuer(param) {
  return param[/* systemIssuer */1];
}

function lastItem(param) {
  return param[/* lastItem */2];
}

function lastEvent(param) {
  return param[/* lastItem */2][/* event */0];
}

function eventLog(param) {
  return param[/* log */3];
}

function appendEvent(issuer, $$event, l) {
  var match = Curry._3(EventLog.append, issuer, $$event, l[/* log */3]);
  return /* record */[
          /* ventureId */l[/* ventureId */0],
          /* systemIssuer */l[/* systemIssuer */1],
          /* lastItem */match[0],
          /* log */match[1]
        ];
}

function appendSystemEvent($$event, log) {
  return appendEvent(log[/* systemIssuer */1], $$event, log);
}

function fromEventLog(log) {
  var match = Curry._3(EventLog.reduce, (function (param, lastItem) {
          var $$event = lastItem[/* event */0];
          if ($$event.tag) {
            return /* tuple */[
                    param[0],
                    param[1],
                    /* Some */[lastItem]
                  ];
          } else {
            var match = $$event[0];
            return /* tuple */[
                    /* Some */[match[/* ventureId */0]],
                    /* Some */[match[/* systemIssuer */5]],
                    /* Some */[lastItem]
                  ];
          }
        }), /* tuple */[
        /* None */0,
        /* None */0,
        /* None */0
      ], log);
  return /* record */[
          /* ventureId */Js_option.getExn(match[0]),
          /* systemIssuer */Js_option.getExn(match[1]),
          /* lastItem */Js_option.getExn(match[2]),
          /* log */log
        ];
}

function make(session, ventureCreated) {
  var match = Curry._3(EventLog.append, session[/* issuerKeyPair */2], /* VentureCreated */Block.__(0, [ventureCreated]), Curry._1(EventLog.make, /* () */0));
  return /* record */[
          /* ventureId */ventureCreated[/* ventureId */0],
          /* systemIssuer */ventureCreated[/* systemIssuer */5],
          /* lastItem */match[0],
          /* log */match[1]
        ];
}

function createVenture$1(session) {
  return make(session, createVenture(session));
}

function withPartnerProposed($staropt$star, $staropt$star$1, issuer, $staropt$star$2, proposer, prospect, l) {
  var withPubKey = $staropt$star ? $staropt$star[0] : true;
  var withLastRemoval = $staropt$star$1 ? $staropt$star$1[0] : true;
  var policy = $staropt$star$2 ? $staropt$star$2[0] : Policy.unanimous;
  var issuer$1 = issuer ? issuer[0] : proposer[/* issuerKeyPair */2];
  var lastRemovalAccepted = withLastRemoval ? Curry._3(EventLog.reduce, (function (res, param) {
            var $$event = param[/* event */0];
            if ($$event.tag === 10) {
              var $$event$1 = $$event[0];
              if (PrimitiveTypes.UserId[/* eq */5]($$event$1[/* data */2][/* id */0], prospect[/* userId */0])) {
                return /* Some */[$$event$1];
              } else {
                return res;
              }
            } else {
              return res;
            }
          }), /* None */0, l[/* log */3]) : /* None */0;
  return appendEvent(issuer$1, /* PartnerProposed */Block.__(1, [partnerProposed(/* Some */[withPubKey], eligiblePartners(l), /* Some */[policy], lastRemovalAccepted, proposer, prospect)]), l);
}

function withPartnerEndorsed(issuer, supporter, proposal) {
  var issuer$1 = issuer ? issuer[0] : supporter[/* issuerKeyPair */2];
  var partial_arg = /* PartnerEndorsed */Block.__(3, [partnerEndorsed(supporter, proposal)]);
  return (function (param) {
      return appendEvent(issuer$1, partial_arg, param);
    });
}

function withPartnerRejected(issuer, supporter, proposal) {
  var issuer$1 = issuer ? issuer[0] : supporter[/* issuerKeyPair */2];
  var partial_arg = /* PartnerRejected */Block.__(2, [partnerRejected(supporter, proposal)]);
  return (function (param) {
      return appendEvent(issuer$1, partial_arg, param);
    });
}

function withPartnerAccepted(proposal) {
  var partial_arg = /* PartnerAccepted */Block.__(4, [Curry._1(partnerAccepted, proposal)]);
  return (function (param) {
      return appendSystemEvent(partial_arg, param);
    });
}

function withPartnerDenied(proposal) {
  var partial_arg = /* PartnerDenied */Block.__(5, [Curry._1(partnerDenied, proposal)]);
  return (function (param) {
      return appendSystemEvent(partial_arg, param);
    });
}

function withPartner($staropt$star, user, supporters, log) {
  var withPubKey = $staropt$star ? $staropt$star[0] : true;
  if (supporters) {
    var first = supporters[0];
    var arg = function (param, param$1, param$2) {
      var partial_arg = /* Some */[withPubKey];
      return (function (param$3) {
          return withPartnerProposed(partial_arg, param, param$1, param$2, first, user, param$3);
        });
    };
    var log$1 = (function (eta) {
          return arg(/* None */0, /* None */0, /* None */0)(eta);
        })(log);
    var proposal = Event.getPartnerProposedExn(lastEvent(log$1));
    return withPartnerAccepted(proposal)(List.fold_left((function (log, supporter) {
                      return withPartnerEndorsed(/* None */0, supporter, proposal)(log);
                    }), log$1, supporters));
  } else {
    return Js_exn.raiseError("withPartner");
  }
}

function withFirstPartner(user) {
  var partial_arg = /* :: */[
    user,
    /* [] */0
  ];
  return (function (param) {
      return withPartner(/* None */0, user, partial_arg, param);
    });
}

function withPartnerRemovalProposed(proposer, toBeRemoved, l) {
  var lastPartnerAccepted = Js_option.getExn(Curry._3(EventLog.reduce, (function (res, param) {
              var $$event = param[/* event */0];
              if ($$event.tag === 4) {
                var $$event$1 = $$event[0];
                if (PrimitiveTypes.UserId[/* eq */5]($$event$1[/* data */2][/* id */1], toBeRemoved[/* userId */0])) {
                  return /* Some */[$$event$1];
                } else {
                  return res;
                }
              } else {
                return res;
              }
            }), /* None */0, l[/* log */3]));
  return appendEvent(proposer[/* issuerKeyPair */2], /* PartnerRemovalProposed */Block.__(7, [partnerRemovalProposed(eligiblePartners(l), lastPartnerAccepted, proposer)]), l);
}

function withPartnerPubKeyAdded(partner) {
  var partial_arg = /* PartnerPubKeyAdded */Block.__(6, [partnerPubKeyAdded(partner)]);
  var partial_arg$1 = partner[/* issuerKeyPair */2];
  return (function (param) {
      return appendEvent(partial_arg$1, partial_arg, param);
    });
}

function withPartnerRemovalEndorsed(supporter, proposal) {
  var partial_arg = /* PartnerRemovalEndorsed */Block.__(9, [partnerRemovalEndorsed(supporter, proposal)]);
  var partial_arg$1 = supporter[/* issuerKeyPair */2];
  return (function (param) {
      return appendEvent(partial_arg$1, partial_arg, param);
    });
}

function withPartnerRemovalAccepted(proposal) {
  var partial_arg = /* PartnerRemovalAccepted */Block.__(10, [Curry._1(partnerRemovalAccepted, proposal)]);
  return (function (param) {
      return appendSystemEvent(partial_arg, param);
    });
}

function withPartnerRemoved(user, supporters, log) {
  if (supporters) {
    var log$1 = withPartnerRemovalProposed(supporters[0], user, log);
    var proposal = Event.getPartnerRemovalProposedExn(lastEvent(log$1));
    return withPartnerRemovalAccepted(proposal)(List.fold_left((function (log, supporter) {
                      return withPartnerRemovalEndorsed(supporter, proposal)(log);
                    }), log$1, supporters));
  } else {
    return Js_exn.raiseError("withPartner");
  }
}

function withAccountCreationProposed(proposer) {
  var partial_arg = /* AccountCreationProposed */Block.__(12, [accountCreationProposed(Belt_Set.mergeMany(PrimitiveTypes.UserId[/* emptySet */9], /* array */[proposer[/* userId */0]]), proposer)]);
  var partial_arg$1 = proposer[/* issuerKeyPair */2];
  return (function (param) {
      return appendEvent(partial_arg$1, partial_arg, param);
    });
}

function withAccountCreationEndorsed(supporter, proposal) {
  var partial_arg = /* AccountCreationEndorsed */Block.__(14, [accountCreationEndorsed(supporter, proposal)]);
  var partial_arg$1 = supporter[/* issuerKeyPair */2];
  return (function (param) {
      return appendEvent(partial_arg$1, partial_arg, param);
    });
}

function withAccountCreationAccepted(proposal) {
  var partial_arg = /* AccountCreationAccepted */Block.__(15, [Curry._1(accountCreationAccepted, proposal)]);
  return (function (param) {
      return appendSystemEvent(partial_arg, param);
    });
}

function withAccount(supporter, log) {
  var log$1 = withAccountCreationProposed(supporter)(log);
  var proposal = Event.getAccountCreationProposedExn(lastEvent(log$1));
  return withAccountCreationAccepted(proposal)(withAccountCreationEndorsed(supporter, proposal)(log$1));
}

function withCustodianProposed(proposer, custodian, l) {
  var match = Curry._3(EventLog.reduce, (function (param, param$1) {
          var $$event = param$1[/* event */0];
          var custodianRemoved = param[1];
          var partnerProposal = param[0];
          switch ($$event.tag | 0) {
            case 1 : 
                var proposal = $$event[0];
                if (PrimitiveTypes.UserId[/* eq */5](proposal[/* data */6][/* id */1], custodian[/* userId */0])) {
                  return /* tuple */[
                          /* Some */[proposal],
                          custodianRemoved
                        ];
                } else {
                  return /* tuple */[
                          partnerProposal,
                          custodianRemoved
                        ];
                }
            case 24 : 
                var removal = $$event[0];
                if (PrimitiveTypes.UserId[/* eq */5](removal[/* data */2][/* custodianId */0], custodian[/* userId */0])) {
                  return /* tuple */[
                          partnerProposal,
                          /* Some */[removal]
                        ];
                } else {
                  return /* tuple */[
                          partnerProposal,
                          custodianRemoved
                        ];
                }
            default:
              return /* tuple */[
                      partnerProposal,
                      custodianRemoved
                    ];
          }
        }), /* tuple */[
        /* None */0,
        /* None */0
      ], l[/* log */3]);
  return appendEvent(proposer[/* issuerKeyPair */2], /* CustodianProposed */Block.__(16, [custodianProposed(eligiblePartners(l), match[1], proposer, Js_option.getExn(match[0]))]), l);
}

function withCustodianEndorsed(supporter, proposal) {
  var partial_arg = /* CustodianEndorsed */Block.__(18, [custodianEndorsed(supporter, proposal)]);
  var partial_arg$1 = supporter[/* issuerKeyPair */2];
  return (function (param) {
      return appendEvent(partial_arg$1, partial_arg, param);
    });
}

function withCustodianRejected(rejector, proposal) {
  var partial_arg = /* CustodianRejected */Block.__(17, [custodianRejected(rejector, proposal)]);
  var partial_arg$1 = rejector[/* issuerKeyPair */2];
  return (function (param) {
      return appendEvent(partial_arg$1, partial_arg, param);
    });
}

function withCustodianAccepted(proposal) {
  var partial_arg = /* CustodianAccepted */Block.__(19, [Curry._1(custodianAccepted, proposal)]);
  return (function (param) {
      return appendSystemEvent(partial_arg, param);
    });
}

function withCustodianDenied(proposal) {
  var partial_arg = /* CustodianDenied */Block.__(20, [Curry._1(custodianDenied, proposal)]);
  return (function (param) {
      return appendSystemEvent(partial_arg, param);
    });
}

function withCustodian(user, supporters, log) {
  if (supporters) {
    var log$1 = withCustodianProposed(supporters[0], user, log);
    var proposal = Event.getCustodianProposedExn(lastEvent(log$1));
    return withCustodianAccepted(proposal)(List.fold_left((function (log, supporter) {
                      return withCustodianEndorsed(supporter, proposal)(log);
                    }), log$1, supporters));
  } else {
    return Js_exn.raiseError("withPartner");
  }
}

function withCustodianRemovalProposed(proposer, toBeRemoved, l) {
  var custodianAccepted = Js_option.getExn(Curry._3(EventLog.reduce, (function (res, param) {
              var $$event = param[/* event */0];
              if ($$event.tag === 19) {
                var $$event$1 = $$event[0];
                if (PrimitiveTypes.UserId[/* eq */5]($$event$1[/* data */2][/* partnerId */0], toBeRemoved[/* userId */0])) {
                  return /* Some */[$$event$1];
                } else {
                  return res;
                }
              } else {
                return res;
              }
            }), /* None */0, l[/* log */3]));
  return appendEvent(proposer[/* issuerKeyPair */2], /* CustodianRemovalProposed */Block.__(21, [custodianRemovalProposed(eligiblePartners(l), custodianAccepted, proposer)]), l);
}

function withCustodianRemovalEndorsed(supporter, proposal) {
  var partial_arg = /* CustodianRemovalEndorsed */Block.__(23, [custodianRemovalEndorsed(supporter, proposal)]);
  var partial_arg$1 = supporter[/* issuerKeyPair */2];
  return (function (param) {
      return appendEvent(partial_arg$1, partial_arg, param);
    });
}

function withCustodianRemovalAccepted(proposal) {
  var partial_arg = /* CustodianRemovalAccepted */Block.__(24, [Curry._1(custodianRemovalAccepted, proposal)]);
  return (function (param) {
      return appendSystemEvent(partial_arg, param);
    });
}

function withCustodianRemoved(user, supporters, log) {
  if (supporters) {
    var log$1 = withCustodianRemovalProposed(supporters[0], user, log);
    var proposal = Event.getCustodianRemovalProposedExn(lastEvent(log$1));
    return withCustodianRemovalAccepted(proposal)(List.fold_left((function (log, supporter) {
                      return withCustodianRemovalEndorsed(supporter, proposal)(log);
                    }), log$1, supporters));
  } else {
    return Js_exn.raiseError("withCustodian");
  }
}

function withCustodianKeyChain($staropt$star, issuer, custodian, l) {
  var keyChainIdx = $staropt$star ? $staropt$star[0] : 0;
  var custodianProcesses = Curry._3(EventLog.reduce, (function (res, param) {
          var $$event = param[/* event */0];
          if ($$event.tag === 19) {
            var match = $$event[0];
            return /* :: */[
                    /* tuple */[
                      match[/* data */2][/* partnerId */0],
                      match[/* processId */0]
                    ],
                    res
                  ];
          } else {
            return res;
          }
        }), /* [] */0, l[/* log */3]);
  var keyChain = custodianKeyChain(/* None */0, l[/* ventureId */0], keyChainIdx, custodian);
  var issuerKeyPair = Js_option.getWithDefault(custodian[/* issuerKeyPair */2], Utils.mapOption((function (issuer) {
              return issuer[/* issuerKeyPair */2];
            }), issuer));
  return appendEvent(issuerKeyPair, /* CustodianKeyChainUpdated */Block.__(37, [Curry._3(custodianKeyChainUpdated, List.assoc(custodian[/* userId */0], custodianProcesses), custodian[/* userId */0], keyChain)]), l);
}

function withAccountKeyChainIdentified(l) {
  var keyChains = Curry._3(EventLog.reduce, (function (res, param) {
          var $$event = param[/* event */0];
          switch ($$event.tag | 0) {
            case 10 : 
                try {
                  return List.remove_assoc($$event[0][/* data */2][/* id */0], res);
                }
                catch (exn){
                  if (exn === Caml_builtin_exceptions.not_found) {
                    return res;
                  } else {
                    throw exn;
                  }
                }
            case 24 : 
                try {
                  return List.remove_assoc($$event[0][/* data */2][/* custodianId */0], res);
                }
                catch (exn$1){
                  if (exn$1 === Caml_builtin_exceptions.not_found) {
                    return res;
                  } else {
                    throw exn$1;
                  }
                }
            case 37 : 
                var match = $$event[0];
                var custodianId = match[/* custodianId */1];
                return /* :: */[
                        /* tuple */[
                          custodianId,
                          match[/* keyChain */2]
                        ],
                        List.remove_assoc(custodianId, res)
                      ];
            default:
              return res;
          }
        }), /* [] */0, l[/* log */3]);
  var accountKeyChain = accountKeyChainFrom(keyChains);
  return appendSystemEvent(/* AccountKeyChainIdentified */Block.__(38, [Curry._1(accountKeyChainIdentified, accountKeyChain)]), l);
}

function withAccountKeyChainActivated($staropt$star, user, l) {
  var sequence = $staropt$star ? $staropt$star[0] : 0;
  var identifier = Curry._3(EventLog.reduce, (function (res, param) {
          var $$event = param[/* event */0];
          if ($$event.tag === 38) {
            return $$event[0][/* keyChain */0][/* identifier */1];
          } else {
            return res;
          }
        }), "", l[/* log */3]);
  return appendEvent(user[/* issuerKeyPair */2], /* AccountKeyChainActivated */Block.__(39, [accountKeyChainActivated(/* Some */[sequence], user, identifier)]), l);
}

function withIncomeAddressExposed(user, l) {
  var match = Curry._3(EventLog.reduce, (function (param, param$1) {
          var $$event = param$1[/* event */0];
          var exposed = param[2];
          var activations = param[1];
          var keyChains = param[0];
          switch ($$event.tag | 0) {
            case 38 : 
                var keyChain = $$event[0][/* keyChain */0];
                return /* tuple */[
                        /* :: */[
                          /* tuple */[
                            keyChain[/* identifier */1],
                            keyChain
                          ],
                          keyChains
                        ],
                        activations,
                        exposed
                      ];
            case 39 : 
                var match = $$event[0];
                return /* tuple */[
                        keyChains,
                        /* :: */[
                          /* tuple */[
                            match[/* custodianId */1],
                            match[/* identifier */2]
                          ],
                          activations
                        ],
                        exposed
                      ];
            case 40 : 
                return /* tuple */[
                        keyChains,
                        activations,
                        /* :: */[
                          $$event[0][/* address */1][/* coordinates */2],
                          exposed
                        ]
                      ];
            default:
              return /* tuple */[
                      keyChains,
                      activations,
                      exposed
                    ];
          }
        }), /* tuple */[
        /* [] */0,
        /* [] */0,
        /* [] */0
      ], l[/* log */3]);
  var keyChain = List.assoc(List.assoc(user[/* userId */0], match[1]), match[0]);
  var coordinates = Address.Coordinates[/* nextExternal */2](user[/* userId */0], match[2], keyChain);
  var address = Address.make(coordinates, keyChain);
  return appendEvent(user[/* issuerKeyPair */2], /* IncomeAddressExposed */Block.__(40, [Curry._2(incomeAddressExposed, user[/* userId */0], address)]), l);
}

function withIncomeDetected(incomeAddress, l) {
  var match = Curry._3(EventLog.reduce, (function (param, param$1) {
          var $$event = param$1[/* event */0];
          var counter = param[1];
          var res = param[0];
          if ($$event.tag === 40) {
            if (counter > 0) {
              return /* tuple */[
                      /* None */0,
                      counter - 1 | 0
                    ];
            } else if (counter !== 0) {
              return /* tuple */[
                      res,
                      counter
                    ];
            } else {
              var address = $$event[0][/* address */1];
              return /* tuple */[
                      /* Some */[incomeDetected(address[/* displayAddress */5], address[/* coordinates */2])],
                      -1
                    ];
            }
          } else {
            return /* tuple */[
                    res,
                    counter
                  ];
          }
        }), /* tuple */[
        /* None */0,
        incomeAddress
      ], l[/* log */3]);
  return appendSystemEvent(/* IncomeDetected */Block.__(41, [Js_option.getExn(match[0])]), l);
}

var Log = /* module */[
  /* eligiblePartners */eligiblePartners,
  /* reduce */reduce,
  /* ventureId */ventureId,
  /* systemIssuer */systemIssuer,
  /* lastItem */lastItem,
  /* lastEvent */lastEvent,
  /* eventLog */eventLog,
  /* appendEvent */appendEvent,
  /* appendSystemEvent */appendSystemEvent,
  /* fromEventLog */fromEventLog,
  /* make */make,
  /* createVenture */createVenture$1,
  /* withPartnerProposed */withPartnerProposed,
  /* withPartnerEndorsed */withPartnerEndorsed,
  /* withPartnerRejected */withPartnerRejected,
  /* withPartnerAccepted */withPartnerAccepted,
  /* withPartnerDenied */withPartnerDenied,
  /* withPartner */withPartner,
  /* withFirstPartner */withFirstPartner,
  /* withPartnerRemovalProposed */withPartnerRemovalProposed,
  /* withPartnerPubKeyAdded */withPartnerPubKeyAdded,
  /* withPartnerRemovalEndorsed */withPartnerRemovalEndorsed,
  /* withPartnerRemovalAccepted */withPartnerRemovalAccepted,
  /* withPartnerRemoved */withPartnerRemoved,
  /* withAccountCreationProposed */withAccountCreationProposed,
  /* withAccountCreationEndorsed */withAccountCreationEndorsed,
  /* withAccountCreationAccepted */withAccountCreationAccepted,
  /* withAccount */withAccount,
  /* withCustodianProposed */withCustodianProposed,
  /* withCustodianEndorsed */withCustodianEndorsed,
  /* withCustodianRejected */withCustodianRejected,
  /* withCustodianAccepted */withCustodianAccepted,
  /* withCustodianDenied */withCustodianDenied,
  /* withCustodian */withCustodian,
  /* withCustodianRemovalProposed */withCustodianRemovalProposed,
  /* withCustodianRemovalEndorsed */withCustodianRemovalEndorsed,
  /* withCustodianRemovalAccepted */withCustodianRemovalAccepted,
  /* withCustodianRemoved */withCustodianRemoved,
  /* withCustodianKeyChain */withCustodianKeyChain,
  /* withAccountKeyChainIdentified */withAccountKeyChainIdentified,
  /* withAccountKeyChainActivated */withAccountKeyChainActivated,
  /* withIncomeAddressExposed */withIncomeAddressExposed,
  /* withIncomeDetected */withIncomeDetected
];

var AppEvent = 0;

exports.AppEvent = AppEvent;
exports.userSession = userSession;
exports.withUserSessions = withUserSessions;
exports.twoUserSessionsFromArray = twoUserSessionsFromArray;
exports.threeUserSessionsFromArray = threeUserSessionsFromArray;
exports.fourUserSessionsFromArray = fourUserSessionsFromArray;
exports.twoUserSessions = twoUserSessions;
exports.threeUserSessions = threeUserSessions;
exports.fourUserSessions = fourUserSessions;
exports.custodianKeyChain = custodianKeyChain;
exports.accountKeyChainFrom = accountKeyChainFrom;
exports.accountKeyChain = accountKeyChain;
exports.Event = Event$1;
exports.Log = Log;
/* BTC Not a pure module */
