import moment from "moment";
import { AnyAction } from "redux";
import { ActionBoardTypes } from "../actions/boardAction";
import { IBoard } from "../card.type";

interface BoardType {
  loading: boolean;
  lowestTurn: IBoard[];
  highestTurn: IBoard[];
  lowestTime: IBoard[];

  currentBoard: IBoard[];
  turns: number;
}

const initialState: BoardType = {
  loading: false,
  lowestTurn: [],
  highestTurn: [],
  lowestTime: [],

  currentBoard: [],
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
      return {
        ...state,
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
      const newData = action.payload;
      return {
        ...state,
        lowestTurn: newData,
      };
    }

    case ActionBoardTypes.FETCH_HIGHEST_TURN: {
      const newData = action.payload;
      return {
        ...state,
        highestTurn: newData,
      };
    }

    case ActionBoardTypes.FETCH_LOWEST_TIME: {
      const newData = action.payload;
      return {
        ...state,
        lowestTime: newData,
      };
    }

    case ActionBoardTypes.ADD: {
      const newData = [...state.currentBoard];
      newData.push({
        id: Math.random(),
        turns: state.turns,
        time: action.payload,
        createdAt: moment().format()
      });

      return {
        ...state,
        currentBoard: newData,
      };
    }

    case ActionBoardTypes.NEXT_TURN: {
      return {
        ...state,
        turns: state.turns + 1,
      };
    }

    case ActionBoardTypes.RESET_TURN: {
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
