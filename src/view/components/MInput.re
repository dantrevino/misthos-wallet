include ViewCommon;

let component = ReasonReact.statelessComponent("MInput");

module Styles = {
  open Css;
  let margin = (~tf, ~bf) =>
    style([
      marginTop(px(Theme.space(tf))),
      marginBottom(px(Theme.space(bf))),
    ]);

  let inputRoot = style([fontSize(px(14))]);
};

let make =
    (
      ~placeholder=?,
      ~value=?,
      ~onChange=?,
      ~autoFocus=?,
      ~fullWidth=?,
      ~endAdornment=?,
      ~error=?,
      ~name=?,
      ~inputProps=?,
      ~_type=?,
      ~ensuring=false,
      _children,
    ) => {
  ...component,
  render: _self => {
    let (error, message) =
      switch (error) {
      | Some(message) => (true, message)
      | None => (false, "")
      };
    MaterialUi.(
      <FormControl
        ?fullWidth
        className=(Styles.margin(~tf=ensuring ? 4 : 3, ~bf=0))
        error>
        <Input
          ?inputProps
          ?placeholder
          ?value
          ?onChange
          ?autoFocus
          ?endAdornment
          ?name
          ?_type
          classes=[Root(Styles.inputRoot)]
        />
        (
          error ?
            <FormHelperText> (message |> text) </FormHelperText> :
            ReasonReact.null
        )
      </FormControl>
    );
  },
};
