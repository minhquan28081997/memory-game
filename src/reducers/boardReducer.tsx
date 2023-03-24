import { AnyAction } from "redux";
import { ActionBoardTypes } from "../actions/boardAction";
import { IBoard } from "../card.type";

interface BoardType {
  loading: boolean;
  board: IBoard[];
  currentBoard: IBoard[];

  lowestTurn: IBoard[];
  highestTurn: IBoard[];
  lowestTime: IBoard[];
  turns: number;
}

const initialState: BoardType = {
  loading: false,
  board: [],
  currentBoard: [],

  lowestTurn: [],
  highestTurn: [],
  lowestTime: [],
  turns: 0,
};

const boardReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionBoardTypes.FETCH_DATA: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionBoardTypes.FETCH_DATA_SUCCESS: {
      const board = action.payload;
      return {
        ...state,
        board,
        loading: false,
      };
    }
    case ActionBoardTypes.FETCH_DATA_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionBoardTypes.FETCH_LOWEST_TURN: {
      const lowestTurn = state.board
        .sort((a: IBoard, b: IBoard) => a.turns - b.turns)
        .slice(0, 5);
      return {
        ...state,
        lowestTurn,
      };
    }

    case ActionBoardTypes.FETCH_HIGHEST_TURN: {
      const highestTurn = state.board
        .sort((a: IBoard, b: IBoard) => b.turns - a.turns)
        .slice(0, 5);
      return {
        ...state,
        highestTurn,
      };
    }

    case ActionBoardTypes.FETCH_LOWEST_TIME: {
      const lowestTime = state.board
        .sort((a: IBoard, b: IBoard) => a.time - b.time)
        .slice(0, 5);
      return {
        ...state,
        lowestTime,
      };
    }

    case ActionBoardTypes.ADD: {
      return {
        ...state,
        loading: true,
      };
    }
    case ActionBoardTypes.ADD_SUCCESS: {
      const currentBoard = [...state.currentBoard, action.payload];
      return {
        ...state,
        loading: false,
        currentBoard,
      };
    }
    case ActionBoardTypes.ADD_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionBoardTypes.NEXT_TURN: {
      return {
        ...state,
        turns: state.turns + 1,
      };
    }

    case ActionBoardTypes.RESET_TURN_TO_ZERO: {
      return {
        ...state,
        turns: 0,
      };
    }

    default:
      return state;
  }
};

export default boardReducer;
