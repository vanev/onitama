import { Either, left, right } from "fp-ts/Either";
import * as Action from "../Action";
import OutOfBoundsError from "./OutOfBoundsError";

export type Rank = 1 | 2 | 3 | 4 | 5;

export const all: Array<Rank> = [1, 2, 3, 4, 5];

export const applyDelta =
  (delta: Action.Delta.Delta) =>
  (rank: Rank): Either<OutOfBoundsError, Rank> => {
    const index = all.indexOf(rank);

    const newIndex = index + delta;

    const newRank: Rank | void = all[newIndex];

    if (!newRank) return left(new OutOfBoundsError());

    return right(newRank);
  };

export default Rank;
