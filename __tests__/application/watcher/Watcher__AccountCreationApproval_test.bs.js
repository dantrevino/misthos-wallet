// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var $$Event = require("../../../src/application/events/Event.bs.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Generators = require("../../helpers/Generators.bs.js");
var Caml_oo_curry = require("bs-platform/lib/js/caml_oo_curry.js");
var PrimitiveTypes = require("../../../src/application/PrimitiveTypes.bs.js");
var WatcherHelpers = require("../../helpers/WatcherHelpers.bs.js");
var Watcher__AccountCreationApproval = require("../../../src/application/watcher/Watcher__AccountCreationApproval.bs.js");

Jest.describe("With 1 partner and a proposal", (function (param) {
        var user1 = Generators.userSession(PrimitiveTypes.UserId[/* fromString */1]("user1"));
        var log = Generators.Log[/* withAccountCreationProposed */24](user1)(Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1)));
        var proposal = $$Event.getAccountCreationProposedExn(Generators.Log[/* lastEvent */5](log));
        var log$1 = Generators.Log[/* withAccountCreationEndorsed */25](user1, proposal)(log);
        var watcher = Watcher__AccountCreationApproval.make(proposal, Generators.Log[/* eventLog */6](log$1));
        return WatcherHelpers.testWatcherHasEventPending("AccountCreationAccepted", watcher, Generators.Log[/* systemIssuer */3](log$1), (function (param) {
                      if (param.tag === 15) {
                        return Caml_obj.caml_equal(param[0][/* data */2], proposal[/* data */6]);
                      } else {
                        return false;
                      }
                    }));
      }));

Jest.describe("Completes when the account is accepted", (function (param) {
        var user1 = Generators.userSession(PrimitiveTypes.UserId[/* fromString */1]("user1"));
        var log = Generators.Log[/* withAccountCreationProposed */24](user1)(Generators.Log[/* withFirstPartner */18](user1)(Generators.Log[/* createVenture */11](user1)));
        var proposal = $$Event.getAccountCreationProposedExn(Generators.Log[/* lastEvent */5](log));
        var log$1 = Generators.Log[/* withAccountCreationEndorsed */25](user1, proposal)(log);
        var watcher = Watcher__AccountCreationApproval.make(proposal, Generators.Log[/* eventLog */6](log$1));
        var log$2 = Generators.Log[/* withAccountCreationAccepted */26](proposal)(log$1);
        Caml_oo_curry.js2(710435299, 1, watcher, Generators.Log[/* lastItem */4](log$2));
        return WatcherHelpers.testWatcherHasCompleted(watcher);
      }));

var AccountCreationApproval = 0;

exports.AccountCreationApproval = AccountCreationApproval;
/*  Not a pure module */
