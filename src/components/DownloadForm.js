import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import downloadFile from "../utils/downloadFile";
import { errorHandler } from "../utils/error-handler";
import { downloadFileSchema } from "../validation/validationSchema";
import { StyledForm, StyledButton, StyledInput } from "../style/style";
import { turnAlertOn } from "../context/modalSlice";
//download page
export function DownloadForm() {
  const dispatch = useDispatch();
  //first search if file Id is present in uri query
  const downloadFileId = new URLSearchParams(window.location.search).get(
    "fileId"
  );
  //set file ID state and onChange handlers.
  //set file id as uri query param or as empty string;
  const [fileId, setFileId, handleChangeFileId] = useInput(
    downloadFileId ?? ""
  );
  //set download password state, onChange handler
  const [downloadPassword, setDownloadPassword, handleChangeDownloadPassword] =
    useInput("");

  // download submit logic
  const handleDownloadSubmit = async (e) => {
    try {
      e.preventDefault();
      //validate id and password format
      await downloadFileSchema.validate({
        fileId,
        filePassword: downloadPassword,
      });
      //request post api for downloading the file, response should be blob
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
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
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
