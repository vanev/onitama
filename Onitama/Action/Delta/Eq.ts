import * as E from "fp-ts/lib/Eq";
import * as N from "fp-ts/lib/number";
import Delta from "./Delta";

const Eq: E.Eq<Delta> = N.Eq;

export default Eq;
