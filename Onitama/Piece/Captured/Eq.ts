import * as E from "fp-ts/lib/Eq";
import * as S from "fp-ts/lib/string";
import Captured from "./Captured";

const Eq = E.struct<Captured>({
  _tag: S.Eq,
  color: S.Eq,
});

export default Eq;
