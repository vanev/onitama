import { Active } from "./Active";
import Piece from "./Piece";

const isActive = (p: Piece): p is Active => p._tag === "Active";

export default isActive;
