import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://64182e6329e7e36438e13a56.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
