import Group from "./Group";

describe("Onitama.Action.Move.Group.inverse", () => {
  it("returns a move with the deltas inverted", () => {
    const actual = Group.inverse([2, -1]);

    const expected = [-2, 1];
    expect(actual).toEqual(expected);
  });
});
