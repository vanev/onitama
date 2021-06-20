import * as E from "fp-ts/lib/Eq";
import * as B from "fp-ts/lib/boolean";
import * as S from "fp-ts/lib/string";
import { Position } from "../../Board";
import Active from "./Active";

const Eq: E.Eq<Active> = E.struct<Active>({
  _tag: S.Eq,
  position: Position.Eq,
  isKing: B.Eq,
  color: S.Eq,
});

export default Eq;
