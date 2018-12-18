open Belt;

open Event;

open PrimitiveTypes;

type state = {
  eligibilityCollector: EligibilityCollector.t,
  endorsements: UserId.set,
  rejections: UserId.set,
  policy: Policy.t,
  systemIssuer: Bitcoin.ECPair.t,
};

let make = (proposal: Payout.Proposed.t, log) => {
  let process = {
    val state =
      ref({
        eligibilityCollector:
          EligibilityCollector.make(proposal.eligibleWhenProposing),
        endorsements: UserId.emptySet,
        rejections: UserId.emptySet,
        policy: proposal.policy,
        systemIssuer: Bitcoin.ECPair.makeRandom(),
      });
    val completed = ref(false);
    val result = ref(None);
    pub receive = ({event}: EventLog.item) => {
      let _ignoreThisWarning = this;
      state :=
        {
          ...state^,
          eligibilityCollector:
            state^.eligibilityCollector |> EligibilityCollector.apply(event),
        };
      state :=
        (
          switch (event) {
          | VentureCreated(event) => {
              ...state^,
              systemIssuer: event.systemIssuer,
            }
          | PayoutEndorsed(event)
              when ProcessId.eq(event.processId, proposal.processId) => {
              ...state^,
              endorsements: state^.endorsements->(Set.add(event.supporterId)),
            }
          | PayoutRejected(event)
              when ProcessId.eq(event.processId, proposal.processId) => {
              ...state^,
              rejections: state^.rejections->(Set.add(event.rejectorId)),
            }
          | PayoutAccepted(event)
              when ProcessId.eq(event.processId, proposal.processId) =>
            completed := true;
            state^;
          | PayoutAborted(event)
              when ProcessId.eq(event.processId, proposal.processId) =>
            completed := true;
            state^;
          | PayoutDenied(event)
              when ProcessId.eq(event.processId, proposal.processId) =>
            completed := true;
            state^;
          | _ => state^
          }
        );
      result :=
        (
          switch (
            completed^,
            state^.policy
            |> Policy.canBeFulfilled(
                 ~eligible=
                   state^.eligibilityCollector
                   |> EligibilityCollector.currentEligible,
                 ~rejected=state^.rejections,
               ),
            state^.policy
            |> Policy.fulfilled(
                 ~eligible=
                   state^.eligibilityCollector
                   |> EligibilityCollector.currentEligible,
                 ~endorsed=state^.endorsements,
               ),
          ) {
          | (true, _, _) => None
          | (_, false, _) =>
            Some((
              state^.systemIssuer,
              PayoutDenied(Payout.Denied.fromProposal(proposal)),
            ))
          | (_, _, true) =>
            Some((
              state^.systemIssuer,
              PayoutAccepted(Payout.Accepted.fromProposal(proposal)),
            ))
          | _ => None
          }
        );
    };
    pub processCompleted = () => completed^;
    pub pendingEvent = () => result^
  };
  log |> EventLog.reduce((_, item) => process#receive(item), ());
  process;
};
