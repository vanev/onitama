import * as S from "fp-ts/lib/Show";
import * as N from "fp-ts/lib/number";
import Delta from "./Delta";

const Show: S.Show<Delta> = N.Show;

export default Show;
