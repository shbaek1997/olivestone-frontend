import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useInput from "../hooks/useInput";
import {
  StyledContainer,
  StyledFormContainer,
  StyledForm,
  StyledButton,
  StyledInput,
  StyledHeader,
} from "../style/style";
import Api from "../utils/api";
import downloadFile from "../utils/downloadFile";
import { errorHandler } from "../utils/error-handler";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, fetchUserByJWT } from "../context/authSlice";

//download page
export function Download() {
  //set file ID, download file password state and onChange handlers.
  /////////////
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleLogout = () => {
    dispatch(userLogout());
  };
  // call setLogInValue once when page is first loaded
  useEffect(() => {
    dispatch(fetchUserByJWT());
    setIsLoading(false);
  }, [dispatch]);
  ///////////////
  const downloadFileId = new URLSearchParams(window.location.search).get(
    "fileId"
  );
  const [fileId, setFileId, handleChangeFileId] = useInput(
    downloadFileId || ""
  );
  const [downloadPassword, setDownloadPassword, handleChangeDownloadPassword] =
    useInput("");
  // to navigate between pages
  const navigate = useNavigate();

  // download submit logic
  const handleDownloadSubmit = async (e) => {
    try {
      e.preventDefault();
      //request post api for downloading the file
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
      // successful response, so reset file id and download password fields.
      setFileId("");
      setDownloadPassword("");
      //convert file downloaded to blob format
      downloadFile(response);
    } catch (error) {
      errorHandler(error);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <StyledContainer>
      <StyledHeader>Upload and Download</StyledHeader>
      <StyledFormContainer>
        <StyledForm method="post" onSubmit={handleDownloadSubmit}>
          <h3>Download</h3>
          <label htmlFor="file-id-input">File ID</label>
          <StyledInput
            id="file-id-input"
            type="text"
            onChange={handleChangeFileId}
            value={fileId}
            required
          ></StyledInput>
          <label htmlFor="file-password-input">File Password</label>
          <StyledInput
            id="file-password-input"
            type="password"
            onChange={handleChangeDownloadPassword}
            value={downloadPassword}
            required
          ></StyledInput>
          <StyledButton type="submit">Download File</StyledButton>
        </StyledForm>
        {isLoggedIn ? (
          <>
            <StyledButton
              onClick={() => {
                navigate("/");
              }}
            >
              Go back to Upload
            </StyledButton>
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
          <StyledButton
            onClick={() => {
              navigate("/");
            }}
          >
            Go back to login
          </StyledButton>
        )}
      </StyledFormContainer>
    </StyledContainer>
  );
}
