import { Position } from "../../Board";
import { Color } from "../../Color";

type Active = {
  _tag: "Active";
  position: Position.Position;
  color: Color;
  isKing: boolean;
};

export const active = (
  color: Color,
  position: Position.Position,
  isKing: boolean,
): Active => ({
  _tag: "Active",
  position,
  color,
  isKing,
});

export default Active;
