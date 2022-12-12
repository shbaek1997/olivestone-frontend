import { createSlice } from "@reduxjs/toolkit";

//modal initial state
const initialState = {
  isActive: false,
  isAlertActive: false,
  id: "",
  modalMode: "",
  alertModalContent: "",
  clickedUserRole: "",
};

//create slice
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // turn on modal
    turnOn: (state) => {
      state.isActive = true;
    },
    // turn off modal
    turnOff: (state) => {
      state.isActive = false;
    },
    turnAlertOn: (state, action) => {
      state.alertModalContent = action.payload;
      state.isAlertActive = true;
    },
    turnAlertOff: (state) => {
      state.isAlertActive = false;
    },
    // set file id for modal
    setId: (state, action) => {
      state.id = action.payload;
    },
    setClickedUserRole: (state, action) => {
      state.clickedUserRole = action.payload;
    },
    //set modal mode
    setModalMode: (state, action) => {
      state.modalMode = action.payload;
    },
  },
});
//export reducer, actions
const { reducer, actions } = modalSlice;
export const {
  turnOff,
  turnOn,
  setId,
  setModalMode,
  setAlertModalContent,
  turnAlertOff,
  turnAlertOn,
  setClickedUserRole,
} = actions;
export default reducer;
