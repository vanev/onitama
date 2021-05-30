import * as Sh from "fp-ts/lib/Show";
import * as S from "fp-ts/lib/string";
import * as N from "fp-ts/lib/number";
import Position from "./Position";

const Show: Sh.Show<Position> = Sh.tuple(S.Show, N.Show);

export default Show;
