import { useReducer } from "react";
import * as O from "../../Onitama";
import Board from "./Board";
import Player from "./Player";
import Sideboard from "./Sideboard";
import * as State from "./State";
import * as Action from "./Action";
import reducer from "./reducer";
import styles from "./Game.module.scss";

type Props = {
  initialState: O.State.State;
};

const Game = ({ initialState }: Props) => {
  const initial: State.State = State.waiting(initialState);
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <div className={styles.Game}>
      {state._tag === "PieceActionTargetSelected" ? (
        <div className={styles.Confirmation}>
          Confirm Move:
          <button onClick={() => dispatch(Action.confirmButtonClicked)}>
            ✔️
          </button>
          <button onClick={() => dispatch(Action.cancelButtonClicked)}>
            ❌
          </button>
        </div>
      ) : null}

      <Player
        player={state.game.red}
        isActive={state.game.activeColor === "red"}
        className={styles.Player}
        selectedAction={State.selectedAction(state)}
        onActionClick={(action) => dispatch(Action.actionClicked(action))}
      />

      <Board
        state={state.game}
        className={styles.Board}
        selectedPiece={State.selectedPiece(state)}
        selectedTarget={State.selectedTarget(state)}
        onCellClick={(position) => dispatch(Action.cellClicked(position))}
      />

      <Sideboard action={state.game.sideboard} className={styles.Sideboard} />

      <Player
        player={state.game.blue}
        isActive={state.game.activeColor === "blue"}
        className={styles.Player}
        selectedAction={State.selectedAction(state)}
        onActionClick={(action) => dispatch(Action.actionClicked(action))}
      />
    </div>
  );
};

export default Game;
