open WorkerLocalStorage;

open PrimitiveTypes;

module Venture = WorkerizedVenture;

type send =
  | UpdateSession(blockstackItems)
  | ProposePartner(ventureId, userId)
  | EndorsePartner(ventureId, processId)
  | ProposePartnerRemoval(ventureId, userId)
  | EndorsePartnerRemoval(ventureId, processId)
  | Create(string);

type receive =
  | UpdateIndex(Venture.Index.t)
  | NewEvents(ventureId, list(Event.t));

type encodedReceive = Js.Json.t;

let encodeReceive =
  fun
  | UpdateIndex(index) =>
    Json.Encode.(
      object_([
        ("type", string("UpdateIndex")),
        ("index", Venture.Index.encode(index)),
      ])
    )
  | NewEvents(ventureId, events) =>
    Json.Encode.(
      object_([
        ("type", string("NewEvents")),
        ("ventureId", VentureId.encode(ventureId)),
        ("events", list(Event.encode, events)),
      ])
    );

exception UnknownMessage(Js.Json.t);

let decodeReceive = raw => {
  let type_ = raw |> Json.Decode.(field("type", string));
  switch (type_) {
  | "NewEvents" =>
    let ventureId = raw |> Json.Decode.field("ventureId", VentureId.decode);
    let events = Json.Decode.(raw |> field("events", list(Event.decode)));
    NewEvents(ventureId, events);
  | "UpdateIndex" =>
    UpdateIndex(raw |> Json.Decode.field("index", Venture.Index.decode))
  | _ => raise(UnknownMessage(raw))
  };
};
