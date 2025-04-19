import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:8800";
const api = axios.create({
  baseURL: `${BASE}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;
