import * as Either from "fp-ts/lib/Either";
import * as Action from "../Action";
import * as Board from "../Board";
import * as Player from "../Player";
import * as Piece from "../Piece";
import { State } from "./index";
import performMove from "./performMove";

describe("Onitama.State.performMove", () => {
  describe("when the piece does not belong to the active player", () => {
    it("returns an Either.Left containing a PieceOwnershipError", () => {
      const piece = Piece.active("red", ["a", 5], false);
      const action = Action.action("test a", [[1, -1]], "blue");
      const target = Board.Position.position("b")(4);

      const state: State = {
        blue: {
          pieces: [
            Piece.active("blue", ["a", 1], false),
            Piece.active("blue", ["b", 1], false),
            Piece.active("blue", ["c", 1], true),
            Piece.active("blue", ["d", 1], false),
            Piece.active("blue", ["e", 1], false),
          ],
          actions: [
            Action.action("test a", [[1, -1]], "blue"),
            Action.action("test b", [[0, 1]], "red"),
          ],
          color: "blue",
        },
        red: {
          pieces: [
            Piece.active("red", ["a", 5], false),
            Piece.active("red", ["b", 5], false),
            Piece.active("red", ["c", 5], true),
            Piece.active("red", ["d", 5], false),
            Piece.active("red", ["e", 5], false),
          ],
          actions: [
            Action.action("test c", [[1, 2]], "blue"),
            Action.action("test d", [[-1, 1]], "red"),
          ],
          color: "red",
        },
        sideboard: Action.action("test e", [[0, 1]], "blue"),
        activeColor: "blue",
      };

      const actual = performMove(piece, action, target)(state);

      const expected = Either.left("PieceOwnershipError");
      expect(actual).toEqual(expected);
    });
  });

  describe("when the piece belongs to the active player", () => {
    describe("when the action does not belong to the active player", () => {
      it("returns an Either.Left containing an ActionOwnershipError", () => {
        const piece = Piece.active("blue", ["a", 1], false);
        const action = Action.action("test a", [[1, 1]], "blue");
        const target = Board.Position.position("b")(2);

        const state: State = {
          blue: {
            pieces: [
              Piece.active("blue", ["a", 1], false),
              Piece.active("blue", ["b", 1], false),
              Piece.active("blue", ["c", 1], true),
              Piece.active("blue", ["d", 1], false),
              Piece.active("blue", ["e", 1], false),
            ],
            actions: [
              Action.action("test c", [[1, 2]], "blue"),
              Action.action("test b", [[0, 1]], "red"),
            ],
            color: "blue",
          },
          red: {
            pieces: [
              Piece.active("red", ["a", 5], false),
              Piece.active("red", ["b", 5], false),
              Piece.active("red", ["c", 5], true),
              Piece.active("red", ["d", 5], false),
              Piece.active("red", ["e", 5], false),
            ],
            actions: [
              Action.action("test a", [[1, 1]], "blue"),
              Action.action("test d", [[-1, 1]], "red"),
            ],
            color: "red",
          },
          sideboard: Action.action("test e", [[0, 1]], "blue"),
          activeColor: "blue",
        };

        const actual = performMove(piece, action, target)(state);

        const expected = Either.left("ActionOwnershipError");
        expect(actual).toEqual(expected);
      });
    });

    describe("when the action belongs to the active player", () => {
      describe("when the target is not one of the moves available to the piece with the action", () => {
        it("returns an Either.Left containing an ImpossibleTargetError", () => {
          const piece = Piece.active("blue", ["a", 1], false);
          const action = Action.action("test a", [[1, 1]], "blue");
          const target = Board.Position.position("d")(4);

          const state: State = {
            blue: {
              pieces: [
                Piece.active("blue", ["a", 1], false),
                Piece.active("blue", ["b", 1], false),
                Piece.active("blue", ["c", 1], true),
                Piece.active("blue", ["d", 1], false),
                Piece.active("blue", ["e", 1], false),
              ],
              actions: [
                Action.action("test a", [[1, 1]], "blue"),
                Action.action("test b", [[0, 1]], "red"),
              ],
              color: "blue",
            },
            red: {
              pieces: [
                Piece.active("red", ["a", 5], false),
                Piece.active("red", ["b", 5], false),
                Piece.active("red", ["c", 5], true),
                Piece.active("red", ["d", 5], false),
                Piece.active("red", ["e", 5], false),
              ],
              actions: [
                Action.action("test c", [[1, 2]], "blue"),
                Action.action("test d", [[-1, 1]], "red"),
              ],
              color: "red",
            },
            sideboard: Action.action("test e", [[0, 1]], "blue"),
            activeColor: "blue",
          };

          const actual = performMove(piece, action, target)(state);

          const expected = Either.left("ImpossibleTargetError");
          expect(actual).toEqual(expected);
        });
      });

      describe("when the target is one of the moves available to the piece with the action", () => {
        describe("when there is a piece owned by the active player at the target", () => {
          it("return an Either.Left containing a TargetOccupiedError", () => {
            const piece = Piece.active("blue", ["a", 1], false);
            const action = Action.action("test a", [[1, 1]], "blue");
            const target = Board.Position.position("b")(2);

            const state: State = {
              blue: {
                pieces: [
                  Piece.active("blue", ["a", 1], false),
                  Piece.active("blue", ["b", 2], false),
                  Piece.active("blue", ["c", 1], true),
                  Piece.active("blue", ["d", 1], false),
                  Piece.active("blue", ["e", 1], false),
                ],
                actions: [
                  Action.action("test a", [[1, 1]], "blue"),
                  Action.action("test b", [[0, 1]], "red"),
                ],
                color: "blue",
              },
              red: {
                pieces: [
                  Piece.active("red", ["a", 5], false),
                  Piece.active("red", ["b", 5], false),
                  Piece.active("red", ["c", 5], true),
                  Piece.active("red", ["d", 5], false),
                  Piece.active("red", ["e", 5], false),
                ],
                actions: [
                  Action.action("test c", [[1, 2]], "blue"),
                  Action.action("test d", [[-1, 1]], "red"),
                ],
                color: "red",
              },
              sideboard: Action.action("test e", [[0, 1]], "blue"),
              activeColor: "blue",
            };

            const actual = performMove(piece, action, target)(state);

            const expected = Either.left("TargetOccupiedError");
            expect(actual).toEqual(expected);
          });
        });

        describe("when there is no piece at the target", () => {
          it("returns an Either.Right containing the game state with the piece at the target position, the sideboard action given to the active player, the used action moved to the sideboard, and the active color switched.", () => {
            const piece = Piece.active("blue", ["a", 1], false);
            const action = Action.action("test a", [[1, 1]], "blue");
            const target = Board.Position.position("b")(2);

            const state: State = {
              blue: {
                pieces: [
                  Piece.active("blue", ["a", 1], false),
                  Piece.active("blue", ["b", 1], false),
                  Piece.active("blue", ["c", 1], true),
                  Piece.active("blue", ["d", 1], false),
                  Piece.active("blue", ["e", 1], false),
                ],
                actions: [
                  Action.action("test a", [[1, 1]], "blue"),
                  Action.action("test b", [[0, 1]], "red"),
                ],
                color: "blue",
              },
              red: {
                pieces: [
                  Piece.active("red", ["a", 5], false),
                  Piece.active("red", ["b", 5], false),
                  Piece.active("red", ["c", 5], true),
                  Piece.active("red", ["d", 5], false),
                  Piece.active("red", ["e", 5], false),
                ],
                actions: [
                  Action.action("test c", [[1, 2]], "blue"),
                  Action.action("test d", [[-1, 1]], "red"),
                ],
                color: "red",
              },
              sideboard: Action.action("test e", [[0, 1]], "blue"),
              activeColor: "blue",
            };

            const actual = performMove(piece, action, target)(state);

            const expectedState: State = {
              blue: {
                pieces: [
                  Piece.active("blue", ["b", 2], false),
                  Piece.active("blue", ["b", 1], false),
                  Piece.active("blue", ["c", 1], true),
                  Piece.active("blue", ["d", 1], false),
                  Piece.active("blue", ["e", 1], false),
                ],
                actions: [
                  Action.action("test b", [[0, 1]], "red"),
                  Action.action("test e", [[0, 1]], "blue"),
                ],
                color: "blue",
              },
              red: {
                pieces: [
                  Piece.active("red", ["a", 5], false),
                  Piece.active("red", ["b", 5], false),
                  Piece.active("red", ["c", 5], true),
                  Piece.active("red", ["d", 5], false),
                  Piece.active("red", ["e", 5], false),
                ],
                actions: [
                  Action.action("test c", [[1, 2]], "blue"),
                  Action.action("test d", [[-1, 1]], "red"),
                ],
                color: "red",
              },
              sideboard: Action.action("test a", [[1, 1]], "blue"),
              activeColor: "red",
            };
            const expected = Either.right(expectedState);
            expect(actual).toEqual(expected);
          });
        });

        describe("when there is a piece owned by the opposing player at the target", () => {
          describe("when the opposing piece is not the king", () => {
            it("returns an Either.Right containing the game state with the piece at the target position, the opposing piece in the captured state, the sideboard action given to the active player, the used action moved to the sideboard, and the active color switched.", () => {
              const piece = Piece.active("blue", ["a", 1], false);
              const action = Action.action("test a", [[1, 1]], "blue");
              const target = Board.Position.position("b")(2);

              const state: State = {
                blue: {
                  pieces: [
                    Piece.active("blue", ["a", 1], false),
                    Piece.active("blue", ["b", 1], false),
                    Piece.active("blue", ["c", 1], true),
                    Piece.active("blue", ["d", 1], false),
                    Piece.active("blue", ["e", 1], false),
                  ],
                  actions: [
                    Action.action("test a", [[1, 1]], "blue"),
                    Action.action("test b", [[0, 1]], "red"),
                  ],
                  color: "blue",
                },
                red: {
                  pieces: [
                    Piece.active("red", ["a", 5], false),
                    Piece.active("red", ["b", 2], false),
                    Piece.active("red", ["c", 5], true),
                    Piece.active("red", ["d", 5], false),
                    Piece.active("red", ["e", 5], false),
                  ],
                  actions: [
                    Action.action("test c", [[1, 2]], "blue"),
                    Action.action("test d", [[-1, 1]], "red"),
                  ],
                  color: "red",
                },
                sideboard: Action.action("test e", [[0, 1]], "blue"),
                activeColor: "blue",
              };

              const actual = performMove(piece, action, target)(state);

              const expectedState: State = {
                blue: {
                  pieces: [
                    Piece.active("blue", ["b", 2], false),
                    Piece.active("blue", ["b", 1], false),
                    Piece.active("blue", ["c", 1], true),
                    Piece.active("blue", ["d", 1], false),
                    Piece.active("blue", ["e", 1], false),
                  ],
                  actions: [
                    Action.action("test b", [[0, 1]], "red"),
                    Action.action("test e", [[0, 1]], "blue"),
                  ],
                  color: "blue",
                },
                red: {
                  pieces: [
                    Piece.active("red", ["a", 5], false),
                    Piece.captured("red"),
                    Piece.active("red", ["c", 5], true),
                    Piece.active("red", ["d", 5], false),
                    Piece.active("red", ["e", 5], false),
                  ],
                  actions: [
                    Action.action("test c", [[1, 2]], "blue"),
                    Action.action("test d", [[-1, 1]], "red"),
                  ],
                  color: "red",
                },
                sideboard: Action.action("test a", [[1, 1]], "blue"),
                activeColor: "red",
              };
              const expected = Either.right(expectedState);
              expect(actual).toEqual(expected);
            });
          });

          describe("when the opposing piece is the king", () => {
            it.todo(
              "returns an Either.Right containing the game state with the active player as the winner",
            );
          });
        });
      });
    });
  });
});
