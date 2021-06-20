import { findFirst } from "fp-ts/lib/Array";
import { flow } from "fp-ts/lib/function";
import { isSome } from "fp-ts/lib/Option";
import { Action, Eq } from "../Action";
import { actions } from "./Actions";
import Player from "./Player";

const hasAction = (action: Action): ((player: Player) => boolean) =>
  flow(
    actions,
    findFirst((playerAction) => Eq.equals(playerAction, action)),
    isSome,
  );

export default hasAction;
