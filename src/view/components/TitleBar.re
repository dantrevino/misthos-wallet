let component = ReasonReact.statelessComponent("TitleBar");

let make = children => {
  ...component,
  render: _self =>
    <MaterialUi.WithStyles
      classes=[
        {
          name: "title",
          styles: ReactDOMRe.Style.make(~backgroundColor="#000000", ()),
        },
        {
          name: "gradient",
          styles:
            ReactDOMRe.Style.make(
              ~height="4px",
              ~backgroundImage=
                "linear-gradient(to right, #59f7f0, #02a2b4 28%, #067781 57%, #ff006d 80%, #f65e25)",
              (),
            ),
        },
      ]
      render=(
        classes =>
          MaterialUi.(
            <Grid className=classes##title item=true xs=V12>
              (ReasonReact.arrayToElement(children))
              <div className=classes##gradient />
            </Grid>
          )
      )
    />,
};