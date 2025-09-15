import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // use the environment variable for backend URL
  withCredentials: true, // backend URL
});
export default api;
