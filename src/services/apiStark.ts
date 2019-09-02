import axios from "axios";

const apiStark = axios.create({
  baseURL: "http://localhost:7071/"
  // baseURL: 'https://api-stark-dev.azurewebsites.net/'
});

export default apiStark;
