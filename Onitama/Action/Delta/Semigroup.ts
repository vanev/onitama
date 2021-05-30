import * as S from "fp-ts/lib/Semigroup";
import Delta from "./Delta";
import fromNumber from "./fromNumber";

const Semigroup: S.Semigroup<Delta> = {
  concat: (x, y) => fromNumber(x + y),
};

export default Semigroup;
