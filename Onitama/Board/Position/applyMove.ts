import { Either, right } from "fp-ts/lib/Either";
import { Move } from "../../Action";
import OutOfBoundsError from "../OutOfBoundsError";
import { applyDelta as applyDeltaToFile } from "../File";
import { applyDelta as applyDeltaToRank } from "../Rank";
import Position from "./Position";

const applyMove =
  (move: Move.Move) =>
  (position: Position): Either<OutOfBoundsError, Position> => {
    const [fileDelta, rankDelta] = move;
    const [file, rank] = position;

    const newFile = applyDeltaToFile(fileDelta)(file);
    const newRank = applyDeltaToRank(rankDelta)(rank);

    if (newFile._tag === "Left") return newFile;
    if (newRank._tag === "Left") return newRank;

    return right([newFile.right, newRank.right]);
  };

export default applyMove;
