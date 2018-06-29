open Belt;

open PrimitiveTypes;

open WalletTypes;

open Event;

open Address;

type addressStatus =
  | Accessible
  | AtRisk
  | OutdatedCustodians;

type addressType =
  | Income
  | Change;

type addressInfo = {
  addressType,
  custodians: UserId.set,
  address: string,
  nCoSigners: int,
  balance: BTC.t,
  addressStatus,
};

type t = {
  network: Network.t,
  unused: Network.inputSet,
  reserved: Network.inputMap(ProcessId.set),
  keyChains: AccountKeyChain.Collection.t,
  payoutProcesses: ProcessId.map(PayoutTransaction.t),
  activatedKeyChain:
    list((accountIdx, list((userId, AccountKeyChain.Identifier.t)))),
  exposedCoordinates: list(Address.Coordinates.t),
  addressInfos: list(addressInfo),
  currentCustodians: UserId.set,
};

let addressInfos = ({addressInfos}) => addressInfos;

let collidingProcesses = (processId, {reserved, payoutProcesses}) => {
  let inputs =
    payoutProcesses
    |. Map.get(processId)
    |> Utils.mapOption(({usedInputs}: PayoutTransaction.t) => usedInputs)
    |> Js.Option.getWithDefault([||]);
  inputs
  |. Array.reduceU(ProcessId.emptySet, (. res, input) =>
       reserved
       |. Map.getWithDefault(input, ProcessId.emptySet)
       |. Set.union(res)
     )
  |. Set.remove(processId);
};

let totalUnusedBTC = ({unused}) =>
  unused
  |. Set.reduceU(BTC.zero, (. res, {value}: Network.txInput) =>
       res |> BTC.plus(value)
     );

let totalReservedBTC = ({reserved}) =>
  reserved
  |. Map.keysToArray
  |. Array.reduceU(BTC.zero, (. res, {value}: Network.txInput) =>
       res |> BTC.plus(value)
     );

let currentKeyChainIdent = (accountIdx, userId, {activatedKeyChain}) =>
  activatedKeyChain
  |. List.getAssoc(accountIdx, AccountIndex.eq)
  |> Js.Option.getExn
  |. List.getAssoc(userId, UserId.eq)
  |> Js.Option.getExn;

let currentKeyChain = (accountIdx, userId, {keyChains} as state) => {
  let currentIdent = currentKeyChainIdent(accountIdx, userId, state);
  keyChains |> AccountKeyChain.Collection.lookup(accountIdx, currentIdent);
};

let exposedCoordinates = ({exposedCoordinates}) => exposedCoordinates;

let accountKeyChains = ({keyChains}) => keyChains;

let unusedInputs = ({unused, reserved}) =>
  Set.diff(
    unused,
    reserved |> Map.keysToArray |> Set.mergeMany(Network.inputSet()),
  );

let nonReservedOldInputs = (accountIdx, userId, {keyChains} as collector) => {
  let keyChainIdent = currentKeyChainIdent(accountIdx, userId, collector);
  let currentKeyChain =
    keyChains |> AccountKeyChain.Collection.lookup(accountIdx, keyChainIdent);
  let custodians = currentKeyChain |> AccountKeyChain.custodians;
  let currentKeyChainIdents =
    keyChains |> AccountKeyChain.Collection.withCustodians(custodians);
  collector
  |. unusedInputs
  |. Belt.Set.keepU((. i: Network.txInput) =>
       i.coordinates
       |> Coordinates.keyChainIdent
       |> Set.String.has(currentKeyChainIdents) == false
     );
};

let network = ({network}) => network;

let nextChangeAddress = (accountIdx, userId, collector) => {
  let keyChainIdent = currentKeyChainIdent(accountIdx, userId, collector);
  let accountKeyChain =
    collector.keyChains
    |> AccountKeyChain.Collection.lookup(accountIdx, keyChainIdent);
  let coordinates =
    collector.exposedCoordinates |> Coordinates.allForAccount(accountIdx);
  let nextChangeCoordinates =
    Coordinates.nextInternal(userId, coordinates, accountKeyChain);
  Address.find(nextChangeCoordinates, collector.keyChains);
};

let fakeChangeAddress = (accountIdx, userId, collector) => {
  let keyChainIdent = currentKeyChainIdent(accountIdx, userId, collector);
  let accountKeyChain =
    collector.keyChains
    |> AccountKeyChain.Collection.lookup(accountIdx, keyChainIdent);
  let coordinates =
    collector.exposedCoordinates |> Coordinates.allForAccount(accountIdx);
  let nextChangeCoordinates =
    Coordinates.nextInternal(userId, coordinates, accountKeyChain);
  {
    nCoSigners: accountKeyChain.nCoSigners,
    nPubKeys: accountKeyChain.custodianKeyChains |> List.length,
    coordinates: nextChangeCoordinates,
    witnessScript: "",
    redeemScript: "",
    displayAddress: Network.exampleOfLongestAddress(collector.network),
    sequence: accountKeyChain.nCoSigners > 1 ? Some(1) : None,
  };
};

let make = () => {
  network: Regtest,
  unused: Network.inputSet(),
  reserved: Network.inputMap(),
  keyChains: AccountKeyChain.Collection.empty,
  payoutProcesses: ProcessId.makeMap(),
  activatedKeyChain: [],
  exposedCoordinates: [],
  addressInfos: [],
  currentCustodians: UserId.emptySet,
};

let removeInputsFromReserved = (processId, inputs, reserved) =>
  inputs
  |. Array.reduceU(reserved, (. lookup, input) =>
       lookup
       |. Map.updateU(
            input,
            (. processes) => {
              let processes =
                processes
                |> Js.Option.getWithDefault(ProcessId.emptySet)
                |. Set.remove(processId);
              processes |. Set.isEmpty ? None : Some(processes);
            },
          )
     );

let apply = (event, state) =>
  switch (event) {
  | VentureCreated({network}) => {...state, network}
  | AccountCreationAccepted(
      ({data: {accountIdx}}: AccountCreation.Accepted.t),
    ) => {
      ...state,
      activatedKeyChain: [(accountIdx, []), ...state.activatedKeyChain],
    }
  | AccountKeyChainIdentified({keyChain}) => {
      ...state,
      keyChains: state.keyChains |> AccountKeyChain.Collection.add(keyChain),
    }
  | AccountKeyChainActivated({accountIdx, custodianId, identifier}) => {
      ...state,
      activatedKeyChain: [
        (
          accountIdx,
          [
            (custodianId, identifier),
            ...state.activatedKeyChain
               |. List.getAssoc(accountIdx, AccountIndex.eq)
               |> Js.Option.getExn,
          ],
        ),
        ...state.activatedKeyChain
           |. List.removeAssoc(accountIdx, AccountIndex.eq),
      ],
    }
  | IncomeAddressExposed(
      (
        {address: {coordinates, displayAddress, nCoSigners}}: IncomeAddressExposed.t
      ),
    ) =>
    let custodians =
      (
        state.keyChains
        |> AccountKeyChain.Collection.lookup(
             coordinates |> Address.Coordinates.accountIdx,
             coordinates |> Address.Coordinates.keyChainIdent,
           )
      ).
        custodianKeyChains
      |. List.map(fst)
      |> List.toArray
      |> Set.mergeMany(UserId.emptySet);
    {
      ...state,
      exposedCoordinates: [coordinates, ...state.exposedCoordinates],
      addressInfos: [
        {
          address: displayAddress,
          addressStatus: Accessible,
          addressType: Income,
          balance: BTC.zero,
          nCoSigners,
          custodians,
        },
        ...state.addressInfos,
      ],
    };
  | IncomeDetected({address, txId, txOutputN, amount, coordinates}) =>
    let keyChain =
      state.keyChains
      |> AccountKeyChain.Collection.lookup(
           coordinates |> Address.Coordinates.accountIdx,
           coordinates |> Address.Coordinates.keyChainIdent,
         );
    {
      ...state,
      unused:
        state.unused
        |. Set.add({
             txId,
             txOutputN,
             address,
             value: amount,
             coordinates,
             nCoSigners: keyChain.nCoSigners,
             nPubKeys: keyChain.custodianKeyChains |> List.length,
             sequence: keyChain.sequence,
           }),
    };
  | PayoutProposed({
      data: {payoutTx: {usedInputs, changeAddress} as payoutTx},
      processId,
    }) => {
      ...state,
      reserved:
        usedInputs
        |. Array.reduceU(state.reserved, (. lookup, input) =>
             lookup
             |. Map.updateU(input, (. processes) =>
                  Some(
                    processes
                    |> Js.Option.getWithDefault(ProcessId.emptySet)
                    |. Set.add(processId),
                  )
                )
           ),
      payoutProcesses: state.payoutProcesses |. Map.set(processId, payoutTx),
      exposedCoordinates:
        switch (changeAddress) {
        | None => state.exposedCoordinates
        | Some(changeAddress) => [
            changeAddress.coordinates,
            ...state.exposedCoordinates,
          ]
        },
    }
  | PayoutDenied({processId}) =>
    let payoutTx: PayoutTransaction.t =
      state.payoutProcesses |. Map.getExn(processId);
    let reserved =
      removeInputsFromReserved(
        processId,
        payoutTx.usedInputs,
        state.reserved,
      );
    {...state, reserved};
  | PayoutAborted({processId}) =>
    let payoutTx: PayoutTransaction.t =
      state.payoutProcesses |. Map.getExn(processId);
    let reserved =
      removeInputsFromReserved(
        processId,
        payoutTx.usedInputs,
        state.reserved,
      );
    {...state, reserved};
  | PayoutBroadcast({processId, txId}) =>
    let payoutTx: PayoutTransaction.t =
      state.payoutProcesses |. Map.getExn(processId);
    let reserved =
      removeInputsFromReserved(
        processId,
        payoutTx.usedInputs,
        state.reserved,
      );
    {
      ...state,
      reserved,
      unused:
        (
          switch (
            payoutTx
            |> PayoutTransaction.txInputForChangeAddress(~txId, state.network)
          ) {
          | Some(input) => state.unused |. Set.add(input)
          | None => state.unused
          }
        )
        |. Set.removeMany(payoutTx.usedInputs),
    };
  | PayoutBroadcastFailed({processId}) =>
    let payoutTx: PayoutTransaction.t =
      state.payoutProcesses |. Map.getExn(processId);
    let reserved =
      removeInputsFromReserved(
        processId,
        payoutTx.usedInputs,
        state.reserved,
      );
    {...state, reserved};
  | _ => state
  };
