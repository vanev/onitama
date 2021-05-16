import * as O from "../../../Onitama";
import * as State from "../State";
import * as Action from "../Action";

const isActivePlayerAction =
  (targetAction: O.Action.Action) =>
  (state: State.State): boolean => {
    const gameState = State.game(state);
    const activePlayer = O.State.activePlayer(gameState);
    const actions = O.Player.actions(activePlayer);
    return actions.some((action) => targetAction.name === action.name);
  };

const handleActionClicked = (
  state: State.State,
  action: Action.ActionClicked,
): State.State => {
  if (!isActivePlayerAction(action.action)(state)) return state;

  switch (state._tag) {
    case "Waiting":
    case "ActionSelected":
      return State.actionSelected(action.action, state.game);

    case "PieceSelected":
    case "PieceAndActionSelected":
    case "PieceActionTargetSelected":
      return State.pieceAndActionSelected(
        state.piece,
        action.action,
        state.game,
      );
  }
};

export default handleActionClicked;
