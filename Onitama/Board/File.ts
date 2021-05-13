import * as Ei from "fp-ts/lib/Either";
import * as E from "fp-ts/lib/Eq";
import * as B from "fp-ts/lib/Bounded";
import * as O from "fp-ts/lib/Ord";
import * as S from "fp-ts/lib/string";
import * as Action from "../Action";
import OutOfBoundsError from "./OutOfBoundsError";

export type File = "a" | "b" | "c" | "d" | "e";

export const all: Array<File> = ["a", "b", "c", "d", "e"];

export const Eq: E.Eq<File> = S.Eq;

export const Ord: O.Ord<File> = S.Ord;

export const Bounded: B.Bounded<File> = {
  ...Ord,
  top: "e",
  bottom: "a",
};

export const applyDelta =
  (delta: Action.Delta.Delta) =>
  (file: File): Ei.Either<OutOfBoundsError, File> => {
    const index = all.indexOf(file);

    const newIndex = index + delta;

    const newFile: File | void = all[newIndex];

    if (!newFile) return Ei.left(new OutOfBoundsError());

    return Ei.right(newFile);
  };

export default File;
