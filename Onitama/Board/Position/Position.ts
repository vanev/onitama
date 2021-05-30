import { File } from "../File";
import { Rank } from "../Rank";

type Position = [File, Rank];

export const position =
  (file: File) =>
  (rank: Rank): Position =>
    [file, rank];

export default Position;
