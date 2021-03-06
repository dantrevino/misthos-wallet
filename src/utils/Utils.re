let bufToHex = buf => buf->(BufferExt.toStringWithEncoding("hex"));

let bufFromHex = BufferExt.fromStringWithEncoding(~encoding="hex");

let hexByteLength = BufferExt.byteLength(~encoding="hex");

let keyPairFromPrivateKey = (network, key) =>
  Bitcoin.(ECPair.fromPrivateKey(key |> bufFromHex, {"network": network}));

let publicKeyFromKeyPair = pair =>
  Bitcoin.(pair |> ECPair.getPublicKey |> bufToHex);

let keyFromPublicKey = (network, key) =>
  (key |> bufFromHex)->(Bitcoin.ECPair.fromPublicKey({"network": network}));

let signatureToDER = ecSignature =>
  Bitcoin.(Script.Signature.encode(ecSignature, Transaction.sighashAll))
  ->(BufferExt.slice(0, -1))
  |> bufToHex;

let signatureFromDER = ecSignature => {
  let sigHash = BufferExt.makeWithSize(1);
  sigHash->(
             BufferExt.writeUInt8(
               Bitcoin.Transaction.sighashAll |> Obj.magic,
               0,
             )
           );
  BufferExt.concat([|ecSignature |> bufFromHex, sigHash|])
  ->Bitcoin.Script.Signature.decode##signature;
};

let hash = s => s |> Bitcoin.Crypto.sha256 |> bufToHex;

let hashCode = s =>
  (
    s
    |> Js.String.castToArrayLike
    |> Js.Array.from
    |> Array.to_list
    |> List.fold_left(
         (h, c) => {
           let h = h lsl 5 - h + (c.[0] |> Char.code);
           h land h;
         },
         0,
       )
  )
  land 0x7fffffff;

let (>>) = (f, g, v) => v |> f |> g;

let printError = (message, error) => {
  Js.log("Error - " ++ message ++ ":");
  Js.log(error);
};

let mapOption = fn =>
  fun
  | Some(a) => Some(fn(a))
  | None => None;

let andThen = fn =>
  fun
  | Some(a) => fn(a)
  | None => None;

let maybeField = (name, decoder) =>
  Json.Decode.(withDefault(None, field(name, optional(decoder))));
let encodeFloat = Json.Encode.float;

let decodeFloat = Json.Decode.float;
