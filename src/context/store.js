import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
//combine reducers from slices to form one reducer
const reducer = {
  auth: authReducer,
  modal: modalReducer,
};
//configure store
const store = configureStore({
  reducer,
});

export default store;
