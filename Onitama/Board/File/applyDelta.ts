import { Either, right, chain } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { Delta } from "../../Action";
import OutOfBoundsError from "../OutOfBoundsError";
import File from "./File";
import increment from "./increment";
import decrement from "./decrement";

const applyDelta =
  (delta: Delta.Delta) =>
  (file: File): Either<OutOfBoundsError, File> => {
    switch (delta) {
      case -2:
        return pipe(file, decrement, chain(decrement));

      case -1:
        return decrement(file);

      case 0:
        return right(file);

      case 1:
        return increment(file);

      case 2:
        return pipe(file, increment, chain(increment));
    }
  };

export default applyDelta;
