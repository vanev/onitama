import classnames from "classnames";
import * as Op from "fp-ts/lib/Option";
import * as O from "../../../Onitama";
import styles from "./Cell.module.scss";

type Props = {
  position: O.Board.Position.Position;
  piece?: Op.Option<O.Piece.Active.Active>;
  isPieceSelected?: boolean;
  isTarget?: boolean;
  onClick?: () => unknown;
};

const Cell = ({
  position,
  piece = Op.none,
  isPieceSelected = false,
  isTarget = false,
  onClick = () => {},
}: Props) => {
  let color: O.Color.Color | null = null;
  let isKing = false;
  if (Op.isSome(piece)) {
    color = piece.value.color;
    isKing = piece.value.isKing;
  }

  return (
    <div
      className={classnames(styles.Cell, {
        [styles[`_${color}`]]: !!color,
        [styles._king]: isKing,
        [styles._selected]: isPieceSelected,
        [styles._target]: isTarget,
      })}
      title={O.Board.Position.Show.show(position)}
      onClick={onClick}
    />
  );
};

export default Cell;
