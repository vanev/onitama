import { Either, left, right } from "fp-ts/lib/Either";
import OutOfBoundsError from "../OutOfBoundsError";
import File from "./File";

const increment = (file: File): Either<OutOfBoundsError, File> => {
  switch (file) {
    case "a":
      return right("b");

    case "b":
      return right("c");

    case "c":
      return right("d");

    case "d":
      return right("e");

    case "e":
      return left(new OutOfBoundsError());
  }
};

export default increment;
