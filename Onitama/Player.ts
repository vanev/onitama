import * as A from "fp-ts/lib/Array";
import { flow } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
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

export const initialBlue = ([actionA, actionB]: Actions): Player => ({
  pieces: [
    Piece.active("blue", ["a", 1], false),
    Piece.active("blue", ["b", 1], false),
    Piece.active("blue", ["c", 1], true),
    Piece.active("blue", ["d", 1], false),
    Piece.active("blue", ["e", 1], false),
  ],
  actions: [actionA, actionB],
  color: "blue",
});

export const initialRed = ([actionA, actionB]: Actions): Player => ({
  pieces: [
    Piece.active("red", ["a", 5], false),
    Piece.active("red", ["b", 5], false),
    Piece.active("red", ["c", 5], true),
    Piece.active("red", ["d", 5], false),
    Piece.active("red", ["e", 5], false),
  ],
  actions: [actionA, actionB],
  color: "red",
});

export const actions = (player: Player): Actions => player.actions;

export const pieces = (player: Player): Pieces => player.pieces;

export const activePieces = (player: Player): Array<Piece.Active> =>
  player.pieces.filter(Piece.isActive);

export const capturedPieces = (player: Player): Array<Piece.Captured> =>
  player.pieces.filter(Piece.isCaptured);

export const findPieceByPosition = (
  position: Board.Position.Position,
): ((player: Player) => O.Option<Piece.Active>) =>
  flow(activePieces, A.findFirst(Piece.isAtPosition(position)));

export const hasAction = (
  action: Action.Action,
): ((player: Player) => boolean) =>
  flow(
    actions,
    A.findFirst((playerAction) => Action.Eq.equals(playerAction, action)),
    O.isSome,
  );

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
