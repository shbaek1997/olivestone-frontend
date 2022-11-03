import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import checkLogin from "../utils/checkLogin";
import useInput from "../hooks/useInput";
import api from "../utils/api";
import axios from "axios";

export function FileLoader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState({});
  const [username, setUsername, handleChangeUsername] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const [uploadPassword, setUploadPassword, handleChangeUploadPassword] =
    useInput("");

  const resetFileInput = () => {
    fileInputRef.current.value = null;
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };
  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };
  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await api.post("users/login", {
        username,
        password,
      });
      setUsername("");
      setPassword("");
      const { token } = response?.data;
      console.log(token);
      console.log(response);
      sessionStorage.setItem("token", token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      const { data } = error.response;
      console.log(data);
      const { reason } = data;
      alert(reason);
    }
  };

  const handleUploadSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);
      formData.append("password", uploadPassword);
      console.log(formData);

      const response = await api.post("files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
      });
      setUploadPassword("");
      setFile({});
      resetFileInput();
      console.log(response);
      const uploadedFile = response.data.file;
      alert(`${uploadedFile.originalName} success!`);
    } catch (error) {
      console.log(error);
      const { data } = error.response;
      console.log(data);
      const { reason } = data;
      alert(reason);
    }
  };

  const setLogInValue = async () => {
    const checkValue = await checkLogin();
    setIsLoggedIn(checkValue);
  };

  useEffect(() => {
    setLogInValue();
    console.log("test");
  }, []);

  return (
    <StyledContainer>
      <StyledHeader>Upload and Download {isLoggedIn}</StyledHeader>

      <StyledFormContainer>
        {isLoggedIn ? (
          <StyledForm
            method="post"
            encType="multipart/form-data"
            onSubmit={handleUploadSubmit}
          >
            <h3>Upload</h3>
            <label>Upload file</label>
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              onChange={handleFileChange}
            ></input>
            <label>Password</label>
            <input
              type="password"
              value={uploadPassword}
              onChange={handleChangeUploadPassword}
            ></input>
            <button type="submit">Upload File</button>
          </StyledForm>
        ) : (
          <StyledForm acion="/" method="post" onSubmit={handleLoginSubmit}>
            <h3>Login</h3>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleChangeUsername}
            ></input>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handleChangePassword}
            ></input>
            <button type="submit" onSubmit={handleLoginSubmit}>
              Log in
            </button>
          </StyledForm>
        )}

        <StyledForm action="/download" method="get">
          <h3>Download</h3>
          <label>file ID or could be url</label>
          <input type="text"></input>
          <label>Password</label>
          <input type="password"></input>
          <button type="submit">Download File</button>
        </StyledForm>
        {isLoggedIn ? <button onClick={handleLogout}>sign out</button> : <></>}
      </StyledFormContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: pink;
  padding: 30px 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const StyledHeader = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 50px;
`;

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
