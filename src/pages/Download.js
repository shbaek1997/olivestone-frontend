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
import { errorHandler } from "../utils/error-handler";

export function Download() {
  const [fileId, setFileId, handleChangeFileId] = useInput("");
  const [downloadPassword, setDownloadPassword, handleChangeDownloadPassword] =
    useInput("");
  const navigate = useNavigate();
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
