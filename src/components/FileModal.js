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

//File Modal component
const FileModal = ({ isActive, fileId, modalMode, setPropsFunc, files }) => {
  const HOME_PAGE = "http://localhost:3000";
  const COPY_URL = `${HOME_PAGE}/download?fileId=${fileId}`;
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
      const api = Api();
      //patch exisiting file with new password using patch api request
      const response = await api.patch(
        `files/${fileId}`,
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
      setPropsFunc("", false, "", files);
    } catch (error) {
      errorHandler(error);
    }
  };
  const handleCopyButtonClick = async (event) => {
    try {
      await window.navigator.clipboard.writeText(COPY_URL);
      alert("클립보드에 복사하였습니다");
      setPropsFunc("", false, "", files);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeleteFileButtonClick = async (event) => {
    try {
      //이제 api로 file expire시키는 부분을 하고, 확인이 되면 이 필터를 적용하면 됨..
      const newFiles = files.filter((file) => file._id !== fileId);
      console.log(newFiles);
      setPropsFunc("", false, "", newFiles);
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
      {modalMode === "change-password" && (
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
              setPropsFunc("", false, "", files);
            }}
          >
            Cancel
          </StyledButton>
        </>
      )}
      {modalMode === "copy-link" && (
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
              setPropsFunc("", false, "", files);
            }}
          >
            Cancel
          </StyledButton>
        </>
      )}
      {modalMode === "delete-file" && (
        <>
          <StyledHeader>Are you sure?</StyledHeader>
          <h3 style={{ color: "white" }}>
            You will not be able to revert this change
          </h3>
          <StyledButtonContainer>
            <StyledButton onClick={handleDeleteFileButtonClick}>
              Confirm
            </StyledButton>
            <StyledButton
              onClick={() => {
                setPropsFunc("", false, "", files);
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
