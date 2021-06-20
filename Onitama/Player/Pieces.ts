import { Piece } from "../Piece";
import Player from "./Player";

type Pieces = [Piece, Piece, Piece, Piece, Piece];

export const pieces = (player: Player): Pieces => player.pieces;

export default Pieces;
