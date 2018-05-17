open PrimitiveTypes;

open Event;

type t = {
  ventureName: string,
  systemIssuer: Bitcoin.ECPair.t,
  policies: list((string, Policy.t)),
  partnerIds: list(userId),
  custodianProcesses: list((processId, processId)),
  partnerRemovalProcesses: list((processId, userId)),
  custodianRemovalProcesses: list((userId, processId)),
  custodianAccepted: list((userId, Custodian.Accepted.t)),
  partnerRemovals: list((userId, Partner.Removal.Accepted.t)),
  custodianRemovals: list((userId, Custodian.Removal.Accepted.t)),
  partnerAccepted: list((userId, Partner.Accepted.t)),
};

let make = () => {
  ventureName: "",
  systemIssuer: Bitcoin.ECPair.makeRandom(),
  policies: [],
  partnerIds: [],
  custodianProcesses: [],
  partnerRemovalProcesses: [],
  custodianRemovalProcesses: [],
  custodianAccepted: [],
  partnerRemovals: [],
  custodianRemovals: [],
  partnerAccepted: [],
};

let systemIssuer = ({systemIssuer}) => systemIssuer;

let ventureName = ({ventureName}) => ventureName;

let currentPartners = ({partnerIds}) => partnerIds |> Array.of_list;

let currentPolicy = (processName, {policies}) =>
  policies |> List.assoc(processName);

let isPartner = (id, {partnerIds}) => partnerIds |> List.mem(id);

let custodianProcessForPartnerProcess = (processId, {custodianProcesses}) =>
  custodianProcesses
  |> List.find(((_, partnerProcess)) =>
       ProcessId.eq(processId, partnerProcess)
     )
  |> fst;

let custodianAcceptedFor = (partnerId, {custodianAccepted}) =>
  try (Some(custodianAccepted |> List.assoc(partnerId))) {
  | Not_found => None
  };

let custodianRemovalProcessForPartnerRemovalProcess =
    (processId, {custodianRemovalProcesses, partnerRemovalProcesses}) =>
  try (
    {
      let custodianId = partnerRemovalProcesses |> List.assoc(processId);
      Some(custodianRemovalProcesses |> List.assoc(custodianId));
    }
  ) {
  | Not_found => None
  };

let lastRemovalOfPartner = (partnerId, {partnerRemovals}) =>
  try (Some(partnerRemovals |> List.assoc(partnerId))) {
  | Not_found => None
  };

let lastRemovalOfCustodian = (partnerId, {custodianRemovals}) =>
  try (Some(custodianRemovals |> List.assoc(partnerId))) {
  | Not_found => None
  };

let lastPartnerAccepted = (partnerId, {partnerAccepted}) => {
  Js.log("here");
  let ret = partnerAccepted |> List.assoc(partnerId);
  Js.log("there");
  ret;
};

let apply = (event, state) =>
  switch (event) {
  | VentureCreated({ventureName, metaPolicy, systemIssuer}) => {
      ...state,
      ventureName,
      systemIssuer,
      policies: [
        (Partner.Removal.processName, Policy.UnanimousMinusOne),
        (Custodian.Removal.processName, Policy.UnanimousMinusOne),
        ...[
             Partner.processName,
             AccountCreation.processName,
             Custodian.processName,
             Payout.processName,
           ]
           |> List.map(n => (n, metaPolicy)),
      ],
    }
  | PartnerAccepted({data: {id}} as event) => {
      ...state,
      partnerIds: [id, ...state.partnerIds],
      partnerAccepted: [(id, event), ...state.partnerAccepted],
    }
  | CustodianProposed({processId, data: {partnerApprovalProcess}}) => {
      ...state,
      custodianProcesses: [
        (processId, partnerApprovalProcess),
        ...state.custodianProcesses,
      ],
    }
  | CustodianAccepted({data: {partnerId}} as event) => {
      ...state,
      custodianAccepted: [(partnerId, event), ...state.custodianAccepted],
    }
  | PartnerRemovalProposed({processId, data: {id}}) => {
      ...state,
      partnerRemovalProcesses: [
        (processId, id),
        ...state.partnerRemovalProcesses,
      ],
    }
  | CustodianRemovalProposed({processId, data: {custodianId}}) => {
      ...state,
      custodianRemovalProcesses: [
        (custodianId, processId),
        ...state.custodianRemovalProcesses,
      ],
    }
  | CustodianRemovalAccepted(
      {data: {custodianId, lastCustodianProcess}} as event,
    ) => {
      ...state,
      custodianRemovals: [(custodianId, event)],
      custodianAccepted:
        state.custodianAccepted
        |> List.filter(((_, {processId}: Custodian.Accepted.t)) =>
             ProcessId.neq(processId, lastCustodianProcess)
           ),
    }
  | PartnerRemovalAccepted({data: {id}} as event) => {
      ...state,
      partnerIds: state.partnerIds |> List.filter(UserId.neq(id)),
      partnerRemovals: [(id, event), ...state.partnerRemovals],
    }
  | _ => state
  };
