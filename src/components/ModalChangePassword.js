import { useSelector, useDispatch } from "react-redux";

import useInput from "../hooks/useInput";
import { turnOff, turnAlertOn } from "../context/modalSlice";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import { changeFilePasswordSchema } from "../validation/validationSchema";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledHeader,
} from "../style/style";

//modal content for change file password
export const ModalChangePassword = ({ handleCancelButtonClick }) => {
  //dispatch for redux
  const dispatch = useDispatch();
  // use selector to get file Id
  const fileId = useSelector((state) => state.modal.fileId);

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
      //validate password, repeat password formats
      await changeFilePasswordSchema.validate({
        filePassword,
        filePasswordRepeat: fileRepeatPassword,
      });
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
      dispatch(
        turnAlertOn(
          `${originalName} 파일 비밀번호가 성공적으로 변경되었습니다.`
        )
      );
      //reset fileId value and make modal inactive to clear modal
      dispatch(turnOff());
    } catch (error) {
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };

  return (
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
  );
};
