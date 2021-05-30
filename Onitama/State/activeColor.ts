import { Color } from "../Color";
import State from "./State";

const activeColor = (state: State): Color => state.activeColor;

export default activeColor;
