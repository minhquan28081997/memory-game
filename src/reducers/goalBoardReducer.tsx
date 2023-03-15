import { AnyAction } from "redux";
import { ActionGoalBoardTypes } from "../actions/goalBoardAction";

interface GoalBoardType {
  goalBoard: number[];
  turn: number;
}

const initialState: GoalBoardType = {
  goalBoard: [],
  turn: 0,
};

const goalBoardReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionGoalBoardTypes.ADD: {
      const newData = [...state.goalBoard];
      if (state.turn !== 0) {
        newData.push(state.turn);
      }

      return {
        ...state,
        goalBoard: newData,
      };
    }

    case ActionGoalBoardTypes.NEXTTURN: {
      return {
        ...state,
        turn: state.turn + 1,
      };
    }

    case ActionGoalBoardTypes.RESETTURN: {
      return {
        ...state,
        turn: 0,
      };
    }

    default:
      return state;
  }
};

export default goalBoardReducer;
