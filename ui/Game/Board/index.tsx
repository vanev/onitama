import classnames from "classnames";
import { pipe } from "fp-ts/lib/function";
import * as Op from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import * as O from "../../../Onitama";
import Cell from "./Cell";
import styles from "./Board.module.scss";

type Props = {
  state: O.State.State;
  className?: string;
  selectedPiece: Op.Option<O.Piece.Active>;
  selectedTarget: Op.Option<O.Board.Position.Position>;
  onCellClick?: (position: O.Board.Position.Position) => unknown;
};

const Board = ({
  state,
  className,
  selectedPiece,
  selectedTarget,
  onCellClick = () => {},
}: Props) => {
  const pieces = [...state.red.pieces, ...state.blue.pieces];
  const ranks = A.reverse(O.Board.Rank.all);
  const files = O.Board.File.all;

  return (
    <div className={classnames(styles.Board, className)}>
      {ranks.flatMap((rank) => {
        return files.map((file) => {
          const position: O.Board.Position.Position = [file, rank];

          const piece = pipe(
            pieces,
            A.filter(O.Piece.isActive),
            A.findFirst(O.Piece.isAtPosition(position)),
          );

          const isPieceSelected = pipe(
            [selectedPiece, piece],
            A.sequence(Op.Applicative),
            Op.match(
              () => false,
              ([selected, current]) => O.Piece.Eq.equals(selected, current),
            ),
          );

          const isTarget = pipe(
            selectedTarget,
            Op.match(
              () => false,
              (target) => O.Board.Position.Eq.equals(target, position),
            ),
          );

          return (
            <Cell
              key={O.Board.Position.Show.show(position)}
              position={position}
              piece={piece}
              isPieceSelected={isPieceSelected}
              isTarget={isTarget}
              onClick={() => onCellClick(position)}
            />
          );
        });
      })}
    </div>
  );
};

export default Board;
