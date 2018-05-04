// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Policy = require("../Policy.bs.js");
var Json_decode = require("bs-json/src/Json_decode.js");
var Json_encode = require("bs-json/src/Json_encode.js");
var PrimitiveTypes = require("../PrimitiveTypes.bs.js");

function makeProposal(name) {
  return (function (Data) {
      var make = function ($staropt$star, $staropt$star$1, supporterId, policy, data) {
        var dependsOnProposals = $staropt$star ? $staropt$star[0] : /* [] */0;
        var dependsOnCompletions = $staropt$star$1 ? $staropt$star$1[0] : /* [] */0;
        return /* record */[
                /* processId */PrimitiveTypes.ProcessId[/* make */7](/* () */0),
                /* dependsOnProposals */dependsOnProposals,
                /* dependsOnCompletions */dependsOnCompletions,
                /* supporterId */supporterId,
                /* policy */policy,
                /* data */data
              ];
      };
      var encode = function ($$event) {
        return Json_encode.object_(/* :: */[
                    /* tuple */[
                      "type",
                      name
                    ],
                    /* :: */[
                      /* tuple */[
                        "processId",
                        PrimitiveTypes.ProcessId[/* encode */2]($$event[/* processId */0])
                      ],
                      /* :: */[
                        /* tuple */[
                          "dependsOnProposals",
                          Json_encode.list(PrimitiveTypes.ProcessId[/* encode */2], $$event[/* dependsOnProposals */1])
                        ],
                        /* :: */[
                          /* tuple */[
                            "dependsOnCompletions",
                            Json_encode.list(PrimitiveTypes.ProcessId[/* encode */2], $$event[/* dependsOnCompletions */2])
                          ],
                          /* :: */[
                            /* tuple */[
                              "supporterId",
                              PrimitiveTypes.UserId[/* encode */2]($$event[/* supporterId */3])
                            ],
                            /* :: */[
                              /* tuple */[
                                "policy",
                                Policy.encode($$event[/* policy */4])
                              ],
                              /* :: */[
                                /* tuple */[
                                  "data",
                                  Curry._1(Data[/* encode */0], $$event[/* data */5])
                                ],
                                /* [] */0
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]);
      };
      var decode = function (raw) {
        var partial_arg = PrimitiveTypes.ProcessId[/* decode */3];
        var partial_arg$1 = PrimitiveTypes.ProcessId[/* decode */3];
        return /* record */[
                /* processId */Json_decode.field("processId", PrimitiveTypes.ProcessId[/* decode */3], raw),
                /* dependsOnProposals */Json_decode.field("dependsOnProposals", (function (param) {
                        return Json_decode.list(partial_arg, param);
                      }), raw),
                /* dependsOnCompletions */Json_decode.field("dependsOnCompletions", (function (param) {
                        return Json_decode.list(partial_arg$1, param);
                      }), raw),
                /* supporterId */Json_decode.field("supporterId", PrimitiveTypes.UserId[/* decode */3], raw),
                /* policy */Json_decode.field("policy", Policy.decode, raw),
                /* data */Json_decode.field("data", Data[/* decode */1], raw)
              ];
      };
      return /* module */[
              /* make */make,
              /* encode */encode,
              /* decode */decode
            ];
    });
}

function makeEndorsement(name) {
  var make = function (processId, supporterId) {
    return /* record */[
            /* processId */processId,
            /* supporterId */supporterId
          ];
  };
  var encode = function ($$event) {
    return Json_encode.object_(/* :: */[
                /* tuple */[
                  "type",
                  name
                ],
                /* :: */[
                  /* tuple */[
                    "processId",
                    PrimitiveTypes.ProcessId[/* encode */2]($$event[/* processId */0])
                  ],
                  /* :: */[
                    /* tuple */[
                      "supporterId",
                      PrimitiveTypes.UserId[/* encode */2]($$event[/* supporterId */1])
                    ],
                    /* [] */0
                  ]
                ]
              ]);
  };
  var decode = function (raw) {
    return /* record */[
            /* processId */Json_decode.field("processId", PrimitiveTypes.ProcessId[/* decode */3], raw),
            /* supporterId */Json_decode.field("supporterId", PrimitiveTypes.UserId[/* decode */3], raw)
          ];
  };
  return /* module */[
          /* make */make,
          /* encode */encode,
          /* decode */decode
        ];
}

function makeAcceptance(name) {
  return (function (Data) {
      var fromProposal = function (param) {
        return /* record */[
                /* processId */param[/* processId */0],
                /* dependsOnCompletions */List.append(param[/* dependsOnCompletions */2], param[/* dependsOnProposals */1]),
                /* data */param[/* data */5]
              ];
      };
      var encode = function ($$event) {
        return Json_encode.object_(/* :: */[
                    /* tuple */[
                      "type",
                      name
                    ],
                    /* :: */[
                      /* tuple */[
                        "processId",
                        PrimitiveTypes.ProcessId[/* encode */2]($$event[/* processId */0])
                      ],
                      /* :: */[
                        /* tuple */[
                          "dependsOnCompletions",
                          Json_encode.list(PrimitiveTypes.ProcessId[/* encode */2], $$event[/* dependsOnCompletions */1])
                        ],
                        /* :: */[
                          /* tuple */[
                            "data",
                            Curry._1(Data[/* encode */0], $$event[/* data */2])
                          ],
                          /* [] */0
                        ]
                      ]
                    ]
                  ]);
      };
      var decode = function (raw) {
        var partial_arg = PrimitiveTypes.ProcessId[/* decode */3];
        return /* record */[
                /* processId */Json_decode.field("processId", PrimitiveTypes.ProcessId[/* decode */3], raw),
                /* dependsOnCompletions */Json_decode.field("dependsOnCompletions", (function (param) {
                        return Json_decode.list(partial_arg, param);
                      }), raw),
                /* data */Json_decode.field("data", Data[/* decode */1], raw)
              ];
      };
      return /* module */[
              /* fromProposal */fromProposal,
              /* encode */encode,
              /* decode */decode
            ];
    });
}

function makeProcess(name) {
  return (function (Data) {
      var processName = name + "ApprovalProcess";
      var Proposed = makeProposal(name + "Proposed")(Data);
      var Endorsed = makeEndorsement(name + "Endorsed");
      var Accepted = makeAcceptance(name + "Accepted")(Data);
      return /* module */[
              /* processName */processName,
              /* Proposed */Proposed,
              /* Endorsed */Endorsed,
              /* Accepted */Accepted
            ];
    });
}

exports.makeProposal = makeProposal;
exports.makeEndorsement = makeEndorsement;
exports.makeAcceptance = makeAcceptance;
exports.makeProcess = makeProcess;
/* Policy Not a pure module */