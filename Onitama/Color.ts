export type Color = "blue" | "red";

export const inverse = (color: Color): Color => {
  switch (color) {
    case "blue":
      return "red";
    case "red":
      return "blue";
  }
};

export default Color;
