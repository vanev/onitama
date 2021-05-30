import Delta from "./Delta";

const fromNumber = (n: number): Delta => {
  if (n < -2) return -2;
  if (n > 2) return 2;

  return n as Delta;
};

export default fromNumber;
