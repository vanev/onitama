import { combinations } from "../../../lib/Array.Extra";
import { all as allFiles } from "../File";
import { all as allRanks } from "../Rank";
import Position from "./Position";

const all: Array<Position> = combinations(allFiles, allRanks);

export default all;
