import * as Action from "../Action";
import * as Player from "../Player";
import * as Color from "../Color";

type State = {
  blue: Player.Player;
  red: Player.Player;
  sideboard: Action.Action;
  activeColor: Color.Color;
};

export default State;
