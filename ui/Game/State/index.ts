import * as Op from "fp-ts/lib/Option";
import * as O from "../../../Onitama";

export type Waiting = {
  _tag: "Waiting";
  game: O.State.State;
};
export const waiting = (game: O.State.State): Waiting => ({
  _tag: "Waiting",
  game,
});

export type PieceSelected = {
  _tag: "PieceSelected";
  piece: O.Piece.Active.Active;
  game: O.State.State;
};
export const pieceSelected = (
  piece: O.Piece.Active.Active,
  game: O.State.State,
): PieceSelected => ({
  _tag: "PieceSelected",
  piece,
  game,
});

export type ActionSelected = {
  _tag: "ActionSelected";
  action: O.Action.Action;
  game: O.State.State;
};
export const actionSelected = (
  action: O.Action.Action,
  game: O.State.State,
): ActionSelected => ({
  _tag: "ActionSelected",
  action,
  game,
});

export type PieceAndActionSelected = {
  _tag: "PieceAndActionSelected";
  action: O.Action.Action;
  piece: O.Piece.Active.Active;
  game: O.State.State;
};
export const pieceAndActionSelected = (
  piece: O.Piece.Active.Active,
  action: O.Action.Action,
  game: O.State.State,
): PieceAndActionSelected => ({
  _tag: "PieceAndActionSelected",
  piece,
  action,
  game,
});

export type PieceActionTargetSelected = {
  _tag: "PieceActionTargetSelected";
  piece: O.Piece.Active.Active;
  action: O.Action.Action;
  target: O.Board.Position.Position;
  game: O.State.State;
};
export const pieceActionTargetSelected = (
  piece: O.Piece.Active.Active,
  action: O.Action.Action,
  target: O.Board.Position.Position,
  game: O.State.State,
): PieceActionTargetSelected => ({
  _tag: "PieceActionTargetSelected",
  piece,
  action,
  target,
  game,
});

export type State =
  | Waiting
  | PieceSelected
  | ActionSelected
  | PieceAndActionSelected
  | PieceActionTargetSelected;

export const game = (state: State): O.State.State => state.game;

export const selectedPiece = (
  state: State,
): Op.Option<O.Piece.Active.Active> => {
  switch (state._tag) {
    case "Waiting":
    case "ActionSelected":
      return Op.none;

    case "PieceSelected":
    case "PieceAndActionSelected":
    case "PieceActionTargetSelected":
      return Op.some(state.piece);
  }
};

export const selectedAction = (state: State): Op.Option<O.Action.Action> => {
  switch (state._tag) {
    case "Waiting":
    case "PieceSelected":
      return Op.none;

    case "ActionSelected":
    case "PieceAndActionSelected":
    case "PieceActionTargetSelected":
      return Op.some(state.action);
  }
};

export const selectedTarget = (
  state: State,
): Op.Option<O.Board.Position.Position> => {
  switch (state._tag) {
    case "Waiting":
    case "PieceSelected":
    case "ActionSelected":
    case "PieceAndActionSelected":
      return Op.none;

    case "PieceActionTargetSelected":
      return Op.some(state.target);
  }
};
