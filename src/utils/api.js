import axios from "axios";
import getUserToken from "./getUserToken";
const BASE_URL = "http://localhost:5000";

//function for using axios api
const Api = () => {
  //get jwt token from session storage
  const token = getUserToken();
  // create axios instance with base server
  //config=> url = localhost 5000, Authorization header bearer token
  const myApi = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
  // return axios instance
  return myApi;
};

export default Api;
