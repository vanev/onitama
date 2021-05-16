import * as O from "../../Onitama";

export type CellClicked = {
  _tag: "CellClicked";
  position: O.Board.Position.Position;
};
export const cellClicked = (
  position: O.Board.Position.Position,
): CellClicked => ({
  _tag: "CellClicked",
  position,
});

export type ActionClicked = {
  _tag: "ActionClicked";
  action: O.Action.Action;
};
export const actionClicked = (action: O.Action.Action): ActionClicked => ({
  _tag: "ActionClicked",
  action,
});

export type ConfirmButtonClicked = {
  _tag: "ConfirmButtonClicked";
};
export const confirmButtonClicked: ConfirmButtonClicked = {
  _tag: "ConfirmButtonClicked",
};

export type CancelButtonClicked = {
  _tag: "CancelButtonClicked";
};
export const cancelButtonClicked: CancelButtonClicked = {
  _tag: "CancelButtonClicked",
};

export type Action =
  | CellClicked
  | ActionClicked
  | ConfirmButtonClicked
  | CancelButtonClicked;
