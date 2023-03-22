import moment from "moment";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
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
import { IBoard, IPostBoard } from "../card.type";
import { RootState } from "./store";

function* getLowestTurns() {
  const { data } = yield call(boardApi.getAll);
  const newData = data
    .map((item: IBoard) => ({
      id: item.id,
      createdAt: item.createdAt,
      turns: item.turns,
    }))
    .sort((a: IBoard, b: IBoard) => a.turns - b.turns)
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
    .sort((a: IBoard, b: IBoard) => b.turns - a.turns)
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
    .sort((a: IBoard, b: IBoard) => a.time - b.time)
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
    yield put(fetchData())
  } catch (error) {
    yield put(addToBoardFailed());
  }
}

export function* getBoardSaga() {
  yield takeLatest(ActionBoardTypes.FETCH_DATA, fetchBoardData);
  yield takeLatest(ActionBoardTypes.ADD, postBoardData);
}
