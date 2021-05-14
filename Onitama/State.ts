import Action from "./Action";
import Player from "./Player";
import Color from "./Color";
import * as Piece from "./Piece";

export type State = {
  blue: Player;
  red: Player;
  sideboard: Action;
  activeColor: Color;
};

export const initial = ([actionA, actionB, actionC, actionD, actionE]: [
  Action,
  Action,
  Action,
  Action,
  Action,
]): State => ({
  blue: {
    pieces: [
      Piece.active("blue", ["a", 1], false),
      Piece.active("blue", ["b", 1], false),
      Piece.active("blue", ["c", 1], true),
      Piece.active("blue", ["d", 1], false),
      Piece.active("blue", ["e", 1], false),
    ],
    actions: [actionA, actionB],
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
    actions: [actionC, actionD],
    color: "red",
  },
  sideboard: actionE,
  activeColor: actionE.color,
});

export const activeColor = (state: State): Color => state.activeColor;

export const sideboard = (state: State): Action => state.sideboard;

export default State;
