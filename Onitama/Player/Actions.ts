import { Action } from "../Action";
import Player from "./Player";

type Actions = [Action, Action];

export const actions = (player: Player): Actions => player.actions;

export default Actions;
