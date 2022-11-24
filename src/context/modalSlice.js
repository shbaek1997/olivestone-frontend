import { createSlice } from "@reduxjs/toolkit";

//modal initial state
const initialState = {
  isActive: false,
  files: [],
  fileId: "",
  modalMode: "",
};

//create slice
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    turnOn: (state) => {
      state.isActive = true;
    },
    turnOff: (state) => {
      state.isActive = false;
    },
    setFiles: (state, action) => {
      state.files = [...action.payload];
    },
    setFileId: (state, action) => {
      state.fileId = action.payload;
    },
    setModalMode: (state, action) => {
      state.modalMode = action.payload;
    },
  },
});
//export reducer, actions
const { reducer, actions } = modalSlice;
export const { turnOff, turnOn, setFiles, setFileId, setModalMode } = actions;
export default reducer;
