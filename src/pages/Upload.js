import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledContainer,
  StyledFormContainer,
  StyledForm,
  StyledButton,
  StyledInput,
  StyledHeader,
  StyledFileInput,
} from "../style/style";
import checkLogin from "../utils/checkLogin";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";

export function Upload() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fileInputRef = useRef(null);
  const [username, setUsername, handleChangeUsername] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const [uploadPassword, setUploadPassword, handleChangeUploadPassword] =
    useInput("");
  const [validPeriod, setValidPeriod, handleValidPeriod] = useInput(7);
  const [
    uploadPasswordRepeat,
    setUploadPasswordRepeat,
    handleChangeUploadPasswordRepeat,
  ] = useInput("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [downloadId, setDownloadId] = useState("");
  const navigate = useNavigate();

  const resetFileInput = () => {
    fileInputRef.current.value = "";
  };
  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUploadSuccess(false);
  };
  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const api = Api();
      const response = await api.post("users/login", {
        username,
        password,
      });
      setUsername("");
      setPassword("");
      const { token } = response?.data;
      sessionStorage.setItem("token", token);
      setIsLoggedIn(true);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleUploadSubmit = async (e) => {
    try {
      e.preventDefault();

      const file = fileInputRef.current.files[0];
      let formData = new FormData();
      formData.append("password", uploadPassword);
      formData.append("passwordRepeat", uploadPasswordRepeat);
      formData.append("validPeriod", validPeriod);
      formData.append("file", file);
      const api = Api();
      const response = await api.post("files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
      });
      setUploadPassword("");
      resetFileInput();
      setUploadPasswordRepeat("");
      setValidPeriod(7);
      const uploadedFile = response.data.file;
      alert(
        `${uploadedFile.originalName} 파일이 성공적으로 업로드 되었습니다. 현재 같이 저장한 비밀번호와 파일 아이디를 기억해주세요`
      );
      setUploadSuccess(true);
      setDownloadId(uploadedFile._id);
    } catch (error) {
      errorHandler(error);
    }
  };

  const setLogInValue = async () => {
    const checkValue = await checkLogin();
    setIsLoggedIn(checkValue);
  };
  useEffect(() => {
    console.log("set login");
    setLogInValue();
  }, []);

  return (
    <StyledContainer>
      <StyledHeader>Upload and Download</StyledHeader>

      <StyledFormContainer>
        {isLoggedIn ? (
          <StyledForm
            method="post"
            encType="multipart/form-data"
            onSubmit={handleUploadSubmit}
            acceptCharset="UTF-8"
          >
            <h3>Upload</h3>

            <label htmlFor="file-input">Upload file</label>
            <StyledFileInput
              id="file-input"
              ref={fileInputRef}
              type="file"
              required
            ></StyledFileInput>
            <label htmlFor="file-password-input">File Password</label>
            <StyledInput
              id="file-password-input"
              type="password"
              value={uploadPassword}
              onChange={handleChangeUploadPassword}
              required
            ></StyledInput>
            <label htmlFor="file-password-repeat-input">
              Confirm File Password
            </label>
            <StyledInput
              id="file-password-repeat-input"
              type="password"
              value={uploadPasswordRepeat}
              onChange={handleChangeUploadPasswordRepeat}
              required
            ></StyledInput>
            <label htmlFor="valid-days-input">Valid for ( in days )</label>
            <StyledInput
              id="valid-days-input"
              type="number"
              min={1}
              value={validPeriod}
              onChange={handleValidPeriod}
              required
            ></StyledInput>
            <StyledButton type="submit">Upload File</StyledButton>
            {uploadSuccess ? (
              <div>
                <div>생성된 아이디 값과 비밀번호를 기억해주세요.</div>
                <div>파일 아이디: {downloadId}</div>{" "}
              </div>
            ) : (
              <></>
            )}
          </StyledForm>
        ) : (
          <StyledForm acion="/" method="post" onSubmit={handleLoginSubmit}>
            <h3>Login to upload</h3>
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
        )}

        <StyledButton
          onClick={() => {
            navigate("/download");
          }}
        >
          Go to Download
        </StyledButton>
        {isLoggedIn ? (
          <>
            <StyledButton
              onClick={() => {
                navigate("/files");
              }}
            >
              See all files
            </StyledButton>
            <StyledButton onClick={handleLogout}>Log out</StyledButton>
          </>
        ) : (
          <></>
        )}
      </StyledFormContainer>
    </StyledContainer>
  );
}
