import { createSlice } from "@reduxjs/toolkit";

const initialDarkMode = JSON.parse(localStorage.getItem("dark-mode")) || false;
//modal initial state
const initialState = {
  isActive: initialDarkMode,
};

//create slice
const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isActive = !state.isActive;
      localStorage.setItem("dark-mode", JSON.stringify(state.isActive));
    },
  },
});
//export reducer, actions
const { reducer, actions } = darkModeSlice;
export const { toggleDarkMode } = actions;
export default reducer;
