import * as E from "fp-ts/lib/Eq";
import * as N from "fp-ts/lib/NonEmptyArray";
import * as S from "fp-ts/lib/string";
import * as M from "./Move";
import Action from "./Action";

const Eq: E.Eq<Action> = E.struct({
  name: S.Eq,
  moves: N.getEq(M.Eq),
  color: S.Eq,
});

export default Eq;
