// Generated by BUCKLESCRIPT VERSION 4.0.4, PLEASE EDIT WITH CARE
'use strict';

var Json = require("@glennsl/bs-json/src/Json.bs.js");
var List = require("bs-platform/lib/js/list.js");
var Blockstack = require("blockstack");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/src/Json_encode.bs.js");
var PrimitiveTypes = require("./PrimitiveTypes.bs.js");

function makeIndex(breakingChange) {
  return /* record */[
          /* ventures : [] */0,
          /* breakingChange */breakingChange
        ];
}

function item(item$1) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "name",
                item$1[/* name */1]
              ],
              /* :: */[
                /* tuple */[
                  "id",
                  PrimitiveTypes.VentureId[/* encode */2](item$1[/* id */0])
                ],
                /* [] */0
              ]
            ]);
}

function ventures(param) {
  return Json_encode.list(item, param);
}

function index(index$1) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "ventures",
                Json_encode.list(item, index$1[/* ventures */0])
              ],
              /* :: */[
                /* tuple */[
                  "breakingChange",
                  index$1[/* breakingChange */1]
                ],
                /* [] */0
              ]
            ]);
}

var Encode = /* module */[
  /* item */item,
  /* ventures */ventures,
  /* index */index
];

function item$1(json) {
  return /* record */[
          /* id */Json_decode.field("id", PrimitiveTypes.VentureId[/* decode */3], json),
          /* name */Json_decode.field("name", Json_decode.string, json)
        ];
}

function ventures$1(param) {
  return Json_decode.list(item$1, param);
}

function index$1(json) {
  return /* record */[
          /* ventures */Json_decode.field("ventures", ventures$1, json),
          /* breakingChange */Json_decode.field("breakingChange", Json_decode.bool, json)
        ];
}

var Decode = /* module */[
  /* item */item$1,
  /* ventures */ventures$1,
  /* index */index$1
];

var indexPath = "index.json";

function persist(index$2) {
  return Blockstack.putFile(indexPath, Json.stringify(index(index$2))).then((function () {
                return Promise.resolve(index$2);
              }));
}

function persistOld(index) {
  return Blockstack.putFile("indexV0.json", Json.stringify(Json_encode.list(item, index)));
}

function load() {
  return Blockstack.getFile(indexPath).then((function (nullVentures) {
                if (nullVentures == null) {
                  return persist(/* record */[
                              /* ventures : [] */0,
                              /* breakingChange */false
                            ]);
                } else {
                  var parsedIndex = Json.parseOrRaise(nullVentures);
                  try {
                    return Promise.resolve(index$1(parsedIndex));
                  }
                  catch (exn){
                    try {
                      var oldIndex = Json_decode.list(item$1, parsedIndex);
                      if (List.length(oldIndex) > 0) {
                        persistOld(oldIndex);
                        return persist(/* record */[
                                    /* ventures : [] */0,
                                    /* breakingChange */true
                                  ]);
                      } else {
                        return persist(/* record */[
                                    /* ventures : [] */0,
                                    /* breakingChange */false
                                  ]);
                      }
                    }
                    catch (exn$1){
                      return persist(/* record */[
                                  /* ventures : [] */0,
                                  /* breakingChange */false
                                ]);
                    }
                  }
                }
              }));
}

function itemPresent(ventureId, param) {
  return List.exists((function (item) {
                return PrimitiveTypes.VentureId[/* eq */5](item[/* id */0], ventureId);
              }), param[/* ventures */0]);
}

function add(id, name) {
  return load(/* () */0).then((function (index) {
                if (itemPresent(id, index)) {
                  return Promise.resolve(index);
                } else {
                  return persist(/* record */[
                              /* ventures : :: */[
                                /* record */[
                                  /* id */id,
                                  /* name */name
                                ],
                                index[/* ventures */0]
                              ],
                              /* breakingChange */false
                            ]);
                }
              }));
}

var encode = index;

var decode = index$1;

exports.makeIndex = makeIndex;
exports.Encode = Encode;
exports.Decode = Decode;
exports.encode = encode;
exports.decode = decode;
exports.indexPath = indexPath;
exports.persist = persist;
exports.persistOld = persistOld;
exports.load = load;
exports.itemPresent = itemPresent;
exports.add = add;
/* blockstack Not a pure module */
