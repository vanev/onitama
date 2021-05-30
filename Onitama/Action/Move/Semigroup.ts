import * as S from "fp-ts/lib/Semigroup";
import * as D from "../Delta";
import Move from "./Move";

const Semigroup: S.Semigroup<Move> = S.tuple(D.Semigroup, D.Semigroup);

export default Semigroup;
