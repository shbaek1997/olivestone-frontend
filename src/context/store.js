import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import fileReducer from "./fileSlice";
import darkModeReducer from "./darkModeSlice";
import userReducer from "./userSlice";
//combine reducers from slices to form one reducer
const reducer = {
  auth: authReducer,
  modal: modalReducer,
  files: fileReducer,
  darkMode: darkModeReducer,
  users: userReducer,
};
//configure store
const store = configureStore({
  reducer,
});

export default store;
