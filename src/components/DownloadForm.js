import { useDispatch } from "react-redux";
import { turnAlertOn } from "../context/modalSlice";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import downloadFile from "../utils/downloadFile";
import { errorHandler } from "../utils/error-handler";
import { downloadFileSchema } from "../validation/validationSchema";
import { StyledForm, StyledButton, StyledInput } from "../style/style";

//form content for downloading files
export function DownloadForm() {
  const dispatch = useDispatch();
  // search current url for file Id
  const downloadFileId = new URLSearchParams(window.location.search).get(
    "fileId"
  );
  const [fileId, setFileId, handleChangeFileId] = useInput(
    downloadFileId ?? ""
  );
  const [downloadPassword, setDownloadPassword, handleChangeDownloadPassword] =
    useInput("");
  //submit handler for download form
  const handleDownloadSubmit = async (e) => {
    try {
      e.preventDefault();
      // check data format for download form
      await downloadFileSchema.validate({
        fileId,
        filePassword: downloadPassword,
      });
      // use API for downloading files
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
      // reset form
      setFileId("");
      setDownloadPassword("");
      // download file
      downloadFile(response);
    } catch (error) {
      //pop up alert modal if error
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
