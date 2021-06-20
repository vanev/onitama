import { Captured } from "./Captured";
import Piece from "./Piece";

const isCaptured = (p: Piece): p is Captured => p._tag === "Captured";

export default isCaptured;
