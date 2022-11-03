import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import checkLogin from "../utils/checkLogin";
import useInput from "../hooks/useInput";
import api from "../utils/api";

export function FileLoader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState({});
  const [username, setUsername, handleChangeUsername] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const [uploadPassword, setUploadPassword, handleChangeUploadPassword] =
    useInput("");
  const [fileId, setFileId, handleChangeFileId] = useInput("");
  const [downloadPassword, setDownloadPassword, handleChangeDownloadPassword] =
    useInput("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [downloadId, setDownloadId] = useState("");

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
  const handleDownloadSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(fileId, downloadPassword);
      const response = await api.post(
        "files/download",
        {
          fileId,
          plainPassword: downloadPassword,
        },
        {
          responseType: "blob",
        }
      );
      const contentType = response.headers["content-type"];
      const blob = new Blob([response.data], {
        type: contentType,
        encoding: "UTF-8",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.click();
      console.log(response);
      setFileId("");
      setDownloadPassword("");
    } catch (error) {
      const { data } = error.response;
      const errorInfo = JSON.parse(await data.text());
      console.log("info", errorInfo);
      let { reason } = errorInfo;
      const mongooseErrorMessage = reason.slice(0, 23);
      if (mongooseErrorMessage === "Cast to ObjectId failed") {
        reason = "올바른 형식의 아이디가 아닙니다.";
      }
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
      const response = await api.post("files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
      });
      setUploadPassword("");
      setFile({});
      resetFileInput();
      const uploadedFile = response.data.file;
      console.log(uploadedFile.originalName);
      alert(`${uploadedFile.originalName} success!`);
      setUploadSuccess(true);
      setDownloadId(uploadedFile._id);
    } catch (error) {
      console.log("error");
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
            acceptCharset="UTF-8"
          >
            <h3>Upload</h3>
            <label>Upload file</label>
            <input
              ref={fileInputRef}
              type="file"
              name="file"
              onChange={handleFileChange}
              required
            ></input>
            <label>Password</label>
            <input
              type="password"
              value={uploadPassword}
              onChange={handleChangeUploadPassword}
              required
            ></input>
            <button type="submit">Upload File</button>
            {uploadSuccess ? (
              <div>
                <div>생성된 아이디 값과 비밀번호를 기억해주세요.</div>
                <div>아이디: {downloadId}</div>{" "}
              </div>
            ) : (
              <></>
            )}
          </StyledForm>
        ) : (
          <StyledForm acion="/" method="post" onSubmit={handleLoginSubmit}>
            <h3>Login to upload</h3>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleChangeUsername}
              required
            ></input>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handleChangePassword}
              required
            ></input>
            <button type="submit" onSubmit={handleLoginSubmit}>
              Log in
            </button>
          </StyledForm>
        )}

        <StyledForm method="post" onSubmit={handleDownloadSubmit}>
          <h3>Download</h3>
          <label>file ID or could be url</label>
          <input
            type="text"
            onChange={handleChangeFileId}
            value={fileId}
            required
          ></input>
          <label>Password</label>
          <input
            type="password"
            onChange={handleChangeDownloadPassword}
            value={downloadPassword}
            required
          ></input>
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
