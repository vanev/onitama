import { Color } from "../Color";
import { Player } from "../Player";
import State from "./State";

const playerByColor =
  (color: Color) =>
  (state: State): Player =>
    state[color];

export default playerByColor;
