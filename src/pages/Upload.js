//import
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
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByJWT, userLogin, userLogout } from "../context/authSlice";
//Upload page
export function Upload() {
  const dispatch = useDispatch();
  // loading and login state
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // set state, onChange handlers for username, password, upload password, upload password repeat, valid period
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

  //state for upload successful and to show file ID of uploaded file
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadedFileId, setUploadedFileId] = useState("");

  //use Ref for input type file
  const fileInputRef = useRef(null);
  // useNavigate to navigate between pages
  const navigate = useNavigate();
  // reset file input after file upload success
  const resetFileInput = () => {
    fileInputRef.current.value = "";
  };
  // logout
  const handleLogout = () => {
    dispatch(userLogout());
    setUploadSuccess(false);
  };

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

  //upload file submission
  const handleUploadSubmit = async (e) => {
    try {
      //prevent form submit default refresh
      e.preventDefault();
      //get file from file input
      const file = fileInputRef.current.files[0];

      //create new form data
      let formData = new FormData();
      // add key/value to form data as api is required
      formData.append("password", uploadPassword);
      formData.append("passwordRepeat", uploadPasswordRepeat);
      formData.append("validPeriod", validPeriod);
      // adding file last is important for multer api to work
      formData.append("file", file);
      // api post request
      const api = Api();
      const response = await api.post("files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
      });
      // upload success, so reset input fields
      setUploadPassword("");
      resetFileInput();
      setUploadPasswordRepeat("");
      setValidPeriod(7);
      //get file name uploaded from response and alert user
      const uploadedFile = response.data.file;
      alert(
        `${uploadedFile.originalName} 파일이 성공적으로 업로드 되었습니다. 현재 같이 저장한 비밀번호와 파일 아이디를 기억해주세요`
      );
      // set upload success true to show user, uploaded file id
      setUploadSuccess(true);
      setUploadedFileId(uploadedFile._id);
    } catch (error) {
      errorHandler(error);
    }
  };
  // call setLogInValue once when page is first loaded
  useEffect(() => {
    dispatch(fetchUserByJWT());
    setIsLoading(false);
  }, [dispatch]);

  //if loading show "loading..." else show form
  return isLoading ? (
    <div>Loading ...</div>
  ) : (
    <StyledContainer>
      <StyledHeader>Upload and Download</StyledHeader>

      <StyledFormContainer>
        {/* if logged in show upload form else show login form */}
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
            {uploadSuccess ? (
              <div>
                <div>생성된 아이디 값과 비밀번호를 기억해주세요.</div>
                <div>파일 아이디: {uploadedFileId}</div>{" "}
              </div>
            ) : (
              <></>
            )}
            <StyledButton type="submit">Upload File</StyledButton>
            {/* show uploaded file id to the user after successfully uploading a file */}
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
