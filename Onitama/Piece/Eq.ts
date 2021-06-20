import * as E from "fp-ts/lib/Eq";
import * as Active from "./Active";
import * as Captured from "./Captured";
import isActive from "./isActive";
import isCaptured from "./isCaptured";
import Piece from "./Piece";

const Eq: E.Eq<Piece> = {
  equals: (a, b) => {
    if (isActive(a) && isActive(b)) return Active.Eq.equals(a, b);

    if (isCaptured(a) && isCaptured(b)) return Captured.Eq.equals(a, b);

    return false;
  },
};

export default Eq;
