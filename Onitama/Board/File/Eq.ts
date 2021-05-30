import * as E from "fp-ts/lib/Eq";
import * as S from "fp-ts/lib/string";
import File from "./File";

const Eq: E.Eq<File> = S.Eq;

export default Eq;
