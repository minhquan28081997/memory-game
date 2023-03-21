import { all } from "redux-saga/effects";
import { getBoardSaga } from "./boardSaga";

export function* rootSaga() {
  yield all([getBoardSaga()]);
}
