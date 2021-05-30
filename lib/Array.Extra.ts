import { chain, map } from "fp-ts/lib/Array";

const pair =
  <A>(a: A) =>
  <B>(b: B): [A, B] =>
    [a, b];

const pairs =
  <B>(bs: Array<B>) =>
  <A>(a: A): Array<[A, B]> =>
    map(pair(a))(bs);

export const combinations = <A, B>(as: Array<A>, bs: Array<B>): Array<[A, B]> =>
  chain(pairs(bs))(as);
