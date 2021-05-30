import { Either, left, right } from "fp-ts/lib/Either";
import OutOfBoundsError from "../OutOfBoundsError";
import File from "./File";

const increment = (file: File): Either<OutOfBoundsError, File> => {
  switch (file) {
    case "a":
      return left(new OutOfBoundsError());

    case "b":
      return right("a");

    case "c":
      return right("b");

    case "d":
      return right("c");

    case "e":
      return right("d");
  }
};

export default increment;
