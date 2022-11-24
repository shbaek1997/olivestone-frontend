//import
import React from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../context/authSlice";
import useInput from "../hooks/useInput";

import { StyledForm, StyledButton, StyledInput } from "../style/style";
export const LogInForm = () => {
  const [username, setUsername, handleChangeUsername] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const dispatch = useDispatch();
  //login
  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispatch(userLogin({ username, password })).unwrap();
      setUsername("");
      setPassword("");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <StyledForm acion="/" method="post" onSubmit={handleLoginSubmit}>
      <label>Username</label>
      <StyledInput
        type="text"
        value={username}
        onChange={handleChangeUsername}
        required
      ></StyledInput>
      <label>Password</label>
      <StyledInput
        type="password"
        value={password}
        onChange={handleChangePassword}
        required
      ></StyledInput>
      <StyledButton type="submit" onSubmit={handleLoginSubmit}>
        Log in
      </StyledButton>
    </StyledForm>
  );
};
