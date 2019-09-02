import axios from "axios";

const apiStark = axios.create({
  baseURL: "http://localhost:7071/"
});

export default apiStark;
