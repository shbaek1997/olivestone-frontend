import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//user 정보는 사용x, 따라서 걍 isLoggedIn: true/false 정도로 해보자...
//login async thunk 만들기..
import Api from "../utils/api";

export const fetchUserByJWT = createAsyncThunk("auth/checkJWT", async () => {
  //밖에 인스턴스를 만들었던게 큰 버그였음...
  const api = Api();
  const response = await api.get(`/users/auth`);
  return response.data;
});
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const api = Api();
      const response = await api.post("users/login", {
        username,
        password,
      });
      const { token } = response?.data;
      sessionStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.reason);
    }
  }
);
export const userLogout = createAsyncThunk("auth/logout", async () => {
  sessionStorage.removeItem("token");
  return;
});

const initialState = {
  isLoggedIn: false, //맞나?
};
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

const { reducer } = authSlice;
export default reducer;
