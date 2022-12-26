import { createSlice } from "@reduxjs/toolkit";
import CompareFunctions from "../utils/sort";
//files initial state
const initialState = {
  users: [],
};
const compareService = new CompareFunctions();

//create slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //set users
    setUsers: (state, action) => {
      state.users = [...action.payload];
    },
    //sort users
    sortUsersNameAlph: (state, action) => {
      const alphNameSortedUsers = [...action.payload].sort(
        compareService.compareAlphUserName
      );
      state.users = [...alphNameSortedUsers];
    },
    sortUsersEmailAlph: (state, action) => {
      const alphEmailSortedUsers = [...action.payload].sort(
        compareService.compareAlphUserEmail
      );
      state.users = [...alphEmailSortedUsers];
    },
    sortUsersRoleAlph: (state, action) => {
      const alphRoleSortedUsers = [...action.payload].sort(
        compareService.compareAlphUserRole
      );
      state.users = [...alphRoleSortedUsers];
    },
    sortUsersUploadDate: (state, action) => {
      const uploadDateSortedUsers = [...action.payload].sort(
        compareService.compareUploadDate
      );
      state.users = [...uploadDateSortedUsers];
    },
  },
});
//export reducer, actions
const { reducer, actions } = usersSlice;
export const {
  setUsers,
  sortUsersNameAlph,
  sortUsersEmailAlph,
  sortUsersUploadDate,
  sortUsersRoleAlph,
} = actions;
export default reducer;
