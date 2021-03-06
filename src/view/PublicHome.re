include ViewCommon;

let component = ReasonReact.statelessComponent("PublicHome");

module Styles = {
  open Css;
  open BreakPoints;

  let grid =
    style([
      display(grid),
      xs([
        height(`auto),
        unsafe("gridTemplateColumns", "[begin] 0px 1fr 0px [end]"),
        unsafe(
          "gridTemplateAreas",
          {|
           ". . ."
           ". title ."
           ". sub ."
           ". button ."
           ". . ."
           |},
        ),
        unsafe(
          "gridTemplateRows",
          "[begin] auto min-content [end] min-content min-content auto",
        ),
        gridGap(px(Theme.space(2))),
      ]),
      sm([
        height(`vh(90.0)),
        unsafe("gridTemplateColumns", "[begin] 1fr 6fr 1fr [end]"),
        gridGap(px(Theme.space(5))),
      ]),
      md([
        height(`vh(90.0)),
        unsafe(
          "gridTemplateAreas",
          {|
           ". . . ."
           ". title title ."
           ". sub button ."
           ". . . ."
           |},
        ),
        unsafe("gridTemplateColumns", "[begin] 1fr 7fr 5fr 1fr [end]"),
        unsafe(
          "gridTemplateRows",
          "[begin] auto min-content [end] min-content auto",
        ),
      ]),
      width(`percent(100.0)),
      alignItems(`flexEnd),
    ]);
  let logo =
    style([
      backgroundImage(url(Icons.asDataUrl(Icons.logoBig))),
      backgroundRepeat(noRepeat),
      alignSelf(`stretch),
      xs([unsafe("backgroundSize", "auto 50%")]),
      sm([unsafe("backgroundSize", "auto 100%")]),
      unsafe("gridColumn", "begin / end"),
      unsafe("gridRow", "begin / end"),
    ]);

  let area = area => style([unsafe("gridArea", area), minHeight(px(0))]);

  let title =
    style([
      lineHeight(`abs(0.92)),
      xs([fontSize(px(60))]),
      sm([fontSize(px(72))]),
      lg([fontSize(px(124))]),
    ]);
};

let make = (~onSignIn, _children) => {
  ...component,
  render: _self =>
    MaterialUi.(
      <div>
        <div className=Styles.grid>
          <div className=Styles.logo />
          <Typography
            className={Styles.area("title") ++ " " ++ Styles.title}
            variant=`Display4>
            {"Distribute Funds" |> text}
            <br />
            {"with Misthos." |> text}
          </Typography>
          <Typography className={Styles.area("sub")} variant=`Display1>
            {
              "Misthos is the most advanced multisig bitcoin wallet for businesses, emphasizing frictionless setup, low risk and streamlined collaboration."
              |> text
            }
            <br />
            <br />
            {"Use it for projects. Use it for payments." |> text}
          </Typography>
          <div className={Styles.area("button")}>
            <MButton
              color=`Inherit gutterTop=false onClick=onSignIn fullWidth=true>
              <SvgIcon className=Css.(style([marginRight(px(16))]))>
                Icons.blockStack
              </SvgIcon>
              {"Sign In with Blockstack" |> text}
            </MButton>
            <ContactUsShoutOut gutterBottom=false />
          </div>
        </div>
      </div>
    ),
};
