import { useState } from "react";
import { useRouter } from "next/router";
import * as O from "../../Onitama";
import Game from "../../ui/Game";

const actions: [
  O.Action.Action,
  O.Action.Action,
  O.Action.Action,
  O.Action.Action,
  O.Action.Action,
] = [
  O.Action.action("Test 1", [[1, 0]], "blue"),
  O.Action.action("Test 2", [[2, 0]], "red"),
  O.Action.action("Test 3", [[1, 1]], "blue"),
  O.Action.action("Test 4", [[1, 0]], "red"),
  O.Action.action("Test 5", [[-1, 2]], "blue"),
];

const GamePage = () => {
  const [state, setState] = useState<O.State.State>(O.State.initial(actions));
  const router = useRouter();
  const { id } = router.query;

  return (
    <main className="Page _game">
      <h1>Game Id: {id}</h1>

      <Game state={state} />
    </main>
  );
};

export default GamePage;
