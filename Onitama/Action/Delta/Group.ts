import * as G from "fp-ts/lib/Group";
import Delta from "./Delta";
import Monoid from "./Monoid";

const Group: G.Group<Delta> = {
  ...Monoid,
  inverse: (delta) => {
    switch (delta) {
      case -2:
        return 2;
      case -1:
        return 1;
      case 0:
        return 0;
      case 1:
        return -1;
      case 2:
        return -2;
    }
  },
};

export default Group;
