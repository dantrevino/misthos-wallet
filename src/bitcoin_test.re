open Jest;

open Expect;

open Bitcoin;

let () = {
  describe(
    "Networks",
    () => test("bitcoin", () => expect(Networks.bitcoin##bech32) |> toBe("bc"))
  );
  describe(
    "ECPair",
    () =>
      test(
        "fromWIF",
        () => {
          let wif = "KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn";
          let address = "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH";
          let keyPair = ECPair.fromWIF(wif, [||]);
          expect(keyPair |> ECPair.getAddress) |> toBe(address)
        }
      )
  );
  describe(
    "TransactionBuilder",
    () =>
      test(
        "create",
        () => {
          let wif = "L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy";
          let keyPair = ECPair.fromWIF(wif, [||]);
          let tx = TxBuilder.create(~network=Networks.bitcoin, ());
          let txId = "aa94ab02c182214f090e99a0d57021caffd0f195a81c24602b1028b130b63e31";
          TxBuilder.addInput(tx, txId, 0);
          TxBuilder.addOutput(tx, "1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK", 15000);
          TxBuilder.sign(tx, 0, keyPair);
          let hex = tx |> TxBuilder.build |> Tx.toHex;
          Js.log(hex);
          expect(hex) |> toMatch("0100000001313eb630b128102b60241ca895f1d0ffca21")
        }
      )
  )
};
