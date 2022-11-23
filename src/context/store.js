import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
const reducer = {
  auth: authReducer,
  modal: modalReducer,
};
const store = configureStore({
  reducer,
});

export default store;
