import * as Action from "../Action";
import * as Player from "../Player";
import * as Color from "../Color";
import * as Piece from "../Piece";
import performMove from "./performMove";

export type State = {
  blue: Player.Player;
  red: Player.Player;
  sideboard: Action.Action;
  activeColor: Color.Color;
};

export const initial = ([actionA, actionB, actionC, actionD, actionE]: [
  Action.Action,
  Action.Action,
  Action.Action,
  Action.Action,
  Action.Action,
]): State => ({
  blue: Player.initialBlue([actionA, actionB]),
  red: Player.initialRed([actionC, actionD]),
  sideboard: actionE,
  activeColor: actionE.color,
});

export const activeColor = (state: State): Color.Color => state.activeColor;

export const sideboard = (state: State): Action.Action => state.sideboard;

export const getPlayerByColor =
  (color: Color.Color) =>
  (state: State): Player.Player =>
    state[color];

export const activePlayer = (state: State): Player.Player =>
  getPlayerByColor(activeColor(state))(state);

export { performMove };

export default State;
