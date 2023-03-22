import { IBoard } from "../card.type";
import axiosClient from "./axiosClient";

const url = "goalBoard";
const boardApi = {
  getAll() {
    return axiosClient.get(url);
  },
  add(data: IBoard) {
    return axiosClient.post(url, data)
  }
};

export default boardApi;
