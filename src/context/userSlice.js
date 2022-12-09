import { createSlice } from "@reduxjs/toolkit";
//files initial state
const initialState = {
  users: [],
};

//create slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //set files
    setUsers: (state, action) => {
      state.users = [...action.payload];
    },
  },
});
//export reducer, actions
const { reducer, actions } = usersSlice;
export const { setUsers } = actions;
export default reducer;
