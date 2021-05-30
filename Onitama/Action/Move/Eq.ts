import * as E from "fp-ts/lib/Eq";
import * as D from "../Delta";
import Move from "./Move";

const Eq: E.Eq<Move> = E.tuple(D.Eq, D.Eq);

export default Eq;
