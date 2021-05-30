import * as B from "fp-ts/lib/Bounded";
import File from "./File";
import Ord from "./Ord";

const Bounded: B.Bounded<File> = {
  ...Ord,
  top: "e",
  bottom: "a",
};

export default Bounded;
