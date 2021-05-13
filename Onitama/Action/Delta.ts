import * as G from "fp-ts/lib/Group";
import * as S from "fp-ts/lib/Semigroup";
import * as M from "fp-ts/lib/Monoid";
import * as Sh from "fp-ts/lib/Show";
import * as N from "fp-ts/lib/number";

export type Delta = -2 | -1 | 0 | 1 | 2;

export const fromNumber = (n: number): Delta => {
  if (n < -2) return -2;
  if (n > 2) return 2;

  return n as Delta;
};

export const Semigroup: S.Semigroup<Delta> = {
  concat: (x, y) => fromNumber(x + y),
};

export const Monoid: M.Monoid<Delta> = {
  ...Semigroup,
  empty: 0,
};

export const Group: G.Group<Delta> = {
  ...Monoid,
  inverse: (d) => {
    switch (d) {
      case -2:
        return 2;
      case -1:
        return 1;
      case 0:
        return 0;
      case 1:
        return -1;
      case 2:
        return -2;
    }
  },
};

export const Show: Sh.Show<Delta> = N.Show;

export default Delta;
