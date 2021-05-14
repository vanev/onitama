import classnames from "classnames";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import * as A from "fp-ts/lib/Array";
import * as O from "../../../Onitama";
import styles from "./Moves.module.scss";

type Props = {
  moves: NonEmptyArray<O.Action.Move.Move>;
};

const Moves = ({ moves }: Props) => {
  const rankDeltas = [...O.Action.Delta.all];
  const fileDeltas = A.reverse(O.Action.Delta.all);

  return (
    <div className={styles.Moves}>
      {rankDeltas.flatMap((rankDelta) => {
        return fileDeltas.map((fileDelta) => {
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
