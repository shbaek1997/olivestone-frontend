import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledFileModal,
  StyledHeader,
  StyledButtonContainer,
} from "../style/style";
import Api from "../utils/api";
import useInput from "../hooks/useInput";
import { errorHandler } from "../utils/error-handler";
import {
  CHANGE_PASSWORD_BUTTON_ID,
  DELETE_FILE_BUTTON_ID,
  SHARE_FILE_BUTTON_ID,
  HOME_PAGE,
} from "../config/variables";
import { useSelector, useDispatch } from "react-redux";
import { turnOff, setFiles } from "../context/modalSlice";

//File Modal component
const FileModal = () => {
  const dispatch = useDispatch();
  const modalMode = useSelector((state) => state.modal.modalMode);
  const fileId = useSelector((state) => state.modal.fileId);
  const isActive = useSelector((state) => state.modal.isActive);
  const files = useSelector((state) => state.modal.files);
  console.log(fileId, "fileId");
  const COPY_URL = `${HOME_PAGE}/download?fileId=${fileId}`;
  const api = Api();
  //set new file password and password repeat in modal form
  const [filePassword, setFilePassword, handleChangeFilePassword] =
    useInput("");
  const [
    fileRepeatPassword,
    setFileRepeatPassword,
    handleChangeFileRepeatPassword,
  ] = useInput("");

  //handle modal submit
  const handleModalSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(event.target);
      //patch exisiting file with new password using patch api request
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
  const handleCopyButtonClick = async (event) => {
    try {
      await window.navigator.clipboard.writeText(COPY_URL);
      alert("클립보드에 복사하였습니다");
      dispatch(turnOff());
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeleteFileButtonClick = async (event) => {
    try {
      const response = await api.patch(`files/expireDate/${fileId}`, {
        headers: { "Content-Type": "application/json" },
      });
      const { originalName } = response?.data;

      //이제 api로 file expire시키는 부분을 하고, 확인이 되면 이 필터를 적용하면 됨..
      const newFiles = files.filter((file) => file._id !== fileId);
      dispatch(setFiles(newFiles));
      alert(`${originalName} 파일이 성공적으로 삭제되었습니다.`);
      dispatch(turnOff());
    } catch (error) {
      errorHandler(error);
    }
  };
  //magic strings change-password, 등 다 바꿔줘야 할 듯...
  return (
    <StyledFileModal
      id="file-password-modal"
      // if modal is active we display flex else modal display is none
      style={isActive ? { display: "flex" } : { display: "none" }}
    >
      {modalMode === CHANGE_PASSWORD_BUTTON_ID && (
        <>
          <StyledForm onSubmit={handleModalSubmit}>
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
          <StyledButton
            onClick={() => {
              dispatch(turnOff());
            }}
          >
            Cancel
          </StyledButton>
        </>
      )}
      {modalMode === SHARE_FILE_BUTTON_ID && (
        <>
          <StyledHeader>Copy Link</StyledHeader>
          <StyledForm>
            <StyledInput readOnly value={COPY_URL}></StyledInput>
            <StyledButton onClick={handleCopyButtonClick}>
              Copy to Clipboard
            </StyledButton>
          </StyledForm>
          <StyledButton
            onClick={() => {
              dispatch(turnOff());
            }}
          >
            Cancel
          </StyledButton>
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
            <StyledButton
              onClick={() => {
                dispatch(turnOff());
              }}
            >
              Cancel
            </StyledButton>
          </StyledButtonContainer>
        </>
      )}
    </StyledFileModal>
  );
};

export default FileModal;
