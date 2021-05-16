import { NonEmptyArray, getEq } from "fp-ts/NonEmptyArray";
import * as E from "fp-ts/lib/Eq";
import * as S from "fp-ts/lib/string";
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

export const Eq: E.Eq<Action> = E.struct({
  name: S.Eq,
  moves: getEq(Move.Eq),
  color: S.Eq,
});

export default Action;
