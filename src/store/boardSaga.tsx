import moment from "moment";
import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  ActionBoardTypes,
  addToBoardFailed,
  addToBoardSuccess,
  fetchData,
  fetchDataFailed,
  fetchDataSuccess,
  fetchHighestTurn,
  fetchLowestTime,
  fetchLowestTurn,
} from "../actions/boardAction";
import boardApi from "../api/boardAPI";
import { IPostBoard } from "../card.type";
import { RootState } from "./store";

function* fetchBoardData() {
  const { data } = yield call(boardApi.getAll);

  try {
    yield put(fetchDataSuccess(data));
    yield put(fetchLowestTurn());
    yield put(fetchHighestTurn());
    yield put(fetchLowestTime());
  } catch (error) {
    yield put(fetchDataFailed());
  }
}

function* postBoardData({ payload }: IPostBoard) {
  const getTurns = (state: RootState) => state.board.turns;
  const turns: number = yield select(getTurns);

  const data = {
    id: Math.random(),
    turns: turns,
    time: payload,
    createdAt: moment().format(),
  };

  try {
    yield call(boardApi.add, data);
    yield put(addToBoardSuccess(data));
    yield put(fetchData());
  } catch (error) {
    yield put(addToBoardFailed());
  }
}

export function* getBoardSaga() {
  yield takeLatest(ActionBoardTypes.FETCH_DATA, fetchBoardData);
  yield takeLatest(ActionBoardTypes.ADD, postBoardData);
}
