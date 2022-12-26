import { useSelector, useDispatch } from "react-redux";
import { turnOff, turnAlertOn } from "../context/modalSlice";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import { changeFilePasswordSchema } from "../validation/validationSchema";
import {
  StyledForm,
  StyledInput,
  StyledButton,
  StyledHeader,
} from "../style/style";

//modal content for changing file password
export const ModalChangeFilePassword = ({ handleCancelButtonClick }) => {
  const dispatch = useDispatch();
  const fileId = useSelector((state) => state.modal.id);
  const [filePassword, setFilePassword, handleChangeFilePassword] =
    useInput("");
  const [
    fileRepeatPassword,
    setFileRepeatPassword,
    handleChangeFileRepeatPassword,
  ] = useInput("");

  //handler for change file password form submit
  const handleModalPasswordSubmit = async (event) => {
    try {
      event.preventDefault();
      // validate form format for file password, file password repeat
      await changeFilePasswordSchema.validate({
        filePassword,
        filePasswordRepeat: fileRepeatPassword,
      });
      // use api to patch file password
      const api = Api();
      const response = await api.patch(
        `files/password/${fileId}`,
        { filePassword, fileRepeatPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // reset form
      setFilePassword("");
      setFileRepeatPassword("");
      // notify user that file password changed succesfully
      const { originalName } = response?.data;
      dispatch(
        turnAlertOn(
          `${originalName} 파일 비밀번호가 성공적으로 변경되었습니다.`
        )
      );
      //turn off modal
      dispatch(turnOff());
    } catch (error) {
      //pop up alert modal if error
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
