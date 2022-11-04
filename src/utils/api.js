import axios from "axios";
import getUserToken from "./getUserToken";
const BASE_URL = "http://localhost:5000";

const Api = () => {
  const token = getUserToken();
  const myApi = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
  return myApi;
};

export default Api;
