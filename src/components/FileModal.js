import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledFileModal,
  StyledHeader,
} from "../style/style";
import Api from "../utils/api";
import useInput from "../hooks/useInput";
import { errorHandler } from "../utils/error-handler";
//File Modal component
const FileModal = ({ isActive, fileId, setPropsFunc }) => {
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
      setPropsFunc("", false);
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <StyledFileModal
      id="file-password-modal"
      // if modal is active we display flex else modal display is none
      style={isActive ? { display: "flex" } : { display: "none" }}
    >
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
          setPropsFunc("", false);
        }}
      >
        Cancel
      </StyledButton>
    </StyledFileModal>
  );
};

export default FileModal;
