import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice";
const reducer = {
  auth: authReducer,
};
const store = configureStore({
  reducer,
});

export default store;
