import { combineReducers } from "redux";
import cardReducer from "./cardReducer";
import boardReducer from "./boardReducer";

const rootReducer = combineReducers({
  card: cardReducer,
  board: boardReducer
});

export default rootReducer;
