import { Player } from "../Player";
import State from "./State";
import playerByColor from "./playerByColor";
import activeColor from "./activeColor";

const activePlayer = (state: State): Player =>
  playerByColor(activeColor(state))(state);

export default activePlayer;
