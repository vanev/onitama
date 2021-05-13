import * as Board from "./Board";
import * as Action from "./Action";
import Color from "./Color";

export type Active = {
  _tag: "Active";
  position: Board.Position.Position;
  color: Color;
  isKing: boolean;
};
export const active = (
  color: Color,
  position: Board.Position.Position,
  isKing: boolean,
): Active => ({
  _tag: "Active",
  position,
  color,
  isKing,
});

export type Captured = {
  _tag: "Captured";
  color: Color;
};
export const captured = (color: Color): Captured => ({
  _tag: "Captured",
  color,
});

export type Piece = Active | Captured;

export const isActive = (p: Piece): p is Active => p._tag === "Active";
export const isCaptured = (p: Piece): p is Captured => p._tag === "Captured";

export const moves =
  (action: Action.Action) =>
  (piece: Active): Array<Board.Position.Position> => {
    const { color, position } = piece;

    return action.moves.reduce(
      (
        positions: Array<Board.Position.Position>,
        move: Action.Move.Move,
      ): Array<Board.Position.Position> => {
        if (color === "blue") {
          move = Action.Move.Group.inverse(move);
        }

        const newPosition = Board.Position.applyMove(move)(position);

        if (newPosition._tag === "Left") return positions;

        return [...positions, newPosition.right];
      },
      [],
    );
  };

export default Piece;
