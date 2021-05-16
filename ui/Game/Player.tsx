import classnames from "classnames";
import * as Op from "fp-ts/lib/Option";
import * as O from "../../Onitama";
import ActionCard from "./ActionCard";
import styles from "./Player.module.scss";

type Props = {
  player: O.Player.Player;
  isActive: boolean;
  className?: string;
  selectedAction: Op.Option<O.Action.Action>;
  onActionClick?: (action: O.Action.Action) => unknown;
};

const PlayerActions = ({
  player,
  isActive,
  className,
  selectedAction,
  onActionClick = () => {},
}: Props) => {
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
      <ActionCard
        action={a}
        className={styles.Action}
        isSelected={
          selectedAction._tag === "Some"
            ? O.Action.Eq.equals(a, selectedAction.value)
            : false
        }
        onClick={() => onActionClick(a)}
      />
      <ActionCard
        action={b}
        className={styles.Action}
        isSelected={
          selectedAction._tag === "Some"
            ? O.Action.Eq.equals(b, selectedAction.value)
            : false
        }
        onClick={() => onActionClick(b)}
      />
    </div>
  );
};

export default PlayerActions;
