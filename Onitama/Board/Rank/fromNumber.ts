import { Either, left, right } from "fp-ts/Either";
import OutOfBoundsError from "../OutOfBoundsError";
import Rank from "./Rank";

const fromNumber = (n: number): Either<OutOfBoundsError, Rank> => {
  switch (n) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return right(n);

    default:
      return left(new OutOfBoundsError());
  }
};

export default fromNumber;
