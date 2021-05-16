import * as A from "fp-ts/lib/Array";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { flow } from "fp-ts/lib/function";
import * as Action from "../Action";
import * as Player from "../Player";
import * as Piece from "../Piece";
import * as Board from "../Board";
import * as Color from "../Color";
import * as State from "./index";

const pieceOwnershipValidation =
  (piece: Piece.Active) =>
  (state: State.State): E.Either<string, State.State> => {
    const activeColor = State.activeColor(state);
    const pieceColor = Piece.color(piece);

    if (pieceColor === activeColor) return E.right(state);

    return E.left("PieceOwnershipError");
  };

const actionOwnershipValidation =
  (action: Action.Action) =>
  (state: State.State): E.Either<string, State.State> => {
    const activePlayer = State.activePlayer(state);
    const hasAction = Player.hasAction(action)(activePlayer);

    if (hasAction) return E.right(state);

    return E.left("ActionOwnershipError");
  };

const impossibleTargetValidation =
  (
    piece: Piece.Active,
    action: Action.Action,
    target: Board.Position.Position,
  ) =>
  (state: State.State): E.Either<string, State.State> => {
    const moves = Piece.moves(action)(piece);
    const foundMove = A.findFirst((move: Board.Position.Position) =>
      Board.Position.Eq.equals(move, target),
    )(moves);

    if (O.isSome(foundMove)) return E.right(state);

    return E.left("ImpossibleTargetError");
  };

const targetOccupiedValidation =
  (target: Board.Position.Position) =>
  (state: State.State): E.Either<string, State.State> => {
    const activePlayer = State.activePlayer(state);
    const foundPiece = Player.findPieceByPosition(target)(activePlayer);

    if (O.isNone(foundPiece)) return E.right(state);

    return E.left("TargetOccupiedError");
  };

const updateActivePlayer =
  (
    piece: Piece.Active,
    action: Action.Action,
    target: Board.Position.Position,
    sideboard: Action.Action,
  ) =>
  (player: Player.Player): Player.Player => {
    const pieces = Player.pieces(player);

    const selectedPieceIndex = A.findIndex((p: Piece.Piece) =>
      Piece.Eq.equals(piece, p),
    )(pieces);

    if (O.isNone(selectedPieceIndex)) return player;

    const updatedPieces = A.modifyAt<Piece.Piece>(
      selectedPieceIndex.value,
      (p: Piece.Piece) => {
        if (p._tag === "Captured") return p;
        return Piece.active(p.color, target, p.isKing);
      },
    )(pieces);

    if (O.isNone(updatedPieces)) return player;

    const [pieceA, pieceB, pieceC, pieceD, pieceE] = updatedPieces.value;

    const unusedAction = player.actions.find((playerAction) => {
      return !Action.Eq.equals(playerAction, action);
    });

    if (!unusedAction) return player;

    return {
      pieces: [pieceA, pieceB, pieceC, pieceD, pieceE],
      color: player.color,
      actions: [unusedAction, sideboard],
    };
  };

const updateInactivePlayer =
  (target: Board.Position.Position) =>
  (player: Player.Player): Player.Player => {
    const pieces = Player.pieces(player);

    const piece = Player.findPieceByPosition(target)(player);

    if (O.isNone(piece)) return player;

    const capturedPieceIndex = A.findIndex((p: Piece.Piece) =>
      Piece.Eq.equals(piece.value, p),
    )(pieces);

    if (O.isNone(capturedPieceIndex)) return player;

    const updatedPieces = A.modifyAt<Piece.Piece>(
      capturedPieceIndex.value,
      (p: Piece.Piece) => Piece.captured(p.color),
    )(pieces);

    if (O.isNone(updatedPieces)) return player;

    const [pieceA, pieceB, pieceC, pieceD, pieceE] = updatedPieces.value;

    return {
      pieces: [pieceA, pieceB, pieceC, pieceD, pieceE],
      color: player.color,
      actions: player.actions,
    };
  };

const performMove = (
  piece: Piece.Active,
  action: Action.Action,
  target: Board.Position.Position,
): ((state: State.State) => E.Either<string, State.State>) =>
  flow(
    pieceOwnershipValidation(piece),
    E.chain(actionOwnershipValidation(action)),
    E.chain(impossibleTargetValidation(piece, action, target)),
    E.chain(targetOccupiedValidation(target)),
    E.map((state) => {
      // update piece position to target
      // switch action for sideboard action
      // switch active color
      const activeColor = State.activeColor(state);
      const activePlayer = State.activePlayer(state);

      const updatedActivePlayer = updateActivePlayer(
        piece,
        action,
        target,
        state.sideboard,
      )(activePlayer);

      const inactiveColor = Color.inverse(activeColor);
      const inactivePlayer = State.getPlayerByColor(inactiveColor)(state);
      const updatedInactivePlayer =
        updateInactivePlayer(target)(inactivePlayer);

      const updatedState: State.State = {
        ...state,
        [inactiveColor]: updatedInactivePlayer,
        [activeColor]: updatedActivePlayer,
        sideboard: action,
        activeColor: inactiveColor,
      };

      return updatedState;
    }),
  );

export default performMove;
