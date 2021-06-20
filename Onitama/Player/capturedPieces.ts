import { filter } from "fp-ts/lib/Array";
import { flow } from "fp-ts/lib/function";
import { Captured, isCaptured } from "../Piece";
import Player from "./Player";
import { pieces } from "./Pieces";

const capturedPieces: (player: Player) => Array<Captured.Captured> = flow(
  pieces,
  filter(isCaptured),
);

export default capturedPieces;
