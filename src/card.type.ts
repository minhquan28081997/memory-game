import { ActionBoardTypes } from "./actions/boardAction";

export interface CardInterface {
  id: number;
  src: string;
  value: number;
  match: boolean;
}

export interface IBoard {
  id?: number;
  turns: number;
  time: number;
  createdAt?: any;
}

export interface IPostBoard {
  type:
    | typeof ActionBoardTypes.ADD
    | typeof ActionBoardTypes.ADD_FAILED
    | typeof ActionBoardTypes.ADD_SUCCESS;
  payload?: IBoard | any;
}
