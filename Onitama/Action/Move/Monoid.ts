import * as M from "fp-ts/lib/Monoid";
import * as D from "../Delta";
import Move from "./Move";

const Monoid: M.Monoid<Move> = M.tuple(D.Monoid, D.Monoid);

export default Monoid;
