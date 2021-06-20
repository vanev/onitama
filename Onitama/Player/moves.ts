import { filter, chain } from "fp-ts/lib/Array";
import { Position } from "../Board";
import { Action } from "../Action";
import { Active, isActive } from "../Piece";
import Player from "./Player";

const moves = ({ actions, pieces }: Player): Array<Position.Position> => {
  const activePieces = filter(isActive)(pieces);

  const movesFromAction = (action: Action) =>
    chain(Active.moves(action))(activePieces);

  return chain(movesFromAction)(actions);
};

export default moves;
