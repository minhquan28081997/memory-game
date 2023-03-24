import { IBoard, IPostBoard } from "../card.type";

export const ActionBoardTypes = {
  FETCH_DATA: "FETCH_DATA",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILED: "FETCH_DATA_FAILED",

  FETCH_LOWEST_TURN: "FETCH_LOWEST_TURN",
  FETCH_HIGHEST_TURN: "FETCH_HIGHEST_TURN",
  FETCH_LOWEST_TIME: "FETCH_LOWEST_TIME",

  ADD: "ADD_TO_BOARD",
  ADD_SUCCESS: "ADD_SUCCESS",
  ADD_FAILED: "ADD_FAILED",

  NEXT_TURN: "NEXT_TURN",
  RESET_TURN_TO_ZERO: "RESET_TURN_TO_ZERO",
};

export const fetchData = () => ({
  type: ActionBoardTypes.FETCH_DATA,
});
export const fetchDataSuccess = (payload: IBoard) => ({
  type: ActionBoardTypes.FETCH_DATA_SUCCESS,
  payload,
});
export const fetchDataFailed = () => ({
  type: ActionBoardTypes.FETCH_DATA_FAILED,
});

export const fetchLowestTurn = () => ({
  type: ActionBoardTypes.FETCH_LOWEST_TURN,
});

export const fetchHighestTurn = () => ({
  type: ActionBoardTypes.FETCH_HIGHEST_TURN,
});

export const fetchLowestTime = () => ({
  type: ActionBoardTypes.FETCH_LOWEST_TIME,
});

export const addToBoard = (payload: number): IPostBoard => ({
  type: ActionBoardTypes.ADD,
  payload,
});
export const addToBoardSuccess = (payload: IBoard): IPostBoard => ({
  type: ActionBoardTypes.ADD_SUCCESS,
  payload,
});
export const addToBoardFailed = () => ({ type: ActionBoardTypes.ADD_FAILED });

export const nextTurn = () => ({ type: ActionBoardTypes.NEXT_TURN });

export const resetTurnToZero = () => ({
  type: ActionBoardTypes.RESET_TURN_TO_ZERO,
});
