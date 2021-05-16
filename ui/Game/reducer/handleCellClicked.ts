import * as Op from "fp-ts/lib/Option";
import { flow } from "fp-ts/lib/function";
import * as O from "../../../Onitama";
import * as State from "../State";
import * as Action from "../Action";

const getActivePlayerPieceAtPosition = (
  position: O.Board.Position.Position,
): ((state: State.State) => Op.Option<O.Piece.Active>) =>
  flow(
    State.game,
    O.State.activePlayer,
    O.Player.findPieceByPosition(position),
  );

const handleCellClicked = (
  state: State.State,
  action: Action.CellClicked,
): State.State => {
  const piece = getActivePlayerPieceAtPosition(action.position)(state);

  switch (state._tag) {
    case "Waiting":
    case "PieceSelected": {
      if (Op.isSome(piece)) {
        return State.pieceSelected(piece.value, state.game);
      }

      return state;
    }

    case "ActionSelected": {
      if (Op.isSome(piece)) {
        return State.pieceAndActionSelected(
          piece.value,
          state.action,
          state.game,
        );
      }

      return state;
    }

    case "PieceAndActionSelected": {
      if (Op.isSome(piece)) {
        return State.pieceAndActionSelected(
          piece.value,
          state.action,
          state.game,
        );
      }

      return State.pieceActionTargetSelected(
        state.piece,
        state.action,
        action.position,
        state.game,
      );
    }

    case "PieceActionTargetSelected": {
      if (Op.isSome(piece)) {
        return State.pieceAndActionSelected(
          piece.value,
          state.action,
          state.game,
        );
      }

      return State.pieceActionTargetSelected(
        state.piece,
        state.action,
        action.position,
        state.game,
      );
    }
  }
};

export default handleCellClicked;
