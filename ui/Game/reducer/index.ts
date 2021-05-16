import { Reducer } from "react";
import * as O from "../../../Onitama";
import { State, waiting } from "../State";
import { Action, CancelButtonClicked, ConfirmButtonClicked } from "../Action";
import handleActionClicked from "./handleActionClicked";
import handleCellClicked from "./handleCellClicked";

const handleConfirmButtonClicked: Reducer<State, ConfirmButtonClicked> = (
  state,
) => {
  if (state._tag !== "PieceActionTargetSelected") return state;

  const result = O.State.performMove(
    state.piece,
    state.action,
    state.target,
  )(state.game);

  console.log(result);

  if (result._tag === "Right") return waiting(result.right);

  return state;
};

const handleCancelButtonClicked: Reducer<State, CancelButtonClicked> = (
  state,
) => {
  return waiting(state.game);
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action._tag) {
    case "CellClicked":
      return handleCellClicked(state, action);

    case "ActionClicked":
      return handleActionClicked(state, action);

    case "ConfirmButtonClicked":
      return handleConfirmButtonClicked(state, action);

    case "CancelButtonClicked":
      return handleCancelButtonClicked(state, action);
  }
};

export default reducer;
