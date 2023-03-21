import axiosClient from "./axiosClient";

const url = "goalBoard";
const boardApi = {
  getAll() {
    return axiosClient.get(url);
  },
};

export default boardApi;
