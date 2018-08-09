open Belt;

include ViewCommon;

module ViewData = ViewModel.VentureSettingsView;

module Styles = {
  open Css;
  let atRiskKeyStatus = style([color(Colors.error)]);
};

let component = ReasonReact.statelessComponent("VentureSettings");
let make =
    (
      ~viewData: ViewData.t,
      ~commands: CommandExecutor.commands,
      ~cmdStatus,
      _children,
    ) => {
  let executeSubmit = () => {
    commands.preSubmit(
      "Please connect your ledger device and open the BTC app",
    );
    Js.Promise.(
      viewData.getCustodianKeyChain()
      |> then_(
           fun
           | Ledger.Ok(keyChain) =>
             commands.submitCustodianKeyChain(~keyChain) |> resolve
           | WrongDevice =>
             commands.preSubmitError("This device has the wrong seed")
             |> resolve
           | Ledger.Error(Message(message)) =>
             commands.preSubmitError(message) |> resolve
           | Error(Unknown) =>
             commands.preSubmitError("An unknown error has occured")
             |> resolve,
         )
    )
    |> ignore;
  };
  {
    ...component,
    render: _ => {
      let (ledgerIntegrater, keyStatus) =
        switch (viewData.ledgerId, viewData.ledgerUpToDate) {
        | (Some(_), true) => (
            "You have integrated your ledger device.",
            "Up to date",
          )
        | (Some(_), false) => (
            "You have integrated your ledger device.",
            "Needs rotating",
          )
        | _ => (
            "You currently have no ledger device integrated into this venture.",
            "Not submitted",
          )
        };
      let nSigs =
        AccountSettings.defaultCoSignerList
        |. Array.mapWithIndexU((. idx, nCoSigners) =>
             MaterialUi.(
               <TableRow>
                 <TableCell>
                   <MTypography variant=`Body2>
                     (string_of_int(idx) |> text)
                   </MTypography>
                 </TableCell>
                 <TableCell>
                   <MTypography variant=`Body2>
                     (
                       string_of_int(nCoSigners)
                       ++ "-of-"
                       ++ string_of_int(idx)
                       |> text
                     )
                   </MTypography>
                 </TableCell>
               </TableRow>
             )
           )
        |. Array.slice(~offset=1, ~len=10)
        |> ReasonReact.array;
      let needsKeyRotation =
        ! viewData.ledgerUpToDate && viewData.ledgerId |> Js.Option.isSome;
      <Grid
        title1=("Venture Settings" |> text)
        area3={
          <div className=ScrollList.containerStyles>
            <ScrollList>
              <MTypography variant=`Title gutterBottom=true>
                ("Wallet Settings" |> text)
              </MTypography>
              <MTypography variant=`Body2>
                ("Degrading multisig is enabled." |> text)
              </MTypography>
              <MTypography variant=`Body2 gutterBottom=true>
                (
                  "The unlock time is "
                  ++ string_of_int(AccountSettings.defaultSequence)
                  ++ " blocks (approximately "
                  ++ string_of_int(AccountSettings.defaultSequence / 144)
                  ++ " days)."
                  |> text
                )
              </MTypography>
              <MTypography variant=`Body2 gutterBottom=true>
                (
                  "Here is an overview of the required signatures depending on the number of Custodians backing an address:"
                  |> text
                )
              </MTypography>
              MaterialUi.(
                <Table>
                  <TableHead>
                    <TableRow key="header">
                      <TableCell>
                        <MTypography variant=`Body2>
                          ("Number of Partners" |> text)
                        </MTypography>
                      </TableCell>
                      <TableCell>
                        <MTypography variant=`Body2>
                          ("Signatures Required" |> text)
                        </MTypography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody> nSigs </TableBody>
                </Table>
              )
            </ScrollList>
          </div>
        }
        area4={
          <div>
            <MTypography variant=`Title gutterBottom=true>
              ("Hardware Wallet Settings" |> text)
            </MTypography>
            <MTypography variant=`Body2 gutterBottom=true>
              (ledgerIntegrater |> text)
            </MTypography>
            <MTypography variant=`Body2>
              ("Key status: " |> text)
              <span className=(needsKeyRotation ? Styles.atRiskKeyStatus : "")>
                (keyStatus |> text)
              </span>
            </MTypography>
            (
              viewData.ledgerUpToDate && viewData.ledgerId |> Js.Option.isSome ?
                ReasonReact.null :
                <SingleActionButton
                  onSubmit=executeSubmit
                  canSubmitAction=true
                  withConfirmation=false
                  action=CommandExecutor.Status.SubmitKeys
                  buttonText="Submit public keys"
                  cmdStatus
                />
            )
          </div>
        }
      />;
    },
  };
};