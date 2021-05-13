import classnames from "classnames";
import * as O from "../../../Onitama";
import styles from "./Moves.module.scss";

type Props = {
  moves: Array<O.Action.Move.Move>;
};

const Moves = ({ moves }: Props) => {
  return (
    <div className={styles.Moves}>
      {O.Action.Delta.all.flatMap((rankDelta) => {
        return O.Action.Delta.all.reverse().map((fileDelta) => {
          const move = moves.find(
            ([f, r]) => f === fileDelta && r === rankDelta,
          );

          const isCenter = rankDelta === 0 && fileDelta === 0;

          return (
            <div
              className={classnames(styles.Move, {
                [styles._active]: !!move,
                [styles._center]: isCenter,
              })}
              key={`${rankDelta}${fileDelta}`}
            />
          );
        });
      })}
    </div>
  );
};

export default Moves;
