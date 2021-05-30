import { Action } from "../Action";
import { initialBlue, initialRed } from "../Player";
import State from "./State";

const initial = ([actionA, actionB, actionC, actionD, actionE]: [
  Action,
  Action,
  Action,
  Action,
  Action,
]): State => ({
  blue: initialBlue([actionA, actionB]),
  red: initialRed([actionC, actionD]),
  sideboard: actionE,
  activeColor: actionE.color,
});

export default initial;
