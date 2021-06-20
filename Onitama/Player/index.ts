import { actions } from "./Actions";
import activePieces from "./activePieces";
import capturedPieces from "./capturedPieces";
import findPieceByPosition from "./findPieceByPosition";
import hasAction from "./hasAction";
import moves from "./moves";
import { pieces } from "./Pieces";
import Player, { initialBlue, initialRed } from "./Player";

export type { Player };

export {
  actions,
  activePieces,
  capturedPieces,
  findPieceByPosition,
  hasAction,
  initialBlue,
  initialRed,
  moves,
  pieces,
};
