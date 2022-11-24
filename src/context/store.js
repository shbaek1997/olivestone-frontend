import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import fileReducer from "./fileSlice";
//combine reducers from slices to form one reducer
const reducer = {
  auth: authReducer,
  modal: modalReducer,
  files: fileReducer,
};
//configure store
const store = configureStore({
  reducer,
});

export default store;
