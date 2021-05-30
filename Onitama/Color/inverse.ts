import Color from "./Color";

const inverse = (color: Color): Color => {
  switch (color) {
    case "blue":
      return "red";
    case "red":
      return "blue";
  }
};

export default inverse;
