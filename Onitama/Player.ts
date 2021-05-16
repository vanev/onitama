import * as A from "fp-ts/lib/Array";
import * as Board from "./Board";
import * as Action from "./Action";
import Color from "./Color";
import * as Piece from "./Piece";

export type Pieces = [
  Piece.Piece,
  Piece.Piece,
  Piece.Piece,
  Piece.Piece,
  Piece.Piece,
];
export type Actions = [Action.Action, Action.Action];

export type Player = {
  pieces: Pieces;
  actions: Actions;
  color: Color;
};

export const actions = (player: Player): Actions => player.actions;

export const pieces = (player: Player): Pieces => player.pieces;

export const activePieces = (player: Player): Array<Piece.Active> =>
  player.pieces.filter(Piece.isActive);

export const capturedPieces = (player: Player): Array<Piece.Captured> =>
  player.pieces.filter(Piece.isCaptured);

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
