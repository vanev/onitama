import { Color } from "../../Color";

type Captured = {
  _tag: "Captured";
  color: Color;
};

export const captured = (color: Color): Captured => ({
  _tag: "Captured",
  color,
});

export default Captured;
