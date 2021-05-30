import * as O from "fp-ts/lib/Ord";
import * as S from "fp-ts/lib/string";
import File from "./File";

const Ord: O.Ord<File> = S.Ord;

export default Ord;
