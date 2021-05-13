import classnames from "classnames";
import * as O from "../../../Onitama";
import Moves from "./Moves";
import styles from "./Action.module.scss";

type Props = {
  className?: string;
  action: O.Action.Action;
};

const Action = ({ className, action }: Props) => {
  return (
    <div className={classnames(styles.Action, className)}>
      <span>{action.name}</span>

      <Moves moves={action.moves} />
    </div>
  );
};

export default Action;
