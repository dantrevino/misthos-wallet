open Belt;

open PrimitiveTypes;

open WalletTypes;

module VentureCreated = {
  type t = {
    ventureId,
    ventureName: string,
    creatorId: userId,
    creatorPubKey: string,
    defaultAccountSettings: option(AccountSettings.t),
    metaPolicy: Policy.t,
    initialPolicies: option(Policy.initialPolicies),
    systemIssuer: Bitcoin.ECPair.t,
    network: Network.t,
  };
  let make =
      (
        ~ventureName,
        ~creatorId,
        ~creatorPubKey,
        ~defaultAccountSettings,
        ~metaPolicy,
        ~initialPolicies,
        ~network,
      ) => {
    ventureId: VentureId.make(),
    ventureName,
    creatorId,
    creatorPubKey,
    defaultAccountSettings: Some(defaultAccountSettings),
    initialPolicies: Some(initialPolicies),
    metaPolicy,
    systemIssuer: Bitcoin.ECPair.makeRandom(),
    network,
  };
  let encode = event =>
    Json.Encode.(
      object_([
        ("type", string("VentureCreated")),
        ("ventureId", VentureId.encode(event.ventureId)),
        ("ventureName", string(event.ventureName)),
        ("creatorId", UserId.encode(event.creatorId)),
        ("creatorPubKey", string(event.creatorPubKey)),
        (
          "defaultAccountSettings",
          nullable(AccountSettings.encode, event.defaultAccountSettings),
        ),
        (
          "initialPolicies",
          nullable(Policy.encodeInitialPolicies, event.initialPolicies),
        ),
        ("metaPolicy", Policy.encode(event.metaPolicy)),
        ("systemIssuer", string(Bitcoin.ECPair.toWIF(event.systemIssuer))),
        ("network", Network.encode(event.network)),
      ])
    );
  let decode = raw =>
    Json.Decode.{
      ventureId: raw |> field("ventureId", VentureId.decode),
      ventureName: raw |> field("ventureName", string),
      creatorId: raw |> field("creatorId", UserId.decode),
      creatorPubKey: raw |> field("creatorPubKey", string),
      defaultAccountSettings:
        raw
        |> Utils.maybeField("defaultAccountSettings", AccountSettings.decode),
      metaPolicy: raw |> field("metaPolicy", Policy.decode),
      initialPolicies:
        raw
        |> Utils.maybeField("initialPolicies", Policy.decodeInitialPolicies),
      systemIssuer:
        raw |> field("systemIssuer", string) |> Bitcoin.ECPair.fromWIF,
      network: raw |> field("network", Network.decode),
    };
};

module Partner = {
  module Data = {
    type t = {
      lastPartnerRemovalProcess: option(processId),
      id: userId,
      pubKey: option(string),
    };
    let encode = event =>
      Json.Encode.(
        object_([
          ("id", UserId.encode(event.id)),
          ("pubKey", nullable(string, event.pubKey)),
          (
            "lastPartnerRemovalProcess",
            nullable(ProcessId.encode, event.lastPartnerRemovalProcess),
          ),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        id: raw |> field("id", UserId.decode),
        pubKey: raw |> field("pubKey", optional(string)),
        lastPartnerRemovalProcess:
          raw
          |> field("lastPartnerRemovalProcess", optional(ProcessId.decode)),
      };
  };
  include (val EventTypes.makeProcess("Partner"))(Data);
  module Removal = {
    module Data = {
      type t = {
        id: userId,
        lastPartnerProcess: processId,
      };
      let encode = event =>
        Json.Encode.(
          object_([
            ("id", UserId.encode(event.id)),
            (
              "lastPartnerProcess",
              ProcessId.encode(event.lastPartnerProcess),
            ),
          ])
        );
      let decode = raw =>
        Json.Decode.{
          id: raw |> field("id", UserId.decode),
          lastPartnerProcess:
            raw |> field("lastPartnerProcess", ProcessId.decode),
        };
    };
    include (val EventTypes.makeProcess("PartnerRemoval"))(Data);
  };
  module PubKeyAdded = {
    type t = {
      partnerId: userId,
      pubKey: string,
    };
    let make = (~partnerId, ~pubKey) => {partnerId, pubKey};
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("PartnerPubKeyAdded")),
          ("partnerId", UserId.encode(event.partnerId)),
          ("pubKey", string(event.pubKey)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        partnerId: raw |> field("partnerId", UserId.decode),
        pubKey: raw |> field("pubKey", string),
      };
  };
};

module AccountCreation = {
  module Data = {
    type t = {
      accountIdx,
      settings: option(AccountSettings.t),
      name: string,
    };
    let encode = event =>
      Json.Encode.(
        object_([
          ("accountIdx", AccountIndex.encode(event.accountIdx)),
          ("settings", nullable(AccountSettings.encode, event.settings)),
          ("name", string(event.name)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        settings: raw |> Utils.maybeField("settings", AccountSettings.decode),
        accountIdx: raw |> field("accountIdx", AccountIndex.decode),
        name: raw |> field("name", string),
      };
  };
  include (val EventTypes.makeProcess("AccountCreation"))(Data);
};

module Custodian = {
  module Data = {
    type t = {
      partnerId: userId,
      partnerApprovalProcess: processId,
      lastCustodianRemovalProcess: option(processId),
      accountIdx,
    };
    let encode = event =>
      Json.Encode.(
        object_([
          ("partnerId", UserId.encode(event.partnerId)),
          (
            "partnerApprovalProcess",
            ProcessId.encode(event.partnerApprovalProcess),
          ),
          (
            "lastCustodianRemovalProcess",
            nullable(ProcessId.encode, event.lastCustodianRemovalProcess),
          ),
          ("accountIdx", AccountIndex.encode(event.accountIdx)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        partnerId: raw |> field("partnerId", UserId.decode),
        partnerApprovalProcess:
          raw |> field("partnerApprovalProcess", ProcessId.decode),
        lastCustodianRemovalProcess:
          raw
          |> field("lastCustodianRemovalProcess", optional(ProcessId.decode)),
        accountIdx: raw |> field("accountIdx", AccountIndex.decode),
      };
  };
  include (val EventTypes.makeProcess("Custodian"))(Data);
  module Removal = {
    module Data = {
      type t = {
        custodianId: userId,
        accountIdx,
        lastCustodianProcess: processId,
      };
      let encode = event =>
        Json.Encode.(
          object_([
            ("custodianId", UserId.encode(event.custodianId)),
            ("accountIdx", AccountIndex.encode(event.accountIdx)),
            (
              "lastCustodianProcess",
              ProcessId.encode(event.lastCustodianProcess),
            ),
          ])
        );
      let decode = raw =>
        Json.Decode.{
          custodianId: raw |> field("custodianId", UserId.decode),
          accountIdx: raw |> field("accountIdx", AccountIndex.decode),
          lastCustodianProcess:
            raw |> field("lastCustodianProcess", ProcessId.decode),
        };
    };
    include (val EventTypes.makeProcess("CustodianRemoval"))(Data);
  };
};

module Payout = {
  module Data = {
    type t = {
      accountIdx,
      payoutTx: PayoutTransaction.t,
    };
    let encode = event =>
      Json.Encode.(
        object_([
          ("accountIdx", AccountIndex.encode(event.accountIdx)),
          ("payoutTx", PayoutTransaction.encode(event.payoutTx)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        accountIdx: raw |> field("accountIdx", AccountIndex.decode),
        payoutTx: raw |> field("payoutTx", PayoutTransaction.decode),
      };
  };
  include (val EventTypes.makeProcess("Payout"))(Data);
  module Signed = {
    type t = {
      processId,
      custodianId: userId,
      payoutTx: PayoutTransaction.t,
    };
    let make = (~processId, ~custodianId, ~payoutTx) => {
      processId,
      custodianId,
      payoutTx,
    };
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("PayoutSigned")),
          ("processId", ProcessId.encode(event.processId)),
          ("custodianId", UserId.encode(event.custodianId)),
          ("payoutTx", PayoutTransaction.encode(event.payoutTx)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        processId: raw |> field("processId", ProcessId.decode),
        custodianId: raw |> field("custodianId", UserId.decode),
        payoutTx: raw |> field("payoutTx", PayoutTransaction.decode),
      };
  };
  module Finalized = {
    type t = {
      processId,
      txId: string,
      payoutTx: PayoutTransaction.t,
    };
    let make = (~processId, ~txId, ~payoutTx) => {processId, txId, payoutTx};
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("PayoutFinalized")),
          ("processId", ProcessId.encode(event.processId)),
          ("txId", string(event.txId)),
          ("payoutTx", PayoutTransaction.encode(event.payoutTx)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        processId: raw |> field("processId", ProcessId.decode),
        txId: raw |> field("txId", string),
        payoutTx: raw |> field("payoutTx", PayoutTransaction.decode),
      };
  };
  module Broadcast = {
    type t = {
      processId,
      txId: string,
    };
    let make = (~processId, ~txId) => {processId, txId};
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("PayoutBroadcast")),
          ("processId", ProcessId.encode(event.processId)),
          ("txId", string(event.txId)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        processId: raw |> field("processId", ProcessId.decode),
        txId: raw |> field("txId", string),
      };
  };
  module BroadcastDuplicate = {
    type t = {processId};
    let make = (~processId) => {processId: processId};
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("PayoutBroadcastDuplicate")),
          ("processId", ProcessId.encode(event.processId)),
        ])
      );
    let decode = raw =>
      Json.Decode.{processId: raw |> field("processId", ProcessId.decode)};
  };
  module BroadcastFailed = {
    type t = {
      processId,
      errorMessage: string,
    };
    let make = (~processId, ~errorMessage) => {processId, errorMessage};
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("PayoutBroadcastFailed")),
          ("processId", ProcessId.encode(event.processId)),
          ("errorMessage", string(event.errorMessage)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        processId: raw |> field("processId", ProcessId.decode),
        errorMessage: raw |> field("errorMessage", string),
      };
  };
};

module CustodianKeyChainUpdated = {
  type t = {
    custodianApprovalProcess: processId,
    custodianId: userId,
    keyChain: CustodianKeyChain.public,
  };
  let make = (~custodianApprovalProcess, ~custodianId, ~keyChain) => {
    custodianApprovalProcess,
    custodianId,
    keyChain,
  };
  let encode = event =>
    Json.Encode.(
      object_([
        ("type", string("CustodianKeyChainUpdated")),
        (
          "custodianApprovalProcess",
          ProcessId.encode(event.custodianApprovalProcess),
        ),
        ("custodianId", UserId.encode(event.custodianId)),
        ("keyChain", CustodianKeyChain.encode(event.keyChain)),
      ])
    );
  let decode = raw =>
    Json.Decode.{
      custodianApprovalProcess:
        raw |> field("custodianApprovalProcess", ProcessId.decode),
      custodianId: raw |> field("custodianId", UserId.decode),
      keyChain: raw |> field("keyChain", CustodianKeyChain.decode),
    };
};

module AccountKeyChainIdentified = {
  type t = {keyChain: AccountKeyChain.t};
  let make = (~keyChain: AccountKeyChain.t) => {keyChain: keyChain};
  let encode = event =>
    Json.Encode.(
      object_([
        ("type", string("AccountKeyChainIdentified")),
        ("keyChain", AccountKeyChain.encode(event.keyChain)),
      ])
    );
  let decode = raw =>
    Json.Decode.{keyChain: raw |> field("keyChain", AccountKeyChain.decode)};
};

module AccountKeyChainActivated = {
  type t = {
    accountIdx,
    custodianId: userId,
    identifier: AccountKeyChain.Identifier.t,
    sequence: int,
  };
  let make = (~accountIdx, ~custodianId, ~identifier, ~sequence) => {
    accountIdx,
    custodianId,
    identifier,
    sequence,
  };
  let encode = event =>
    Json.Encode.(
      object_([
        ("type", string("AccountKeyChainActivated")),
        ("accountIdx", AccountIndex.encode(event.accountIdx)),
        ("custodianId", UserId.encode(event.custodianId)),
        ("identifier", AccountKeyChain.Identifier.encode(event.identifier)),
        ("sequence", int(event.sequence)),
      ])
    );
  let decode = raw =>
    Json.Decode.{
      accountIdx: raw |> field("accountIdx", AccountIndex.decode),
      custodianId: raw |> field("custodianId", UserId.decode),
      identifier:
        raw |> field("identifier", AccountKeyChain.Identifier.decode),
      sequence: raw |> field("sequence", int),
    };
};

module Income = {
  module AddressExposed = {
    type t = {
      partnerId: userId,
      address: Address.t,
    };
    let make = (~partnerId, ~address) => {partnerId, address};
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("IncomeAddressExposed")),
          ("partnerId", UserId.encode(event.partnerId)),
          ("address", Address.encode(event.address)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        partnerId: raw |> field("partnerId", UserId.decode),
        address: raw |> field("address", Address.decode),
      };
  };
  module Detected = {
    type t = {
      address: string,
      coordinates: Address.Coordinates.t,
      txId: string,
      txOutputN: int,
      amount: BTC.t,
    };
    let make = (~txOutputN, ~coordinates, ~address, ~txId, ~amount) => {
      coordinates,
      address,
      txId,
      txOutputN,
      amount,
    };
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("IncomeDetected")),
          ("address", string(event.address)),
          ("txId", string(event.txId)),
          ("txOutputN", int(event.txOutputN)),
          ("coordinates", Address.Coordinates.encode(event.coordinates)),
          ("amount", BTC.encode(event.amount)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        address: raw |> field("address", string),
        txId: raw |> field("txId", string),
        amount: raw |> field("amount", BTC.decode),
        txOutputN: raw |> field("txOutputN", int),
        coordinates: raw |> field("coordinates", Address.Coordinates.decode),
      };
  };
  module Unlocked = {
    type t = {input: Network.txInput};
    let make = (~input) => {input: input};
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("IncomeUnlocked")),
          ("input", Network.encodeInput(event.input)),
        ])
      );
    let decode = raw =>
      Json.Decode.{input: raw |> field("input", Network.decodeInput)};
  };
};

module Transaction = {
  module Confirmed = {
    type t = {
      txId: string,
      blockHeight: float,
      unixTime: float,
    };
    let make = (~txId, ~blockHeight, ~unixTime) => {
      txId,
      blockHeight,
      unixTime,
    };
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("TransactionConfirmed")),
          ("txId", string(event.txId)),
          ("blockHeight", Utils.encodeFloat(event.blockHeight)),
          ("unixTime", Utils.encodeFloat(event.unixTime)),
        ])
      );
    let decode = raw =>
      Json.Decode.{
        txId: raw |> field("txId", string),
        blockHeight: raw |> field("blockHeight", Utils.decodeFloat),
        unixTime: raw |> field("unixTime", Utils.decodeFloat),
      };
  };
  module NoLongerDetected = {
    type t = {txId: string};
    let make = (~txId) => {txId: txId};
    let encode = event =>
      Json.Encode.(
        object_([
          ("type", string("TransactionNoLongerDetected")),
          ("txId", string(event.txId)),
        ])
      );
    let decode = raw => Json.Decode.{txId: raw |> field("txId", string)};
  };
};

type t =
  | VentureCreated(VentureCreated.t)
  | PartnerProposed(Partner.Proposed.t)
  | PartnerRejected(Partner.Rejected.t)
  | PartnerEndorsed(Partner.Endorsed.t)
  | PartnerAccepted(Partner.Accepted.t)
  | PartnerDenied(Partner.Denied.t)
  | PartnerPubKeyAdded(Partner.PubKeyAdded.t)
  | PartnerRemovalProposed(Partner.Removal.Proposed.t)
  | PartnerRemovalRejected(Partner.Removal.Rejected.t)
  | PartnerRemovalEndorsed(Partner.Removal.Endorsed.t)
  | PartnerRemovalAccepted(Partner.Removal.Accepted.t)
  | PartnerRemovalDenied(Partner.Removal.Denied.t)
  | AccountCreationProposed(AccountCreation.Proposed.t)
  | AccountCreationRejected(AccountCreation.Rejected.t)
  | AccountCreationEndorsed(AccountCreation.Endorsed.t)
  | AccountCreationAccepted(AccountCreation.Accepted.t)
  | CustodianProposed(Custodian.Proposed.t)
  | CustodianRejected(Custodian.Rejected.t)
  | CustodianEndorsed(Custodian.Endorsed.t)
  | CustodianAccepted(Custodian.Accepted.t)
  | CustodianDenied(Custodian.Denied.t)
  | CustodianRemovalProposed(Custodian.Removal.Proposed.t)
  | CustodianRemovalRejected(Custodian.Removal.Rejected.t)
  | CustodianRemovalEndorsed(Custodian.Removal.Endorsed.t)
  | CustodianRemovalAccepted(Custodian.Removal.Accepted.t)
  | CustodianRemovalDenied(Custodian.Removal.Denied.t)
  | PayoutProposed(Payout.Proposed.t)
  | PayoutRejected(Payout.Rejected.t)
  | PayoutEndorsed(Payout.Endorsed.t)
  | PayoutAccepted(Payout.Accepted.t)
  | PayoutAborted(Payout.Aborted.t)
  | PayoutDenied(Payout.Denied.t)
  | PayoutSigned(Payout.Signed.t)
  | PayoutFinalized(Payout.Finalized.t)
  | PayoutBroadcast(Payout.Broadcast.t)
  | PayoutBroadcastDuplicate(Payout.BroadcastDuplicate.t)
  | PayoutBroadcastFailed(Payout.BroadcastFailed.t)
  | CustodianKeyChainUpdated(CustodianKeyChainUpdated.t)
  | AccountKeyChainIdentified(AccountKeyChainIdentified.t)
  | AccountKeyChainActivated(AccountKeyChainActivated.t)
  | IncomeAddressExposed(Income.AddressExposed.t)
  | IncomeDetected(Income.Detected.t)
  | IncomeUnlocked(Income.Unlocked.t)
  | TransactionConfirmed(Transaction.Confirmed.t)
  | TransactionNoLongerDetected(Transaction.NoLongerDetected.t);

exception BadData(string);

let makePartnerProposed =
    (
      ~prospectPubKey=?,
      ~eligibleWhenProposing,
      ~proposerId,
      ~prospectId,
      ~lastRemovalAccepted,
      ~policy,
      _,
    ) => {
  let lastPartnerRemovalProcess =
    lastRemovalAccepted
    |> Utils.mapOption(
         ({data: {id}, processId}: Partner.Removal.Accepted.t) => {
         if (UserId.neq(id, prospectId)) {
           raise(
             BadData(
               "The provided PartnerRemovalAccepted wasn't for the same partner",
             ),
           );
         };
         processId;
       });
  let dependsOnCompletions =
    lastPartnerRemovalProcess
    |> Utils.mapOption(p => [|p|])
    |> Js.Option.getWithDefault([||]);
  PartnerProposed(
    Partner.Proposed.make(
      ~dependsOnCompletions=
        dependsOnCompletions |> Set.mergeMany(ProcessId.emptySet),
      ~eligibleWhenProposing,
      ~proposerId,
      ~policy,
      Partner.Data.{
        id: prospectId,
        pubKey: prospectPubKey,
        lastPartnerRemovalProcess,
      },
    ),
  );
};

let makePartnerRemovalProposed =
    (
      ~eligibleWhenProposing,
      ~lastPartnerAccepted: Partner.Accepted.t,
      ~proposerId,
      ~policy,
    ) =>
  PartnerRemovalProposed(
    Partner.Removal.Proposed.make(
      ~dependsOnCompletions=
        [|lastPartnerAccepted.processId|]
        |> Set.mergeMany(ProcessId.emptySet),
      ~eligibleWhenProposing,
      ~proposerId,
      ~policy,
      Partner.Removal.Data.{
        lastPartnerProcess: lastPartnerAccepted.processId,
        id: lastPartnerAccepted.data.id,
      },
    ),
  );

let makeAccountCreationProposed =
    (
      ~eligibleWhenProposing,
      ~proposerId,
      ~name,
      ~accountIdx,
      ~accountSettings,
      ~policy,
    ) =>
  AccountCreationProposed(
    AccountCreation.Proposed.make(
      ~eligibleWhenProposing,
      ~proposerId,
      ~policy,
      AccountCreation.Data.{
        settings: Some(accountSettings),
        accountIdx,
        name,
      },
    ),
  );

let makeCustodianProposed =
    (
      ~eligibleWhenProposing,
      ~lastCustodianRemovalAccepted,
      ~partnerProposed: Partner.Proposed.t,
      ~proposerId,
      ~accountIdx,
      ~policy,
    ) => {
  let {processId: partnerApprovalProcess, data: {id: partnerId}}: Partner.Proposed.t = partnerProposed;
  let lastCustodianRemovalProcess =
    lastCustodianRemovalAccepted
    |> Utils.mapOption(
         ({data: {custodianId}, processId}: Custodian.Removal.Accepted.t) => {
         if (UserId.neq(custodianId, partnerId)) {
           raise(
             BadData(
               "The provided CustodianRemovalAccepted wasn't for the same custodian",
             ),
           );
         };
         processId;
       });
  CustodianProposed(
    Custodian.Proposed.make(
      ~dependsOnProposals=
        [|partnerApprovalProcess|] |> Set.mergeMany(ProcessId.emptySet),
      ~eligibleWhenProposing,
      ~proposerId,
      ~policy,
      Custodian.Data.{
        lastCustodianRemovalProcess,
        partnerApprovalProcess,
        partnerId,
        accountIdx,
      },
    ),
  );
};

let makeCustodianRemovalProposed =
    (
      ~eligibleWhenProposing,
      ~custodianAccepted: Custodian.Accepted.t,
      ~proposerId,
      ~accountIdx,
      ~policy,
    ) => {
  let {processId: lastCustodianProcess, data: {partnerId: custodianId}}: Custodian.Accepted.t = custodianAccepted;
  CustodianRemovalProposed(
    Custodian.Removal.Proposed.make(
      ~dependsOnCompletions=
        [|lastCustodianProcess|] |> Set.mergeMany(ProcessId.emptySet),
      ~eligibleWhenProposing,
      ~proposerId,
      ~policy,
      Custodian.Removal.Data.{lastCustodianProcess, custodianId, accountIdx},
    ),
  );
};

let makePartnerRejected = (~processId, ~rejectorId) =>
  PartnerRejected(Partner.Rejected.make(~processId, ~rejectorId));

let makePartnerEndorsed = (~processId, ~supporterId) =>
  PartnerEndorsed(Partner.Endorsed.make(~processId, ~supporterId));

let makePartnerRemovalRejected = (~processId, ~rejectorId) =>
  PartnerRemovalRejected(
    Partner.Removal.Rejected.make(~processId, ~rejectorId),
  );

let makePartnerRemovalEndorsed = (~processId, ~supporterId) =>
  PartnerRemovalEndorsed(
    Partner.Removal.Endorsed.make(~processId, ~supporterId),
  );

let makeAccountCreationEndorsed = (~processId, ~supporterId) =>
  AccountCreationEndorsed(
    AccountCreation.Endorsed.make(~processId, ~supporterId),
  );

let makeCustodianRejected = (~processId, ~rejectorId) =>
  CustodianRejected(Custodian.Rejected.make(~processId, ~rejectorId));

let makeCustodianEndorsed = (~processId, ~supporterId) =>
  CustodianEndorsed(Custodian.Endorsed.make(~processId, ~supporterId));

let makeCustodianRemovalEndorsed = (~processId, ~supporterId) =>
  CustodianRemovalEndorsed(
    Custodian.Removal.Endorsed.make(~processId, ~supporterId),
  );

let makePayoutEndorsed = (~processId, ~supporterId) =>
  PayoutEndorsed(Payout.Endorsed.make(~processId, ~supporterId));

let makePayoutRejected = (~processId, ~rejectorId) =>
  PayoutRejected(Payout.Rejected.make(~processId, ~rejectorId));

let encode =
  fun
  | VentureCreated(event) => VentureCreated.encode(event)
  | PartnerProposed(event) => Partner.Proposed.encode(event)
  | PartnerRejected(event) => Partner.Rejected.encode(event)
  | PartnerEndorsed(event) => Partner.Endorsed.encode(event)
  | PartnerAccepted(event) => Partner.Accepted.encode(event)
  | PartnerDenied(event) => Partner.Denied.encode(event)
  | PartnerPubKeyAdded(event) => Partner.PubKeyAdded.encode(event)
  | PartnerRemovalProposed(event) => Partner.Removal.Proposed.encode(event)
  | PartnerRemovalRejected(event) => Partner.Removal.Rejected.encode(event)
  | PartnerRemovalEndorsed(event) => Partner.Removal.Endorsed.encode(event)
  | PartnerRemovalAccepted(event) => Partner.Removal.Accepted.encode(event)
  | PartnerRemovalDenied(event) => Partner.Removal.Denied.encode(event)
  | CustodianProposed(event) => Custodian.Proposed.encode(event)
  | CustodianRejected(event) => Custodian.Rejected.encode(event)
  | CustodianEndorsed(event) => Custodian.Endorsed.encode(event)
  | CustodianAccepted(event) => Custodian.Accepted.encode(event)
  | CustodianDenied(event) => Custodian.Denied.encode(event)
  | CustodianRemovalProposed(event) =>
    Custodian.Removal.Proposed.encode(event)
  | CustodianRemovalRejected(event) =>
    Custodian.Removal.Rejected.encode(event)
  | CustodianRemovalEndorsed(event) =>
    Custodian.Removal.Endorsed.encode(event)
  | CustodianRemovalAccepted(event) =>
    Custodian.Removal.Accepted.encode(event)
  | CustodianRemovalDenied(event) => Custodian.Removal.Denied.encode(event)
  | PayoutProposed(event) => Payout.Proposed.encode(event)
  | PayoutRejected(event) => Payout.Rejected.encode(event)
  | PayoutEndorsed(event) => Payout.Endorsed.encode(event)
  | PayoutAccepted(event) => Payout.Accepted.encode(event)
  | PayoutAborted(event) => Payout.Aborted.encode(event)
  | PayoutDenied(event) => Payout.Denied.encode(event)
  | PayoutSigned(event) => Payout.Signed.encode(event)
  | PayoutFinalized(event) => Payout.Finalized.encode(event)
  | PayoutBroadcast(event) => Payout.Broadcast.encode(event)
  | PayoutBroadcastDuplicate(event) =>
    Payout.BroadcastDuplicate.encode(event)
  | PayoutBroadcastFailed(event) => Payout.BroadcastFailed.encode(event)
  | AccountCreationProposed(event) => AccountCreation.Proposed.encode(event)
  | AccountCreationRejected(event) => AccountCreation.Rejected.encode(event)
  | AccountCreationEndorsed(event) => AccountCreation.Endorsed.encode(event)
  | AccountCreationAccepted(event) => AccountCreation.Accepted.encode(event)
  | CustodianKeyChainUpdated(event) => CustodianKeyChainUpdated.encode(event)
  | AccountKeyChainIdentified(event) =>
    AccountKeyChainIdentified.encode(event)
  | AccountKeyChainActivated(event) => AccountKeyChainActivated.encode(event)
  | IncomeAddressExposed(event) => Income.AddressExposed.encode(event)
  | IncomeDetected(event) => Income.Detected.encode(event)
  | IncomeUnlocked(event) => Income.Unlocked.encode(event)
  | TransactionConfirmed(event) => Transaction.Confirmed.encode(event);

let isSystemEvent =
  fun
  | PartnerAccepted(_)
  | PartnerDenied(_)
  | PartnerRemovalAccepted(_)
  | PartnerRemovalDenied(_)
  | AccountCreationAccepted(_)
  | CustodianAccepted(_)
  | CustodianDenied(_)
  | CustodianRemovalAccepted(_)
  | CustodianRemovalDenied(_)
  | PayoutAccepted(_)
  | PayoutDenied(_)
  | PayoutAborted(_)
  | AccountKeyChainIdentified(_)
  | IncomeDetected(_)
  | IncomeUnlocked(_)
  | TransactionConfirmed(_)
  | PayoutFinalized(_)
  | PayoutBroadcast(_)
  | PayoutBroadcastDuplicate(_)
  | PayoutBroadcastFailed(_) => true
  | _ => false;

exception UnknownEvent(Js.Json.t);

let decode = raw => {
  let type_ = raw |> Json.Decode.(field("type", string));
  switch (type_) {
  | "VentureCreated" => VentureCreated(VentureCreated.decode(raw))
  | "PartnerProposed" => PartnerProposed(Partner.Proposed.decode(raw))
  | "PartnerRejected" => PartnerRejected(Partner.Rejected.decode(raw))
  | "PartnerEndorsed" => PartnerEndorsed(Partner.Endorsed.decode(raw))
  | "PartnerAccepted" => PartnerAccepted(Partner.Accepted.decode(raw))
  | "PartnerDenied" => PartnerDenied(Partner.Denied.decode(raw))
  | "PartnerPubKeyAdded" =>
    PartnerPubKeyAdded(Partner.PubKeyAdded.decode(raw))
  | "PartnerRemovalProposed" =>
    PartnerRemovalProposed(Partner.Removal.Proposed.decode(raw))
  | "PartnerRemovalRejected" =>
    PartnerRemovalRejected(Partner.Removal.Rejected.decode(raw))
  | "PartnerRemovalEndorsed" =>
    PartnerRemovalEndorsed(Partner.Removal.Endorsed.decode(raw))
  | "PartnerRemovalAccepted" =>
    PartnerRemovalAccepted(Partner.Removal.Accepted.decode(raw))
  | "PartnerRemovalDenied" =>
    PartnerRemovalDenied(Partner.Removal.Denied.decode(raw))
  | "CustodianProposed" => CustodianProposed(Custodian.Proposed.decode(raw))
  | "CustodianRejected" => CustodianRejected(Custodian.Rejected.decode(raw))
  | "CustodianEndorsed" => CustodianEndorsed(Custodian.Endorsed.decode(raw))
  | "CustodianAccepted" => CustodianAccepted(Custodian.Accepted.decode(raw))
  | "CustodianDenied" => CustodianDenied(Custodian.Denied.decode(raw))
  | "CustodianRemovalProposed" =>
    CustodianRemovalProposed(Custodian.Removal.Proposed.decode(raw))
  | "CustodianRemovalRejected" =>
    CustodianRemovalRejected(Custodian.Removal.Rejected.decode(raw))
  | "CustodianRemovalEndorsed" =>
    CustodianRemovalEndorsed(Custodian.Removal.Endorsed.decode(raw))
  | "CustodianRemovalAccepted" =>
    CustodianRemovalAccepted(Custodian.Removal.Accepted.decode(raw))
  | "CustodianRemovalDenied" =>
    CustodianRemovalDenied(Custodian.Removal.Denied.decode(raw))
  | "PayoutProposed" => PayoutProposed(Payout.Proposed.decode(raw))
  | "PayoutRejected" => PayoutRejected(Payout.Rejected.decode(raw))
  | "PayoutEndorsed" => PayoutEndorsed(Payout.Endorsed.decode(raw))
  | "PayoutAccepted" => PayoutAccepted(Payout.Accepted.decode(raw))
  | "PayoutAborted" => PayoutAborted(Payout.Aborted.decode(raw))
  | "PayoutDenied" => PayoutDenied(Payout.Denied.decode(raw))
  | "PayoutSigned" => PayoutSigned(Payout.Signed.decode(raw))
  | "PayoutBroadcast" => PayoutBroadcast(Payout.Broadcast.decode(raw))
  | "PayoutFinalized" => PayoutFinalized(Payout.Finalized.decode(raw))
  | "PayoutBroadcastDuplicate" =>
    PayoutBroadcastDuplicate(Payout.BroadcastDuplicate.decode(raw))
  | "PayoutBroadcastFailed" =>
    PayoutBroadcastFailed(Payout.BroadcastFailed.decode(raw))
  | "AccountCreationProposed" =>
    AccountCreationProposed(AccountCreation.Proposed.decode(raw))
  | "AccountCreationRejected" =>
    AccountCreationRejected(AccountCreation.Rejected.decode(raw))
  | "AccountCreationEndorsed" =>
    AccountCreationEndorsed(AccountCreation.Endorsed.decode(raw))
  | "AccountCreationAccepted" =>
    AccountCreationAccepted(AccountCreation.Accepted.decode(raw))
  | "CustodianKeyChainUpdated" =>
    CustodianKeyChainUpdated(CustodianKeyChainUpdated.decode(raw))
  | "AccountKeyChainIdentified" =>
    AccountKeyChainIdentified(AccountKeyChainIdentified.decode(raw))
  | "AccountKeyChainActivated" =>
    AccountKeyChainActivated(AccountKeyChainActivated.decode(raw))
  | "IncomeAddressExposed" =>
    IncomeAddressExposed(Income.AddressExposed.decode(raw))
  | "IncomeDetected" => IncomeDetected(Income.Detected.decode(raw))
  | "IncomeUnlocked" => IncomeUnlocked(Income.Unlocked.decode(raw))
  | "TransactionConfirmed" =>
    TransactionConfirmed(Transaction.Confirmed.decode(raw))
  | _ => raise(UnknownEvent(raw))
  };
};

let getIncomeAddressExposedExn = event =>
  switch (event) {
  | IncomeAddressExposed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getIncomeAddressExposedExn"
  };

let getAccountKeyChainIdentifiedExn = event =>
  switch (event) {
  | AccountKeyChainIdentified(unwrapped) => unwrapped
  | _ =>
    %assert
    "getAccountKeyChainIdentifiedExn"
  };

let getAccountKeyChainActivatedExn = event =>
  switch (event) {
  | AccountKeyChainActivated(unwrapped) => unwrapped
  | _ =>
    %assert
    "getAccountKeyChainActivatedExn"
  };

let getCustodianKeyChainUpdatedExn = event =>
  switch (event) {
  | CustodianKeyChainUpdated(unwrapped) => unwrapped
  | _ =>
    %assert
    "getCustodianKeyChainUpdatedExn"
  };

let getPayoutBroadcastFailedExn = event =>
  switch (event) {
  | PayoutBroadcastFailed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPayoutBroadcastFailedExn"
  };

let getPayoutBroadcastExn = event =>
  switch (event) {
  | PayoutBroadcast(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPayoutBroadcastExn"
  };

let getPayoutSignedExn = event =>
  switch (event) {
  | PayoutSigned(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPayoutSignedExn"
  };

let getPayoutAcceptedExn = event =>
  switch (event) {
  | PayoutAccepted(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPayoutAcceptedExn"
  };

let getPayoutEndorsedExn = event =>
  switch (event) {
  | PayoutEndorsed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPayoutEndorsedExn"
  };

let getPayoutProposedExn = event =>
  switch (event) {
  | PayoutProposed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPayoutProposedExn"
  };

let getCustodianAcceptedExn = event =>
  switch (event) {
  | CustodianAccepted(unwrapped) => unwrapped
  | _ =>
    %assert
    "getCustodianAcceptedExn"
  };

let getCustodianEndorsedExn = event =>
  switch (event) {
  | CustodianEndorsed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getCustodianEndorsedExn"
  };

let getCustodianRejectedExn = event =>
  switch (event) {
  | CustodianRejected(unwrapped) => unwrapped
  | _ =>
    %assert
    "getCustodianRejectedExn"
  };

let getCustodianProposedExn = event =>
  switch (event) {
  | CustodianProposed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getCustodianProposedExn"
  };

let getAccountCreationAcceptedExn = event =>
  switch (event) {
  | AccountCreationAccepted(unwrapped) => unwrapped
  | _ =>
    %assert
    "getAccountCreationAcceptedExn"
  };

let getAccountCreationEndorsedExn = event =>
  switch (event) {
  | AccountCreationEndorsed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getAccountCreationEndorsedExn"
  };

let getAccountCreationProposedExn = event =>
  switch (event) {
  | AccountCreationProposed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getAccountCreationProposedExn"
  };

let getPartnerAcceptedExn = event =>
  switch (event) {
  | PartnerAccepted(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPartnerAcceptedExn"
  };

let getPartnerRejectedExn = event =>
  switch (event) {
  | PartnerRejected(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPartnerRejectedExn"
  };

let getPartnerEndorsedExn = event =>
  switch (event) {
  | PartnerEndorsed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPartnerEndorsedExn"
  };

let getPartnerProposedExn = event =>
  switch (event) {
  | PartnerProposed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPartnerProposedExn"
  };

let getPartnerRemovalAcceptedExn = event =>
  switch (event) {
  | PartnerRemovalAccepted(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPartnerRemovalAcceptedExn"
  };

let getPartnerRemovalEndorsedExn = event =>
  switch (event) {
  | PartnerRemovalEndorsed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPartnerRemovalEndorsedExn"
  };

let getPartnerRemovalProposedExn = event =>
  switch (event) {
  | PartnerRemovalProposed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getPartnerRemovalProposedExn"
  };

let getCustodianRemovalProposedExn = event =>
  switch (event) {
  | CustodianRemovalProposed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getCustodianRemovalProposedExn"
  };

let getCustodianRemovalEndorsedExn = event =>
  switch (event) {
  | CustodianRemovalEndorsed(unwrapped) => unwrapped
  | _ =>
    %assert
    "getCustodianRemovalEndorsedExn"
  };

let getVentureCreatedExn = event =>
  switch (event) {
  | VentureCreated(unwrapped) => unwrapped
  | _ =>
    %assert
    "getVentureCreatedExn"
  };
