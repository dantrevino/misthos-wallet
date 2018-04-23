let component = ReasonReact.statelessComponent("Drawer");

module Styles = {
  open Css;
  let container = style([display(`flex), flexDirection(column)]);
  let flex_ = style([flex(1)]);
};

let make = (~onSignOut, ~index, ~selected=?, _children) => {
  ...component,
  render: _self =>
    MaterialUi.(
      <div className=Styles.container>
        <VentureList ?selected index />
        <div className=Styles.flex_ />
        <LinkButton route=CreateVenture>
          ("Create a Venture" |> ReasonReact.stringToElement)
        </LinkButton>
        <div className=Styles.flex_ />
        <Button color=`Inherit onClick=onSignOut> "Sign Out" </Button>
      </div>
    ),
};
