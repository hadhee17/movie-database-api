import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", // backend URL
});
export default api;
