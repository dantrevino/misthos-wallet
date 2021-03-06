open Jest;

open Expect;

module G = Generators;

module E = G.Event;

open WalletTypes;

let testCoordinates =
    (
      expected,
      (accountIdx, keyChainIdent, coSignerIdx, chainIdx, addressIdx),
    ) =>
  test("should match", () =>
    (
      accountIdx |> AccountIndex.toInt,
      keyChainIdent,
      coSignerIdx |> CoSignerIndex.toInt,
      chainIdx |> ChainIndex.toInt,
      addressIdx |> AddressIndex.toInt,
    )
    |> expect
    |> toEqual(expected)
  );

let () = {
  let (user1, user2, user3) = Fixtures.threeUserSessions;
  let accountKeyChain = G.accountKeyChain([user1, user2, user3]);
  describe("Coordinates", () => {
    describe("first coordinates", () =>
      Address.Coordinates.nextInternal(user1.userId, [], accountKeyChain)
      |> testCoordinates((
           0,
           "4cb9efbdaabe81bbb58465f055f30d37fd3b4555505c4349c8e0233e4a0243a3",
           2,
           1,
           0,
         ))
    );
    describe("next coordinates", () => {
      let coordinates1 =
        Address.Coordinates.nextExternal(user1.userId, [], accountKeyChain);
      let coordinates2 =
        Address.Coordinates.nextExternal(
          user1.userId,
          [coordinates1],
          accountKeyChain,
        );
      Address.Coordinates.nextExternal(
        user1.userId,
        [coordinates2, coordinates1],
        accountKeyChain,
      )
      |> testCoordinates((
           0,
           "4cb9efbdaabe81bbb58465f055f30d37fd3b4555505c4349c8e0233e4a0243a3",
           2,
           0,
           2,
         ));
    });
  });
  describe("make", () =>
    test("returns an address", () => {
      let coordinates =
        Address.Coordinates.nextExternal(user1.userId, [], accountKeyChain);
      expect(Address.make(coordinates, accountKeyChain))
      |> toEqual(
           {
             nCoSigners: 2,
             nPubKeys: 3,
             coordinates,
             witnessScript: "74528763028031b2755167526821020e9782b2f322710b493e068305a89f5ea251a599b1be30aed66eb3f9ef77f5dc210211f5757d29e19d91df628e51e219d2c08f09100d12be099e5fa5fe9bda66ea842103ecd7d25cf95c0bc67c0acd8bbb02e4d89a68bd7159703b68c8ac15bb281099ea53ae",
             redeemScript: "00209d12469dbbeeacbaa04a10495d25b467aa7aa8b1c449389b77b13e07cd5d6a38",
             displayAddress: "2NBym6HG6byx3hvW8bwhWo4mEHBW2qjzoAU",
             sequence: Some(12672),
           }: Address.t,
         );
    })
  );
  describe("encode / decode", () =>
    test("Can handle old and new encode format", () => {
      let coordinates =
        Address.Coordinates.nextExternal(user1.userId, [], accountKeyChain);
      let address: Address.t = {
        nCoSigners: 2,
        nPubKeys: 3,
        coordinates,
        witnessScript: "5221020e9782b2f322710b493e068305a89f5ea251a599b1be30aed66eb3f9ef77f5dc210211f5757d29e19d91df628e51e219d2c08f09100d12be099e5fa5fe9bda66ea842103ecd7d25cf95c0bc67c0acd8bbb02e4d89a68bd7159703b68c8ac15bb281099ea53ae",
        redeemScript: "0020037ff9e769b4e13e6d47567412cb338195342685c3a50bd0eb0be0408f3da5c9",
        displayAddress: "2NEdi7RV4F4Ce7hNmEHQRpcSCf2ZUacfDMw",
        sequence: None,
      };
      expect(address |> Address.encode |> Address.decode) |> toEqual(address);
    })
  );
};
