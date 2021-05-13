import * as G from "fp-ts/lib/Group";
import * as S from "fp-ts/lib/Semigroup";
import * as M from "fp-ts/lib/Monoid";
import * as Sh from "fp-ts/lib/Show";
import * as Delta from "./Delta";

export type Move = readonly [Delta.Delta, Delta.Delta];

export const Semigroup: S.Semigroup<Move> = S.tuple(
  Delta.Semigroup,
  Delta.Semigroup,
);

export const Monoid: M.Monoid<Move> = M.tuple(Delta.Monoid, Delta.Monoid);

export const Group: G.Group<Move> = {
  ...Monoid,
  inverse: ([f, r]) => [Delta.Group.inverse(f), Delta.Group.inverse(r)],
};

export const Show: Sh.Show<Move> = Sh.tuple(Delta.Show, Delta.Show);

export default Move;
