import { findFirst } from "fp-ts/lib/Array";
import { flow } from "fp-ts/lib/function";
import { Option } from "fp-ts/lib/Option";
import { Position } from "../Board";
import { Active } from "../Piece";
import Player from "./Player";
import activePieces from "./activePieces";

const findPieceByPosition = (
  position: Position.Position,
): ((player: Player) => Option<Active.Active>) =>
  flow(activePieces, findFirst(Active.isAtPosition(position)));

export default findPieceByPosition;
