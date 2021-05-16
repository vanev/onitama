import classnames from "classnames";
import * as O from "../../../Onitama";
import Moves from "./Moves";
import styles from "./ActionCard.module.scss";

type Props = {
  className?: string;
  action: O.Action.Action;
  isSelected?: boolean;
  onClick?: () => unknown;
};

const ActionCard = ({
  className,
  action,
  isSelected = false,
  onClick = () => {},
}: Props) => {
  return (
    <div
      className={classnames(styles.ActionCard, className, {
        [styles._selected]: isSelected,
      })}
      onClick={onClick}
    >
      <span>{action.name}</span>

      <Moves moves={action.moves} />
    </div>
  );
};

export default ActionCard;
