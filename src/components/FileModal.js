import { useSelector, useDispatch } from "react-redux";

import Api from "../utils/api";
import useInput from "../hooks/useInput";
import { turnOff, setFiles } from "../context/modalSlice";
import { errorHandler } from "../utils/error-handler";
import {
  CHANGE_PASSWORD_BUTTON_ID,
  DELETE_FILE_BUTTON_ID,
  SHARE_FILE_BUTTON_ID,
  HOME_PAGE,
} from "../config/variables";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledFileModal,
  StyledHeader,
  StyledButtonContainer,
} from "../style/style";

//File Modal component
const FileModal = () => {
  //dispatch for redux
  const dispatch = useDispatch();

  // use selector to get states
  const modalMode = useSelector((state) => state.modal.modalMode);
  const fileId = useSelector((state) => state.modal.fileId);
  const isActive = useSelector((state) => state.modal.isActive);
  const files = useSelector((state) => state.modal.files);

  //states and handler for password form submission
  //set new file password and password repeat in modal form
  const [filePassword, setFilePassword, handleChangeFilePassword] =
    useInput("");
  const [
    fileRepeatPassword,
    setFileRepeatPassword,
    handleChangeFileRepeatPassword,
  ] = useInput("");

  //handle modal submit for change password
  const handleModalPasswordSubmit = async (event) => {
    try {
      event.preventDefault();
      //patch exisiting file with new password using patch api request
      const api = Api();
      const response = await api.patch(
        `files/password/${fileId}`,
        { filePassword, fileRepeatPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      //after successful request, we reset input fields
      setFilePassword("");
      setFileRepeatPassword("");
      //alert user that password was changed successfully
      const { originalName } = response?.data;
      alert(`${originalName} 파일 비밀번호가 성공적으로 변경되었습니다.`);
      //reset fileId value and make modal inactive to clear modal
      dispatch(turnOff());
    } catch (error) {
      errorHandler(error);
    }
  };

  //copy url var for share file mode
  const COPY_URL = `${HOME_PAGE}/download?fileId=${fileId}`;
  //handle copy to clipboard button
  const handleCopyButtonClick = async (event) => {
    try {
      //copy url to clipboard
      await window.navigator.clipboard.writeText(COPY_URL);
      //alert user
      alert("클립보드에 복사하였습니다");
      //make modal inactive
      dispatch(turnOff());
    } catch (error) {
      errorHandler(error);
    }
  };

  //handle delete file button
  const handleDeleteFileButtonClick = async (event) => {
    try {
      //expire file server-side also
      const api = Api();
      const response = await api.patch(`files/expireDate/${fileId}`, {
        headers: { "Content-Type": "application/json" },
      });
      //filter files after deleting
      const newFiles = files.filter((file) => file._id !== fileId);
      dispatch(setFiles(newFiles));
      //alert user
      const { originalName } = response?.data;
      alert(`${originalName} 파일이 성공적으로 삭제되었습니다.`);
      //turn off modal
      dispatch(turnOff());
    } catch (error) {
      errorHandler(error);
    }
  };
  //any button click on cancel makes modal inactive
  const handleCancelButtonClick = () => {
    dispatch(turnOff());
  };
  return (
    <StyledFileModal
      id="file-password-modal"
      // if modal is active we display flex else modal display is none
      style={isActive ? { display: "flex" } : { display: "none" }}
    >
      {modalMode === CHANGE_PASSWORD_BUTTON_ID && (
        <>
          <StyledForm onSubmit={handleModalPasswordSubmit}>
            <StyledHeader>Change Password</StyledHeader>
            <label htmlFor="file-password-input">Enter new file password</label>
            <StyledInput
              id="file-password-input"
              type={"password"}
              required
              value={filePassword}
              onChange={handleChangeFilePassword}
            ></StyledInput>
            <label htmlFor="file-password-repeat-input">
              Confirm new file password
            </label>
            <StyledInput
              id="file-password-repeat-input"
              type={"password"}
              required
              value={fileRepeatPassword}
              onChange={handleChangeFileRepeatPassword}
            ></StyledInput>
            <StyledButton>Change</StyledButton>
          </StyledForm>
          <StyledButton onClick={handleCancelButtonClick}>Cancel</StyledButton>
        </>
      )}
      {modalMode === SHARE_FILE_BUTTON_ID && (
        <>
          <StyledForm>
            <StyledHeader>Copy Link</StyledHeader>
            <StyledInput readOnly value={COPY_URL}></StyledInput>
            <StyledButton onClick={handleCopyButtonClick}>
              Copy to Clipboard
            </StyledButton>
          </StyledForm>
          <StyledButton onClick={handleCancelButtonClick}>Cancel</StyledButton>
        </>
      )}
      {modalMode === DELETE_FILE_BUTTON_ID && (
        <>
          <StyledHeader>Are you sure?</StyledHeader>
          <h3 style={{ color: "white" }}>
            You will not be able to revert this change
          </h3>
          <StyledButtonContainer>
            <StyledButton onClick={handleDeleteFileButtonClick}>
              Delete
            </StyledButton>
            <StyledButton onClick={handleCancelButtonClick}>
              Cancel
            </StyledButton>
          </StyledButtonContainer>
        </>
      )}
    </StyledFileModal>
  );
};

export default FileModal;
