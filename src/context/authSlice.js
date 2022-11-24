import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../utils/api";

//create async thunk to validate user using jwt token in session storage
export const fetchUserByJWT = createAsyncThunk("auth/checkJWT", async () => {
  const api = Api();
  const response = await api.get(`/users/auth`);
  return response.data;
});

//create async thunk for user login
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const api = Api();
      const response = await api.post("users/login", {
        username,
        password,
      });
      //if successful , we set jwt token in sessionStorage
      const { token } = response?.data;
      sessionStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      //if fail, we reject with thunk api to show user error message
      return thunkAPI.rejectWithValue(error.response.data.reason);
    }
  }
);

//async thunk for user logout
export const userLogout = createAsyncThunk("auth/logout", async () => {
  sessionStorage.removeItem("token");
  return;
});

const initialState = {
  isLoggedIn: false,
};

//slice name: auth
//actions: change isLoggedIn state
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserByJWT.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    });
    builder.addCase(fetchUserByJWT.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
    });
  },
});

//export reducer
const { reducer } = authSlice;
export default reducer;
