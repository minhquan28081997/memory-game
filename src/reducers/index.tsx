import { combineReducers } from "redux";
import cardReducer from "./cardReducer";
import goalBoardReducer from "./goalBoardReducer";

const rootReducer = combineReducers({
  card: cardReducer,
  goalBoard: goalBoardReducer
});

export default rootReducer;
