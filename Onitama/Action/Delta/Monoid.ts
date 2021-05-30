import * as M from "fp-ts/lib/Monoid";
import Delta from "./Delta";
import Semigroup from "./Semigroup";

const Monoid: M.Monoid<Delta> = {
  ...Semigroup,
  empty: 0,
};

export default Monoid;
