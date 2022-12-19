import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { turnAlertOn } from "../context/modalSlice";
import { errorHandler } from "../utils/error-handler";
import { StyledForm, StyledButton, StyledInput } from "../style/style";
import { changeUserPasswordSchema } from "../validation/validationSchema";

//login form component
export const EditProfilePasswordForm = () => {
  //set inputs for username, password
  const [newPassword, setNewPassword, handleChangeNewPassword] = useInput("");
  const [
    newPasswordRepeat,
    setNewPasswordRepeat,
    handleChangeNewPasswordRepeat,
  ] = useInput("");
  const [oldPassword, setOldPassword, handleChangeOldPassword] = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle login submit
  const handleChangePasswordSubmit = async (e) => {
    try {
      e.preventDefault();
      //schema check에 현재 비밀번호와 새 비밀번호는 다르게만 설정 가능하게 하기..

      await changeUserPasswordSchema.validate({
        newPassword,
        newPasswordRepeat,
        oldPassword,
      });
      const api = Api();
      const response = await api.get("users/auth");
      const { user } = response.data;
      const userId = user._id;
      const passwordResponse = await api.patch(
        `/users/${userId}/change-password`,
        {
          newPassword,
          newPasswordRepeat,
          oldPassword,
        }
      );
      console.log(passwordResponse);
      //use Api here
      // navigate to upload page
      dispatch(turnAlertOn(`비밀번호가 성공적으로 변경되었습니다.`));
      setNewPassword("");
      setNewPasswordRepeat("");
      setOldPassword("");
      navigate("/");
    } catch (error) {
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };
  return (
    <StyledForm method="post" onSubmit={handleChangePasswordSubmit}>
      <label htmlFor="new-password-input">New Password</label>
      <StyledInput
        id="new-password-input"
        type="password"
        value={newPassword}
        onChange={handleChangeNewPassword}
      ></StyledInput>
      <label htmlFor="new-password-repeat-input">Confirm New Password</label>
      <StyledInput
        id="new-password-repeat-input"
        type="password"
        value={newPasswordRepeat}
        onChange={handleChangeNewPasswordRepeat}
      ></StyledInput>
      <label htmlFor="old-password-input">Current Password</label>
      <StyledInput
        id="old-password-input"
        type="password"
        value={oldPassword}
        onChange={handleChangeOldPassword}
      ></StyledInput>
      <StyledButton type="submit">Change Password</StyledButton>
    </StyledForm>
  );
};
