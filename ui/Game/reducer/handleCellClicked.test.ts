import * as O from "../../../Onitama";
import {
  waiting,
  pieceSelected,
  actionSelected,
  pieceAndActionSelected,
  pieceActionTargetSelected,
} from "../State";
import handleCellClicked from "./handleCellClicked";

describe("UI.Game.reducer.handleCellClicked", () => {
  describe("when there is a piece", () => {
    describe("when the state is Waiting", () => {
      it("returns the PieceSelected state with the new piece", () => {
        const piece = O.Piece.active("blue", ["a", 1], false);

        const game: O.State.State = {
          blue: {
            pieces: [
              piece,
              O.Piece.active("blue", ["b", 1], false),
              O.Piece.active("blue", ["c", 1], true),
              O.Piece.active("blue", ["d", 1], false),
              O.Piece.active("blue", ["e", 1], false),
            ],
            actions: [
              O.Action.action("test a", [[0, 0]], "blue"),
              O.Action.action("test b", [[0, 0]], "blue"),
            ],
            color: "blue",
          },
          red: {
            pieces: [
              O.Piece.active("red", ["a", 5], false),
              O.Piece.active("red", ["b", 5], false),
              O.Piece.active("red", ["c", 5], true),
              O.Piece.active("red", ["d", 5], false),
              O.Piece.active("red", ["e", 5], false),
            ],
            actions: [
              O.Action.action("test c", [[0, 0]], "blue"),
              O.Action.action("test d", [[0, 0]], "blue"),
            ],
            color: "red",
          },
          sideboard: O.Action.action("test e", [[0, 0]], "blue"),
          activeColor: "blue",
        };
        const state = waiting(game);

        const actual = handleCellClicked(state, {
          _tag: "CellClicked",
          position: ["a", 1],
        });

        const expected = pieceSelected(piece, game);
        expect(actual).toEqual(expected);
      });
    });

    describe("when the state is PieceSelected", () => {
      it("returns the PieceSelected state with the new piece", () => {
        const piece = O.Piece.active("blue", ["a", 1], false);
        const otherPiece = O.Piece.active("blue", ["b", 1], false);

        const game: O.State.State = {
          blue: {
            pieces: [
              piece,
              otherPiece,
              O.Piece.active("blue", ["c", 1], true),
              O.Piece.active("blue", ["d", 1], false),
              O.Piece.active("blue", ["e", 1], false),
            ],
            actions: [
              O.Action.action("test a", [[0, 0]], "blue"),
              O.Action.action("test b", [[0, 0]], "blue"),
            ],
            color: "blue",
          },
          red: {
            pieces: [
              O.Piece.active("red", ["a", 5], false),
              O.Piece.active("red", ["b", 5], false),
              O.Piece.active("red", ["c", 5], true),
              O.Piece.active("red", ["d", 5], false),
              O.Piece.active("red", ["e", 5], false),
            ],
            actions: [
              O.Action.action("test c", [[0, 0]], "blue"),
              O.Action.action("test d", [[0, 0]], "blue"),
            ],
            color: "red",
          },
          sideboard: O.Action.action("test e", [[0, 0]], "blue"),
          activeColor: "blue",
        };
        const state = pieceSelected(otherPiece, game);

        const actual = handleCellClicked(state, {
          _tag: "CellClicked",
          position: ["a", 1],
        });

        const expected = pieceSelected(piece, game);
        expect(actual).toEqual(expected);
      });
    });

    describe("when the state is ActionSelected", () => {
      it("returns the PieceAndActionSelected state with the new piece", () => {
        const piece = O.Piece.active("blue", ["a", 1], false);
        const action = O.Action.action("test a", [[0, 0]], "blue");

        const game: O.State.State = {
          blue: {
            pieces: [
              piece,
              O.Piece.active("blue", ["b", 1], false),
              O.Piece.active("blue", ["c", 1], true),
              O.Piece.active("blue", ["d", 1], false),
              O.Piece.active("blue", ["e", 1], false),
            ],
            actions: [action, O.Action.action("test b", [[0, 0]], "blue")],
            color: "blue",
          },
          red: {
            pieces: [
              O.Piece.active("red", ["a", 5], false),
              O.Piece.active("red", ["b", 5], false),
              O.Piece.active("red", ["c", 5], true),
              O.Piece.active("red", ["d", 5], false),
              O.Piece.active("red", ["e", 5], false),
            ],
            actions: [
              O.Action.action("test c", [[0, 0]], "blue"),
              O.Action.action("test d", [[0, 0]], "blue"),
            ],
            color: "red",
          },
          sideboard: O.Action.action("test e", [[0, 0]], "blue"),
          activeColor: "blue",
        };
        const state = actionSelected(action, game);

        const actual = handleCellClicked(state, {
          _tag: "CellClicked",
          position: ["a", 1],
        });

        const expected = pieceAndActionSelected(piece, action, game);
        expect(actual).toEqual(expected);
      });
    });

    describe("when the state is PieceAndActionSelected", () => {
      it("returns the PieceAndActionSelected state with the new piece", () => {
        const piece = O.Piece.active("blue", ["a", 1], false);
        const otherPiece = O.Piece.active("blue", ["b", 1], false);
        const action = O.Action.action("test a", [[0, 0]], "blue");

        const game: O.State.State = {
          blue: {
            pieces: [
              piece,
              otherPiece,
              O.Piece.active("blue", ["c", 1], true),
              O.Piece.active("blue", ["d", 1], false),
              O.Piece.active("blue", ["e", 1], false),
            ],
            actions: [action, O.Action.action("test b", [[0, 0]], "blue")],
            color: "blue",
          },
          red: {
            pieces: [
              O.Piece.active("red", ["a", 5], false),
              O.Piece.active("red", ["b", 5], false),
              O.Piece.active("red", ["c", 5], true),
              O.Piece.active("red", ["d", 5], false),
              O.Piece.active("red", ["e", 5], false),
            ],
            actions: [
              O.Action.action("test c", [[0, 0]], "blue"),
              O.Action.action("test d", [[0, 0]], "blue"),
            ],
            color: "red",
          },
          sideboard: O.Action.action("test e", [[0, 0]], "blue"),
          activeColor: "blue",
        };
        const state = pieceAndActionSelected(otherPiece, action, game);

        const actual = handleCellClicked(state, {
          _tag: "CellClicked",
          position: ["a", 1],
        });

        const expected = pieceAndActionSelected(piece, action, game);
        expect(actual).toEqual(expected);
      });
    });

    describe("when the state is PieceActionTargetSelected", () => {
      it("returns the PieceAndActionSelected state with the new piece", () => {
        const piece = O.Piece.active("blue", ["a", 1], false);
        const otherPiece = O.Piece.active("blue", ["b", 1], false);
        const action = O.Action.action("test a", [[0, 0]], "blue");
        const target: O.Board.Position.Position = ["a", 2];

        const game: O.State.State = {
          blue: {
            pieces: [
              piece,
              otherPiece,
              O.Piece.active("blue", ["c", 1], true),
              O.Piece.active("blue", ["d", 1], false),
              O.Piece.active("blue", ["e", 1], false),
            ],
            actions: [action, O.Action.action("test b", [[0, 0]], "blue")],
            color: "blue",
          },
          red: {
            pieces: [
              O.Piece.active("red", ["a", 5], false),
              O.Piece.active("red", ["b", 5], false),
              O.Piece.active("red", ["c", 5], true),
              O.Piece.active("red", ["d", 5], false),
              O.Piece.active("red", ["e", 5], false),
            ],
            actions: [
              O.Action.action("test c", [[0, 0]], "blue"),
              O.Action.action("test d", [[0, 0]], "blue"),
            ],
            color: "red",
          },
          sideboard: O.Action.action("test e", [[0, 0]], "blue"),
          activeColor: "blue",
        };
        const state = pieceActionTargetSelected(
          otherPiece,
          action,
          target,
          game,
        );

        const actual = handleCellClicked(state, {
          _tag: "CellClicked",
          position: ["a", 1],
        });

        const expected = pieceAndActionSelected(piece, action, game);
        expect(actual).toEqual(expected);
      });
    });
  });

  describe("when there is not a piece", () => {
    describe("when the state is Waiting", () => {
      it("returns the state unchanged", () => {
        const game: O.State.State = {
          blue: {
            pieces: [
              O.Piece.active("blue", ["a", 1], false),
              O.Piece.active("blue", ["b", 1], false),
              O.Piece.active("blue", ["c", 1], true),
              O.Piece.active("blue", ["d", 1], false),
              O.Piece.active("blue", ["e", 1], false),
            ],
            actions: [
              O.Action.action("test a", [[0, 0]], "blue"),
              O.Action.action("test b", [[0, 0]], "blue"),
            ],
            color: "blue",
          },
          red: {
            pieces: [
              O.Piece.active("red", ["a", 5], false),
              O.Piece.active("red", ["b", 5], false),
              O.Piece.active("red", ["c", 5], true),
              O.Piece.active("red", ["d", 5], false),
              O.Piece.active("red", ["e", 5], false),
            ],
            actions: [
              O.Action.action("test c", [[0, 0]], "blue"),
              O.Action.action("test d", [[0, 0]], "blue"),
            ],
            color: "red",
          },
          sideboard: O.Action.action("test e", [[0, 0]], "blue"),
          activeColor: "blue",
        };
        const state = waiting(game);

        const actual = handleCellClicked(state, {
          _tag: "CellClicked",
          position: ["c", 3],
        });

        const expected = waiting(game);
        expect(actual).toEqual(expected);
      });
    });

    describe("when the state is PieceSelected", () => {
      it("returns the state unchanged", () => {
        const piece = O.Piece.active("blue", ["a", 1], false);
        const game: O.State.State = {
          blue: {
            pieces: [
              O.Piece.active("blue", ["a", 1], false),
              O.Piece.active("blue", ["b", 1], false),
              O.Piece.active("blue", ["c", 1], true),
              O.Piece.active("blue", ["d", 1], false),
              O.Piece.active("blue", ["e", 1], false),
            ],
            actions: [
              O.Action.action("test a", [[0, 0]], "blue"),
              O.Action.action("test b", [[0, 0]], "blue"),
            ],
            color: "blue",
          },
          red: {
            pieces: [
              O.Piece.active("red", ["a", 5], false),
              O.Piece.active("red", ["b", 5], false),
              O.Piece.active("red", ["c", 5], true),
              O.Piece.active("red", ["d", 5], false),
              O.Piece.active("red", ["e", 5], false),
            ],
            actions: [
              O.Action.action("test c", [[0, 0]], "blue"),
              O.Action.action("test d", [[0, 0]], "blue"),
            ],
            color: "red",
          },
          sideboard: O.Action.action("test e", [[0, 0]], "blue"),
          activeColor: "blue",
        };
        const state = pieceSelected(piece, game);

        const actual = handleCellClicked(state, {
          _tag: "CellClicked",
          position: ["c", 3],
        });

        const expected = pieceSelected(piece, game);
        expect(actual).toEqual(expected);
      });
    });

    describe("when the state is ActionSelected", () => {
      it("returns the state unchanged", () => {
        const action = O.Action.action("test a", [[0, 0]], "blue");
        const game: O.State.State = {
          blue: {
            pieces: [
              O.Piece.active("blue", ["a", 1], false),
              O.Piece.active("blue", ["b", 1], false),
              O.Piece.active("blue", ["c", 1], true),
              O.Piece.active("blue", ["d", 1], false),
              O.Piece.active("blue", ["e", 1], false),
            ],
            actions: [
              O.Action.action("test a", [[0, 0]], "blue"),
              O.Action.action("test b", [[0, 0]], "blue"),
            ],
            color: "blue",
          },
          red: {
            pieces: [
              O.Piece.active("red", ["a", 5], false),
              O.Piece.active("red", ["b", 5], false),
              O.Piece.active("red", ["c", 5], true),
              O.Piece.active("red", ["d", 5], false),
              O.Piece.active("red", ["e", 5], false),
            ],
            actions: [
              O.Action.action("test c", [[0, 0]], "blue"),
              O.Action.action("test d", [[0, 0]], "blue"),
            ],
            color: "red",
          },
          sideboard: O.Action.action("test e", [[0, 0]], "blue"),
          activeColor: "blue",
        };
        const state = actionSelected(action, game);

        const actual = handleCellClicked(state, {
          _tag: "CellClicked",
          position: ["c", 3],
        });

        const expected = actionSelected(action, game);
        expect(actual).toEqual(expected);
      });
    });

    describe("when the state is PieceAndActionSelected", () => {
      it("returns the PieceActionTargetSelected state with the new target", () => {
        const piece = O.Piece.active("blue", ["a", 1], false);
        const action = O.Action.action("test a", [[0, 0]], "blue");
        const game: O.State.State = {
          blue: {
            pieces: [
              O.Piece.active("blue", ["a", 1], false),
              O.Piece.active("blue", ["b", 1], false),
              O.Piece.active("blue", ["c", 1], true),
              O.Piece.active("blue", ["d", 1], false),
              O.Piece.active("blue", ["e", 1], false),
            ],
            actions: [
              O.Action.action("test a", [[0, 0]], "blue"),
              O.Action.action("test b", [[0, 0]], "blue"),
            ],
            color: "blue",
          },
          red: {
            pieces: [
              O.Piece.active("red", ["a", 5], false),
              O.Piece.active("red", ["b", 5], false),
              O.Piece.active("red", ["c", 5], true),
              O.Piece.active("red", ["d", 5], false),
              O.Piece.active("red", ["e", 5], false),
            ],
            actions: [
              O.Action.action("test c", [[0, 0]], "blue"),
              O.Action.action("test d", [[0, 0]], "blue"),
            ],
            color: "red",
          },
          sideboard: O.Action.action("test e", [[0, 0]], "blue"),
          activeColor: "blue",
        };
        const state = pieceAndActionSelected(piece, action, game);

        const actual = handleCellClicked(state, {
          _tag: "CellClicked",
          position: ["c", 3],
        });

        const expected = pieceActionTargetSelected(
          piece,
          action,
          ["c", 3],
          game,
        );
        expect(actual).toEqual(expected);
      });
    });

    describe("when the state is PieceActionTargetSelected", () => {
      it("returns the PieceActionTargetSelected state with the new target", () => {
        const piece = O.Piece.active("blue", ["a", 1], false);
        const action = O.Action.action("test a", [[0, 0]], "blue");
        const game: O.State.State = {
          blue: {
            pieces: [
              O.Piece.active("blue", ["a", 1], false),
              O.Piece.active("blue", ["b", 1], false),
              O.Piece.active("blue", ["c", 1], true),
              O.Piece.active("blue", ["d", 1], false),
              O.Piece.active("blue", ["e", 1], false),
            ],
            actions: [
              O.Action.action("test a", [[0, 0]], "blue"),
              O.Action.action("test b", [[0, 0]], "blue"),
            ],
            color: "blue",
          },
          red: {
            pieces: [
              O.Piece.active("red", ["a", 5], false),
              O.Piece.active("red", ["b", 5], false),
              O.Piece.active("red", ["c", 5], true),
              O.Piece.active("red", ["d", 5], false),
              O.Piece.active("red", ["e", 5], false),
            ],
            actions: [
              O.Action.action("test c", [[0, 0]], "blue"),
              O.Action.action("test d", [[0, 0]], "blue"),
            ],
            color: "red",
          },
          sideboard: O.Action.action("test e", [[0, 0]], "blue"),
          activeColor: "blue",
        };
        const state = pieceActionTargetSelected(piece, action, ["b", 2], game);

        const actual = handleCellClicked(state, {
          _tag: "CellClicked",
          position: ["c", 3],
        });

        const expected = pieceActionTargetSelected(
          piece,
          action,
          ["c", 3],
          game,
        );
        expect(actual).toEqual(expected);
      });
    });
  });
});
