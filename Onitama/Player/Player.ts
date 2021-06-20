import { Color } from "../Color";
import { Active } from "../Piece";
import Pieces from "./Pieces";
import Actions from "./Actions";

type Player = {
  pieces: Pieces;
  actions: Actions;
  color: Color;
};

export const initialBlue = ([actionA, actionB]: Actions): Player => ({
  pieces: [
    Active.active("blue", ["a", 1], false),
    Active.active("blue", ["b", 1], false),
    Active.active("blue", ["c", 1], true),
    Active.active("blue", ["d", 1], false),
    Active.active("blue", ["e", 1], false),
  ],
  actions: [actionA, actionB],
  color: "blue",
});

export const initialRed = ([actionA, actionB]: Actions): Player => ({
  pieces: [
    Active.active("red", ["a", 5], false),
    Active.active("red", ["b", 5], false),
    Active.active("red", ["c", 5], true),
    Active.active("red", ["d", 5], false),
    Active.active("red", ["e", 5], false),
  ],
  actions: [actionA, actionB],
  color: "red",
});

export default Player;
