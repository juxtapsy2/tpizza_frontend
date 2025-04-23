import axios from "axios";

const isDev = process.env.NODE_ENV !== "production";
const BASE = isDev ? "http://localhost:8800" : process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: `${BASE}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
