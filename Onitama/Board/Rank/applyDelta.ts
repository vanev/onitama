import { Either } from "fp-ts/Either";
import { Delta } from "../../Action";
import OutOfBoundsError from "../OutOfBoundsError";
import fromNumber from "./fromNumber";
import Rank from "./Rank";

const applyDelta =
  (delta: Delta.Delta) =>
  (rank: Rank): Either<OutOfBoundsError, Rank> =>
    fromNumber(rank + delta);

export default applyDelta;
