import classnames from "classnames";
import * as O from "../../../Onitama";
import Cell from "./Cell";
import styles from "./Board.module.scss";

type Props = {
  state: O.State.State;
  className?: string;
};

const Board = ({ state, className }: Props) => {
  const pieces = [...state.red.pieces, ...state.blue.pieces];

  return (
    <div className={classnames(styles.Board, className)}>
      {O.Board.Position.all.map((position) => {
        const piece = pieces.find(
          (piece: O.Piece.Piece): piece is O.Piece.Active => {
            if (piece._tag === "Captured") return false;

            return O.Board.Position.Eq.equals(piece.position, position);
          },
        );

        return (
          <Cell
            key={O.Board.Position.Show.show(position)}
            position={position}
            piece={piece}
          />
        );
      })}
    </div>
  );
};

export default Board;
