import { combineReducers } from "redux";
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({
  card: cardReducer,
});

export default rootReducer;
