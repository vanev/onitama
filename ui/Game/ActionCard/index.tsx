import classnames from "classnames";
import * as O from "../../../Onitama";
import Moves from "./Moves";
import styles from "./ActionCard.module.scss";

type Props = {
  className?: string;
  action: O.Action.Action;
  onClick?: () => unknown;
};

const ActionCard = ({ className, action, onClick = () => {} }: Props) => {
  return (
    <div className={classnames(styles.ActionCard, className)} onClick={onClick}>
      <span>{action.name}</span>

      <Moves moves={action.moves} />
    </div>
  );
};

export default ActionCard;
