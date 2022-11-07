import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import checkLogin from "../utils/checkLogin";
import useInput from "../hooks/useInput";
import Api from "../utils/api";

export function FileLoader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState({});
  const [username, setUsername, handleChangeUsername] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const [uploadPassword, setUploadPassword, handleChangeUploadPassword] =
    useInput("");
  const [
    uploadPasswordRepeat,
    setUploadPasswordRepeat,
    handleChangeUploadPasswordRepeat,
  ] = useInput("");
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
      const { data } = error.response;
      const { reason } = data;
      alert(reason);
    }
  };
  const handleDownloadSubmit = async (e) => {
    try {
      e.preventDefault();
      const api = Api();
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
      console.log(response.headers);
      setFileId("");
      setDownloadPassword("");
      const contentType = response.headers["content-type"];
      const blob = new Blob([response.data], {
        type: contentType,
        encoding: "UTF-8",
      });
      const link = document.createElement("a");
      const contentDisposition = response.headers["content-disposition"];
      let fileName = "untitled";
      if (contentDisposition) {
        const [fileNameMatch] = contentDisposition
          .split(";")
          .filter((str) => str.includes("filename"));
        if (fileNameMatch) [, fileName] = fileNameMatch.split("=");
      }
      const decodedFileName = decodeURI(fileName);
      link.href = window.URL.createObjectURL(blob);
      link.download = decodedFileName;
      link.click();
    } catch (error) {
      const { data } = error.response;
      const errorInfo = JSON.parse(await data.text());
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
      let formData = new FormData();
      if (uploadPassword.length < 8) {
        throw new Error("파일 비밀번호는 최소 8글자이어야 합니다.");
      }
      if (uploadPassword !== uploadPasswordRepeat) {
        throw new Error("파일 비밀번호와 비밀번호 확인이 일치 하지 않습니다.");
      }
      formData.append("password", uploadPassword);
      formData.append("passwordRepeat", uploadPasswordRepeat);
      formData.append("file", file);
      const api = Api();
      const response = await api.post("files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
      });
      setUploadPassword("");
      setFile({});
      resetFileInput();
      setUploadPasswordRepeat("");
      const uploadedFile = response.data.file;
      alert(
        `${uploadedFile.originalName} 파일이 성공적으로 업로드 되었습니다. 현재 같이 저장한 비밀번호와 파일 아이디를 기억해주세요`
      );
      setUploadSuccess(true);
      setDownloadId(uploadedFile._id);
    } catch (error) {
      if (error.response !== undefined) {
        const { data } = error.response;
        const { reason } = data;
        alert(reason);
      }
      alert(error.message);
    }
  };

  const setLogInValue = async () => {
    const checkValue = await checkLogin();
    setIsLoggedIn(checkValue);
  };

  useEffect(() => {
    setLogInValue();
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
            <StyledInput
              ref={fileInputRef}
              type="file"
              name="file"
              onChange={handleFileChange}
              required
            ></StyledInput>
            <label>File Password</label>
            <StyledInput
              type="password"
              value={uploadPassword}
              onChange={handleChangeUploadPassword}
              required
            ></StyledInput>
            <label>Confirm File Password</label>
            <StyledInput
              type="password"
              value={uploadPasswordRepeat}
              onChange={handleChangeUploadPasswordRepeat}
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

        <StyledForm method="post" onSubmit={handleDownloadSubmit}>
          <h3>Download</h3>
          <label>File ID</label>
          <StyledInput
            type="text"
            onChange={handleChangeFileId}
            value={fileId}
            required
          ></StyledInput>
          <label>File Password</label>
          <StyledInput
            type="password"
            onChange={handleChangeDownloadPassword}
            value={downloadPassword}
            required
          ></StyledInput>
          <StyledButton type="submit">Download File</StyledButton>
        </StyledForm>
        {isLoggedIn ? (
          <StyledButton onClick={handleLogout}>Log out</StyledButton>
        ) : (
          <></>
        )}
      </StyledFormContainer>
    </StyledContainer>
  );
}

const StyledButton = styled.button`
  padding: 10px;
  width: 100%;
  margin: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  background-color: grey;
  &:hover {
    background-color: white;
    cursor: pointer;
    color: black;
  }
`;
const StyledInput = styled.input`
  width: 90%;
  margin: 10px;
  padding: 10px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: black;
  padding: 40px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 350px;
`;

const StyledHeader = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
