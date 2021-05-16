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
  O.Action.action("Test 1", [[0, -1]], "blue"),
  O.Action.action("Test 2", [[0, 2]], "red"),
  O.Action.action("Test 3", [[1, 1]], "blue"),
  O.Action.action("Test 4", [[-1, 1]], "red"),
  O.Action.action("Test 5", [[-1, 2]], "blue"),
];

const GamePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main className="Page _game">
      <h1>Game Id: {id}</h1>

      <Game initialState={O.State.initial(actions)} />
    </main>
  );
};

export default GamePage;
