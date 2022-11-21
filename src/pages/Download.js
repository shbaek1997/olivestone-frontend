import { useNavigate } from "react-router-dom";
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

//download page
export function Download() {
  //set file ID, download file password state and onChange handlers.

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

  return (
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
        <StyledButton
          onClick={() => {
            navigate("/");
          }}
        >
          Go back to Upload
        </StyledButton>
      </StyledFormContainer>
    </StyledContainer>
  );
}
