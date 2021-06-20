import { Position } from "../../Board";
import Active from "./Active";

const isAtPosition =
  (position: Position.Position) =>
  (piece: Active): boolean =>
    Position.Eq.equals(position, piece.position);

export default isAtPosition;
