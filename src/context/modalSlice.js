import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  files: [],
  fileId: "",
  modalMode: "",
};
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

const { reducer, actions } = modalSlice;
export const { turnOff, turnOn, setFiles, setFileId, setModalMode } = actions;
export default reducer;
