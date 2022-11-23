import {
  CHANGE_PASSWORD_BUTTON_ID,
  DELETE_FILE_BUTTON_ID,
  SHARE_FILE_BUTTON_ID,
} from "../config/variables";
import { StyledTableDiv, StyledFileButton } from "../style/style";
import Api from "../utils/api";
import downloadFile from "../utils/downloadFile";
import { errorHandler } from "../utils/error-handler";
import { useDispatch } from "react-redux";
import { setModalMode, setFileId, turnOn } from "../context/modalSlice";
//file info component
//get props about file and setPropsFunc for change password button
const FileInfo = ({ originalName, _id, expireDate, createdAt }) => {
  //convert expire date to YY-MM-DD formate
  const expireDateToString = expireDate.toString().slice(0, 10);
  const uploadedDateToString = createdAt.toString().slice(0, 10);
  const api = Api();

  const dispatch = useDispatch();
  //on button click, we set fileId value and isActive to true
  const handleButtonClick = (event) => {
    const mode = event.target.id;
    const fileId = _id;
    console.log("mode,fileId", fileId);
    dispatch(setFileId(fileId));
    dispatch(setModalMode(mode));
    dispatch(turnOn());
  };
  const handleFileNameClick = async (event) => {
    try {
      const fileId = _id;
      dispatch(setFileId(fileId));
      const response = await api.get(`files/download/${fileId}`, {
        responseType: "blob",
      });
      downloadFile(response);
    } catch (error) {
      errorHandler(error);
    }
  };

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
