import { useDispatch } from "react-redux";
import { setModalMode, setFileId, turnOn } from "../context/modalSlice";
import Api from "../utils/api";
import downloadFile from "../utils/downloadFile";
import { errorHandler } from "../utils/error-handler";
import {
  CHANGE_PASSWORD_BUTTON_ID,
  DELETE_FILE_BUTTON_ID,
  SHARE_FILE_BUTTON_ID,
} from "../config/variables";
import { StyledTableDiv, StyledFileButton } from "../style/style";

//file info component
//file info shown on table
const FileInfo = ({ originalName, _id, expireDate, createdAt }) => {
  //use dispatch for redux-toolkit to handle fileId, modalMode, isActive state
  const dispatch = useDispatch();

  //on table button click (password, share, delete),
  // we set fileId value and isActive to true and set modal mode

  const handleButtonClick = (event) => {
    const mode = event.target.id;
    const fileId = _id;
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
  //data editing for dates..
  //convert expire date to YY-MM-DD formate
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
        id={CHANGE_PASSWORD_BUTTON_ID}
        className={"change-password-button"}
        onClick={handleButtonClick}
      >
        Change Password
      </StyledFileButton>
      <StyledFileButton id={SHARE_FILE_BUTTON_ID} onClick={handleButtonClick}>
        Share File
      </StyledFileButton>
      <StyledFileButton id={DELETE_FILE_BUTTON_ID} onClick={handleButtonClick}>
        Delete File
      </StyledFileButton>
    </>
  );
};

export default FileInfo;
