import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  ActionBoardTypes,
  fetchDataFailed,
  fetchDataSuccess,
  fetchHighestTurn,
  fetchLowestTime,
  fetchLowestTurn,
} from "../actions/boardAction";
import boardApi from "../api/boardAPI";
import { IBoard } from "../card.type";

function* getLowestTurns() {
  const { data } = yield call(boardApi.getAll);
  const newData = data
    .map((item: IBoard) => ({
      id: item.id,
      createdAt: item.createdAt,
      turns: item.turns,
    }))
    .sort((a: any, b: any) => a.turns - b.turns)
    .splice(0, 5);
  yield put(fetchLowestTurn(newData));
}

function* getHighestTurn() {
  const { data } = yield call(boardApi.getAll);
  const newData = data
    .map((item: IBoard) => ({
      id: item.id,
      createdAt: item.createdAt,
      turns: item.turns,
    }))
    .sort((a: any, b: any) => b.turns - a.turns)
    .splice(0, 5);
  yield put(fetchHighestTurn(newData));
}

function* getLowestTime() {
  const { data } = yield call(boardApi.getAll);
  const newData = data
    .map((item: IBoard) => ({
      id: item.id,
      createdAt: item.createdAt,
      time: item.time,
    }))
    .sort((a: any, b: any) => a.time - b.time)
    .splice(0, 5);
  yield put(fetchLowestTime(newData));
}

function* fetchBoardData() {
  try {
    yield all([
      call(getLowestTurns),
      call(getHighestTurn),
      call(getLowestTime),
    ]);
    yield put(fetchDataSuccess());
  } catch (error) {
    yield put(fetchDataFailed());
  }
}

export function* getBoardSaga() {
  yield takeLatest(ActionBoardTypes.FETCH_DATA, fetchBoardData);
}
