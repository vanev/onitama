import * as E from "fp-ts/lib/Eq";
import * as S from "fp-ts/lib/string";
import * as N from "fp-ts/lib/number";
import Position from "./Position";

const Eq: E.Eq<Position> = E.tuple(S.Eq, N.Eq);

export default Eq;
