import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { turnAlertOn } from "../context/modalSlice";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import { changeUserPasswordSchema } from "../validation/validationSchema";
import { PasswordInput } from "./PasswordInput";
import { StyledForm, StyledButton } from "../style/style";

export const EditProfilePasswordForm = () => {
  const [newPassword, setNewPassword, handleChangeNewPassword] = useInput("");
  const [
    newPasswordRepeat,
    setNewPasswordRepeat,
    handleChangeNewPasswordRepeat,
  ] = useInput("");
  const [oldPassword, setOldPassword, handleChangeOldPassword] = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //change password form submit handler
  const handleChangePasswordSubmit = async (e) => {
    try {
      e.preventDefault();
      // check form data for change password
      await changeUserPasswordSchema.validate({
        newPassword,
        newPasswordRepeat,
        oldPassword,
      });
      // use Api to get user ID
      const api = Api();
      const response = await api.get("users/auth");
      const { user } = response.data;
      const userId = user._id;
      // use Api and change password
      await api.patch(`/users/${userId}/change-password`, {
        newPassword,
        newPasswordRepeat,
        oldPassword,
      });
      //notify user that password changed successfully
      dispatch(turnAlertOn(`비밀번호가 성공적으로 변경되었습니다.`));
      // reset form
      setNewPassword("");
      setNewPasswordRepeat("");
      setOldPassword("");
      // return home
      navigate("/");
    } catch (error) {
      //pop up alert modal if error
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };
  return (
    <StyledForm method="post" onSubmit={handleChangePasswordSubmit}>
      <PasswordInput
        title={"New Password"}
        inputId={"new-password-input"}
        passwordValue={newPassword}
        onChangePasswordHandler={handleChangeNewPassword}
      ></PasswordInput>
      <PasswordInput
        title={"Confirm New Password"}
        inputId={"new-password-repeat-input"}
        passwordValue={newPasswordRepeat}
        onChangePasswordHandler={handleChangeNewPasswordRepeat}
      ></PasswordInput>
      <PasswordInput
        title={"Current Password"}
        inputId={"old-password-input"}
        passwordValue={oldPassword}
        onChangePasswordHandler={handleChangeOldPassword}
      ></PasswordInput>
      <StyledButton type="submit">Change Password</StyledButton>
    </StyledForm>
  );
};
