import axios from "axios";

const apiStark = axios.create({
  baseURL: process.env.REACT_APP_API_STARK
});

export default apiStark;
