import axios from "axios";
import getUserToken from "./getUserToken";
const BASE_URL = "http://localhost:5000";
const token = getUserToken();
const api = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
