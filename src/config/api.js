import axios from "axios";
import { backendURL } from "../constants";

const api = axios.create({
  baseURL: `${backendURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // allow cookies in all requests
});

export default api;
