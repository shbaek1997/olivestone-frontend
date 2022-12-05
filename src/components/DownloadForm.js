import useInput from "../hooks/useInput";
import Api from "../utils/api";
import downloadFile from "../utils/downloadFile";
import { errorHandler } from "../utils/error-handler";
import { downloadFileSchema } from "../validation/validationSchema";
import { StyledForm, StyledButton, StyledInput } from "../style/style";
//download page
export function DownloadForm() {
  //set file ID, download file password state and onChange handlers.
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
      await downloadFileSchema.validate({
        fileId,
        filePassword: downloadPassword,
      });
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
    <StyledForm method="post" onSubmit={handleDownloadSubmit}>
      <label htmlFor="file-id-input">File ID</label>
      <StyledInput
        id="file-id-input"
        type="text"
        onChange={handleChangeFileId}
        value={fileId}
      ></StyledInput>
      <label htmlFor="file-password-input">File Password</label>
      <StyledInput
        id="file-password-input"
        type="password"
        onChange={handleChangeDownloadPassword}
        value={downloadPassword}
      ></StyledInput>
      <StyledButton type="submit">Download File</StyledButton>
    </StyledForm>
  );
}
