import classnames from "classnames";
import * as O from "../../../Onitama";
import styles from "./Cell.module.scss";

type Props = {
  position: O.Board.Position.Position;
  piece?: O.Piece.Active;
};

const Cell = ({ position, piece }: Props) => {
  let color;
  let isKing;
  if (piece) {
    color = piece.color;
    isKing = piece.isKing;
  }

  return (
    <div
      className={classnames(styles.Cell, {
        [styles[`_${color}`]]: !!color,
        [styles._king]: isKing,
      })}
      title={O.Board.Position.Show.show(position)}
    />
  );
};

export default Cell;
