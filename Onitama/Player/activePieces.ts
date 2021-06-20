import { filter } from "fp-ts/lib/Array";
import { flow } from "fp-ts/lib/function";
import { Active, isActive } from "../Piece";
import Player from "./Player";
import { pieces } from "./Pieces";

const activePieces: (player: Player) => Array<Active.Active> = flow(
  pieces,
  filter(isActive),
);

export default activePieces;
