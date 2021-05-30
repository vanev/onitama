import fromNumber from "./fromNumber";

describe("Onitama.Action.Delta.fromNumber", () => {
  describe("when the given number is lower than -2", () => {
    it("returns -2", () => {
      const actual = fromNumber(-5);

      const expected = -2;
      expect(actual).toEqual(expected);
    });
  });

  describe("when the given number is between -2 and 2", () => {
    it("returns the given number", () => {
      const actual = fromNumber(1);

      const expected = 1;
      expect(actual).toEqual(expected);
    });
  });

  describe("when the given number is higher than 2", () => {
    it("returns 2", () => {
      const actual = fromNumber(5);

      const expected = 2;
      expect(actual).toEqual(expected);
    });
  });
});
