import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { turnAlertOff, turnAlertOn } from "../context/modalSlice";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import {
  resetPasswordEmailSchema,
  resetPasswordPasswordSchema,
} from "../validation/validationSchema";
import { StyledForm, StyledButton, StyledInput } from "../style/style";

//reset password form component
export const ResetPasswordForm = ({ isTokenValid, user }) => {
  //check for token and user info in props (this happens in reset password page)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // set input fields - email, password, password repeat
  const [email, setEmail, handleChangeEmail] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const [passwordRepeat, setPasswordRepeat, handleChangePasswordRepeat] =
    useInput("");

  //handler for email submission (before user accessing reset token)
  const handleResetSubmit = async (e) => {
    try {
      e.preventDefault();
      //validate email format
      await resetPasswordEmailSchema.validate({ email });
      //email api takes time, so alert user that email is being sent
      dispatch(turnAlertOn("비밀번호 재설정 이메일 발송 중 ..."));
      // use api and send reset password email
      const api = Api();
      const response = await api.post("users/reset-password", { email });
      // turn off alert
      dispatch(turnAlertOff());
      //sending reset mail response
      const { data } = response;
      const message = data.result;
      // notify user that email was sent successfully
      dispatch(turnAlertOn(message));
      //reset email field
      setEmail("");
    } catch (error) {
      // pop up alert modal if error
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };
  //handler for reset password submission (after user gaining reset token)
  const handleResetPasswordSubmit = async (e) => {
    try {
      e.preventDefault();
      //get user Id
      const userId = user._id;
      // validate password data
      await resetPasswordPasswordSchema.validate({ password, passwordRepeat });
      //use api to update user password
      const api = Api();
      await api.patch(`users/${userId}/reset-password/password`, {
        password,
        passwordRepeat,
      });
      //nontify user that password was reset successfully
      dispatch(turnAlertOn("비밀번호가 새로 설정되었습니다."));
      // reset fields
      setPassword("");
      setPasswordRepeat("");
      // go back to login
      navigate("/login");
    } catch (error) {
      // pop up alert modal if error
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };
  // if the token is valid, we show reset password form
  // else, we show submit user-email form

  return isTokenValid ? (
    <StyledForm method="post" onSubmit={handleResetPasswordSubmit}>
      <label htmlFor="password-input">Password</label>
      <StyledInput
        id="password-input"
        type="password"
        onChange={handleChangePassword}
        value={password}
      ></StyledInput>
      <label htmlFor="password-repeat-input">Confirm Password</label>
      <StyledInput
        id="password-repeat-input"
        type="password"
        onChange={handleChangePasswordRepeat}
        value={passwordRepeat}
      ></StyledInput>
      <StyledButton type="submit">Reset Password</StyledButton>
    </StyledForm>
  ) : (
    <StyledForm method="post" onSubmit={handleResetSubmit}>
      <label htmlFor="email-input">Email</label>
      <StyledInput
        id="email-input"
        type="email"
        onChange={handleChangeEmail}
        value={email}
      ></StyledInput>
      <StyledButton type="submit">Reset Password</StyledButton>
    </StyledForm>
  );
};
