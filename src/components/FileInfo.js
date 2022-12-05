import { useDispatch } from "react-redux";
import { setModalMode, setFileId, turnOn } from "../context/modalSlice";
import Api from "../utils/api";
import downloadFile from "../utils/downloadFile";
import { errorHandler } from "../utils/error-handler";
import {
  CHANGE_PASSWORD_BUTTON_NAME,
  DELETE_FILE_BUTTON_NAME,
  SHARE_FILE_BUTTON_NAME,
} from "../config/variables";
import { StyledTableDiv, StyledFileButton } from "../style/style";

//file info component shown on table
const FileInfo = ({ originalName, _id, expireDate, createdAt }) => {
  //dispatch to handle actions for modal
  const dispatch = useDispatch();
  //handle table button click (password, share, delete),
  // mode is the name of the button
  const handleButtonClick = (event) => {
    const mode = event.target.name;
    const fileId = _id;
    //dispatch file Id, mode of modal, and turn on the modal
    dispatch(setFileId(fileId));
    dispatch(setModalMode(mode));
    dispatch(turnOn());
  };
  //click on file name on table trigger file download
  const handleFileNameClick = async (event) => {
    try {
      const fileId = _id;
      dispatch(setFileId(fileId));
      const api = Api();
      const response = await api.get(`files/download/${fileId}`, {
        responseType: "blob",
      });
      downloadFile(response);
    } catch (error) {
      errorHandler(error);
    }
  };
  //data editing for dates
  //convert expire date and upload date to YY-MM-DD format
  const expireDateToString = expireDate.toString().slice(0, 10);
  const uploadedDateToString = createdAt.toString().slice(0, 10);

  return (
    <>
      <StyledTableDiv>{_id}</StyledTableDiv>
      <StyledTableDiv className={"original-name"} onClick={handleFileNameClick}>
        {originalName}
      </StyledTableDiv>
      <StyledTableDiv>{uploadedDateToString}</StyledTableDiv>
      <StyledTableDiv>{expireDateToString}</StyledTableDiv>
      <StyledFileButton
        name={CHANGE_PASSWORD_BUTTON_NAME}
        className={"change-password-button"}
        onClick={handleButtonClick}
      >
        Change Password
      </StyledFileButton>
      <StyledFileButton
        name={SHARE_FILE_BUTTON_NAME}
        onClick={handleButtonClick}
      >
        Share File
      </StyledFileButton>
      <StyledFileButton
        name={DELETE_FILE_BUTTON_NAME}
        onClick={handleButtonClick}
      >
        Delete File
      </StyledFileButton>
    </>
  );
};

export default FileInfo;
