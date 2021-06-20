import { combinations } from "./Array.Extra";

describe("Array.Extra.coombinations", () => {
  it("returns all of the combinations of the items in the given arrays", () => {
    const actual = combinations([1, 2], ["A", "B", "C"]);

    const expected = [
      [1, "A"],
      [1, "B"],
      [1, "C"],
      [2, "A"],
      [2, "B"],
      [2, "C"],
    ];
    expect(actual).toEqual(expected);
  });
});
