import { createSlice } from "@reduxjs/toolkit";

//get initial state from local storage
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
    //if dark=>light, if light => dark
    toggleDarkMode: (state) => {
      state.isActive = !state.isActive;
      // set local storage after changing the mode
      localStorage.setItem("dark-mode", JSON.stringify(state.isActive));
    },
  },
});
//export reducer, actions
const { reducer, actions } = darkModeSlice;
export const { toggleDarkMode } = actions;
export default reducer;
