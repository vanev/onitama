import * as G from "fp-ts/lib/Group";
import * as D from "../Delta";
import Move from "./Move";
import Monoid from "./Monoid";

const Group: G.Group<Move> = {
  ...Monoid,
  inverse: ([fileDelta, rankDelta]) => [
    D.Group.inverse(fileDelta),
    D.Group.inverse(rankDelta),
  ],
};

export default Group;
