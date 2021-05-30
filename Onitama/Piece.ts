import * as E from "fp-ts/lib/Eq";
import * as B from "fp-ts/lib/boolean";
import * as S from "fp-ts/lib/string";
import * as Board from "./Board";
import * as Action from "./Action";
import { Color } from "./Color";

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

const activeEq = E.struct<Active>({
  _tag: S.Eq,
  position: Board.Position.Eq,
  isKing: B.Eq,
  color: S.Eq,
});

export const isAtPosition =
  (position: Board.Position.Position) =>
  (piece: Active): boolean =>
    Board.Position.Eq.equals(position, piece.position);

export type Captured = {
  _tag: "Captured";
  color: Color;
};
export const captured = (color: Color): Captured => ({
  _tag: "Captured",
  color,
});

const capturedEq = E.struct<Captured>({
  _tag: S.Eq,
  color: S.Eq,
});

export type Piece = Active | Captured;

export const isActive = (p: Piece): p is Active => p._tag === "Active";
export const isCaptured = (p: Piece): p is Captured => p._tag === "Captured";

export const color = (p: Piece): Color => p.color;

export const moves =
  (action: Action.Action) =>
  (piece: Active): Array<Board.Position.Position> => {
    const { color, position } = piece;

    return action.moves.reduce(
      (
        positions: Array<Board.Position.Position>,
        move: Action.Move.Move,
      ): Array<Board.Position.Position> => {
        if (color === "red") {
          move = Action.Move.Group.inverse(move);
        }

        const newPosition = Board.Position.applyMove(move)(position);

        if (newPosition._tag === "Left") return positions;

        return [...positions, newPosition.right];
      },
      [],
    );
  };

export const Eq: E.Eq<Piece> = {
  equals: (a, b) => {
    if (a._tag === "Active" && b._tag === "Active")
      return activeEq.equals(a, b);

    if (a._tag === "Captured" && b._tag === "Captured")
      return capturedEq.equals(a, b);

    return false;
  },
};

export default Piece;
