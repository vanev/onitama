import * as Ei from "fp-ts/lib/Either";
import * as E from "fp-ts/lib/Eq";
import * as S from "fp-ts/lib/string";
import * as N from "fp-ts/lib/number";
import * as Sh from "fp-ts/lib/Show";
import * as Action from "../Action";
import * as File from "./File";
import * as Rank from "./Rank";
import OutOfBoundsError from "./OutOfBoundsError";

export type Position = [File.File, Rank.Rank];

export const position =
  (file: File.File) =>
  (rank: Rank.Rank): Position =>
    [file, rank];

export const all: Array<Position> = Rank.all.flatMap((rank) =>
  File.all.map((file) => position(file)(rank)),
);

export const applyMove =
  (move: Action.Move.Move) =>
  (position: Position): Ei.Either<OutOfBoundsError, Position> => {
    const [fileDelta, rankDelta] = move;
    const [file, rank] = position;

    const newFile = File.applyDelta(fileDelta)(file);
    const newRank = Rank.applyDelta(rankDelta)(rank);

    if (newFile._tag === "Left") return newFile;
    if (newRank._tag === "Left") return newRank;

    return Ei.right([newFile.right, newRank.right]);
  };

export const Eq: E.Eq<Position> = E.tuple(S.Eq, N.Eq);

export const Show: Sh.Show<Position> = Sh.tuple(S.Show, N.Show);

export default Position;
