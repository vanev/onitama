import * as O from "../../Onitama";
import Board from "./Board";
import Player from "./Player";
import Sideboard from "./Sideboard";
import styles from "./Game.module.scss";

type Props = {
  state: O.State.State;
};

const Game = ({ state }: Props) => {
  return (
    <div className={styles.Game}>
      <Player
        player={state.blue}
        isActive={state.activeColor === "blue"}
        className={styles.Player}
      />

      <Board state={state} className={styles.Board} />

      <Sideboard action={state.sideboard} className={styles.Sideboard} />

      <Player
        player={state.red}
        isActive={state.activeColor === "red"}
        className={styles.Player}
      />
    </div>
  );
};

export default Game;
