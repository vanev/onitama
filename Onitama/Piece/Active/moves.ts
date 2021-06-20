import { reduce } from "fp-ts/lib/Array";
import * as Board from "../../Board";
import * as Action from "../../Action";
import { Active } from ".";

const moves =
  (action: Action.Action) =>
  ({ color, position }: Active): Array<Board.Position.Position> => {
    const reducer = (
      positions: Array<Board.Position.Position>,
      move: Action.Move.Move,
    ): Array<Board.Position.Position> => {
      if (color === "red") {
        move = Action.Move.Group.inverse(move);
      }

      const newPosition = Board.Position.applyMove(move)(position);

      if (newPosition._tag === "Left") return positions;

      return [...positions, newPosition.right];
    };

    return reduce([], reducer)(action.moves);
  };

export default moves;
