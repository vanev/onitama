import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { Color } from "../Color";
import { Move } from "./Move";

type Action = {
  name: string;
  moves: NonEmptyArray<Move>;
  color: Color;
};

export const action = (
  name: string,
  moves: NonEmptyArray<Move>,
  color: Color,
): Action => ({
  name,
  moves,
  color,
});

export default Action;
