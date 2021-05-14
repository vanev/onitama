import * as A from "fp-ts/lib/Array";
import * as Board from "./Board";
import * as Action from "./Action";
import Color from "./Color";
import * as Piece from "./Piece";

type Pieces = [Piece.Piece, Piece.Piece, Piece.Piece, Piece.Piece, Piece.Piece];

export type Player = {
  pieces: Pieces;
  actions: [Action.Action, Action.Action];
  color: Color;
};

export const activePieces = (player: Player): Array<Piece.Active> =>
  player.pieces.filter(Piece.isActive);

export const moves = ({
  actions,
  pieces,
}: Player): Array<Board.Position.Position> => {
  const activePieces = A.filter(Piece.isActive)(pieces);

  return A.chain((action: Action.Action) =>
    A.chain(Piece.moves(action))(activePieces),
  )(actions);
};

export default Player;
