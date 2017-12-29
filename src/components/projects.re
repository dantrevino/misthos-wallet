open Project;

type asyncAction =
  | None
  | LoadingIndex
  | CreatingProject(string);

type state = {
  asyncAction,
  index: Project.index,
  newProject: string
};

type action =
  | IndexLoaded(Project.index)
  | ChangeNewProject(string)
  | AddProject;

let component = ReasonReact.reducerComponent("Projects");

let changeNewProject = (event) =>
  ChangeNewProject(ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value);

let addProject = (_) => AddProject;

let make = (_children) => {
  ...component,
  initialState: () => {newProject: "", asyncAction: LoadingIndex, index: []},
  didMount: ({reduce}) => {
    Js.Promise.(
      Project.loadIndex() |> then_((index) => reduce(() => IndexLoaded(index), ()) |> resolve)
    )
    |> ignore;
    ReasonReact.NoUpdate
  },
  reducer: (action, state) =>
    switch action {
    | IndexLoaded(index) => ReasonReact.Update({...state, asyncAction: None, index})
    | ChangeNewProject(text) => ReasonReact.Update({...state, newProject: text})
    | AddProject =>
      switch (String.trim(state.newProject)) {
      | "" => ReasonReact.NoUpdate
      | nonEmptyValue =>
        ReasonReact.UpdateWithSideEffects(
          {...state, asyncAction: CreatingProject(nonEmptyValue), newProject: ""},
          (
            (self) =>
              Project.createProject(nonEmptyValue)
              |> Js.Promise.(
                   then_((newIndex) => self.reduce(() => IndexLoaded(newIndex), ()) |> resolve)
                 )
              |> ignore
          )
        )
      }
    },
  render: ({reduce, state}) => {
    let projectList =
      ReasonReact.arrayToElement(
        Array.of_list(
          (
            switch state.asyncAction {
            | LoadingIndex => []
            | CreatingProject(newProject) => [
                (newProject, "new"),
                ...state.index |> List.map(({name, id}) => (name, id))
              ]
            | None => state.index |> List.map(({name, id}) => (name, id))
            }
          )
          |> List.map(((name, id)) => <ul key=id> (ReasonReact.stringToElement(name)) </ul>)
        )
      );
    <div>
      projectList
      <input
        placeholder="Create new Project"
        value=state.newProject
        onChange=(reduce(changeNewProject))
        autoFocus=Js.true_
      />
      <button onClick=(reduce(addProject))> (ReasonReact.stringToElement("Add")) </button>
    </div>
  }
};
