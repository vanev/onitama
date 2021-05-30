import * as S from "fp-ts/lib/Show";
import * as D from "../Delta";
import Move from "./Move";

const Show: S.Show<Move> = S.tuple(D.Show, D.Show);

export default Show;
