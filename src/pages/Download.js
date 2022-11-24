import { useState, useEffect } from "react";
import useInput from "../hooks/useInput";
import {
  StyledContainer,
  StyledFormContainer,
  StyledForm,
  StyledButton,
  StyledInput,
  StyledHeader,
  StyledFilePage,
} from "../style/style";
import Api from "../utils/api";
import downloadFile from "../utils/downloadFile";
import { errorHandler } from "../utils/error-handler";
import { useDispatch } from "react-redux";
import { fetchUserByJWT } from "../context/authSlice";
import { NavBar } from "../components/Nav";

//download page
export function Download() {
  //set file ID, download file password state and onChange handlers.
  /////////////
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
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
    <StyledFilePage>
      <NavBar></NavBar>
      <StyledContainer>
        <StyledHeader>Download</StyledHeader>
        <StyledFormContainer>
          <StyledForm method="post" onSubmit={handleDownloadSubmit}>
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
        </StyledFormContainer>
      </StyledContainer>
    </StyledFilePage>
  );
}
