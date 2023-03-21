import { IBoard } from "../card.type";

export const ActionBoardTypes = {
  FETCH_DATA: "FETCH_DATA",
  FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILED: "FETCH_DATA_FAILED",

  FETCH_LOWEST_TURN: "FETCH_LOWEST_TURN",
  FETCH_HIGHEST_TURN: "FETCH_HIGHEST_TURN",
  FETCH_LOWEST_TIME: "FETCH_LOWEST_TIME",

  ADD: "ADD_TO_BOARD",
  NEXT_TURN: "NEXT_TURN",
  RESET_TURN: "RESET_TURN",
};

export const fetchData = () => ({
  type: ActionBoardTypes.FETCH_DATA,
});
export const fetchDataSuccess = () => ({
  type: ActionBoardTypes.FETCH_DATA_SUCCESS,
});
export const fetchDataFailed = () => ({
  type: ActionBoardTypes.FETCH_DATA_FAILED,
});

export const fetchLowestTurn = (payload: IBoard) => ({
  type: ActionBoardTypes.FETCH_LOWEST_TURN,
  payload,
});

export const fetchHighestTurn = (payload: IBoard) => ({
  type: ActionBoardTypes.FETCH_HIGHEST_TURN,
  payload,
});

export const fetchLowestTime = (payload: IBoard) => ({
  type: ActionBoardTypes.FETCH_LOWEST_TIME,
  payload,
});

export const addToBoard = (payload: number) => ({
  type: ActionBoardTypes.ADD,
  payload,
});

export const nextTurn = () => ({ type: ActionBoardTypes.NEXT_TURN });

export const resetTurnToZero = () => ({ type: ActionBoardTypes.RESET_TURN });
