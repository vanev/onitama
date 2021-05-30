import Semigroup from "./Semigroup";

describe("Onitama.Action.Delta.Semigroup.concat", () => {
  describe("when the sum of the deltas is less than -2", () => {
    it("returns -2", () => {
      const actual = Semigroup.concat(-2, -1);

      const expected = -2;
      expect(actual).toEqual(expected);
    });
  });

  describe("when the sum of the deltas is between 2 and -2", () => {
    it("returns the sum", () => {
      const actual = Semigroup.concat(0, 1);

      const expected = 1;
      expect(actual).toEqual(expected);
    });
  });

  describe("when the sum of the deltas is greater than 2", () => {
    it("returns 2", () => {
      const actual = Semigroup.concat(2, 1);

      const expected = 2;
      expect(actual).toEqual(expected);
    });
  });
});
