import classnames from "classnames";
import * as O from "../../Onitama";
import Action from "./Action";
import styles from "./Sideboard.module.scss";

type Props = {
  action: O.Action.Action;
  className?: string;
};

const Sideboard = ({ action, className }: Props) => {
  return (
    <div className={classnames(styles.Sideboard, className)}>
      <Action action={action} />
    </div>
  );
};

export default Sideboard;
