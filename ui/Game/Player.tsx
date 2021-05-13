import classnames from "classnames";
import * as O from "../../Onitama";
import Action from "./Action";
import styles from "./Player.module.scss";

type Props = {
  player: O.Player.Player;
  isActive: boolean;
  className?: string;
};

const PlayerActions = ({ player, isActive, className }: Props) => {
  const { actions, color } = player;
  const [a, b] = actions;

  return (
    <div
      className={classnames(
        styles.Player,
        styles[`_${color}`],
        {
          [styles._active]: isActive,
        },
        className,
      )}
    >
      <Action action={a} className={styles.Action} />
      <Action action={b} className={styles.Action} />
    </div>
  );
};

export default PlayerActions;
