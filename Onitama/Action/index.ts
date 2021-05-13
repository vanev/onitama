import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import Color from "../Color";
import * as Delta from "./Delta";
import * as Move from "./Move";

export { Delta, Move };

export type Action = {
  name: string;
  moves: NonEmptyArray<Move.Move>;
  color: Color;
};

export const action = (
  name: string,
  moves: NonEmptyArray<Move.Move>,
  color: Color,
): Action => ({
  name,
  moves,
  color,
});

export default Action;
