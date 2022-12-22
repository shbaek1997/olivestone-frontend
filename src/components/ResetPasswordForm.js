import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import { StyledForm, StyledButton, StyledInput } from "../style/style";
import { turnAlertOff, turnAlertOn } from "../context/modalSlice";
import { useNavigate } from "react-router-dom";
import {
  resetPasswordEmailSchema,
  resetPasswordPasswordSchema,
} from "../validation/validationSchema";
//download page
export const ResetPasswordForm = ({ isTokenValid, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail, handleChangeEmail] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const [passwordRepeat, setPasswordRepeat, handleChangePasswordRepeat] =
    useInput("");
  //set download password state, onChange handler
  // download submit logic
  const handleResetSubmit = async (e) => {
    try {
      e.preventDefault();
      //validate id and password format
      await resetPasswordEmailSchema.validate({ email });
      const api = Api();
      dispatch(turnAlertOn("비밀번호 재설정 이메일 발송 중 ..."));
      const response = await api.post("users/reset-password", { email });
      dispatch(turnAlertOff());
      const { data } = response;
      const message = data.result;
      dispatch(turnAlertOn(message));
      //   const response = await api.
      setEmail("");
    } catch (error) {
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    try {
      e.preventDefault();
      const userId = user._id;
      await resetPasswordPasswordSchema.validate({ password, passwordRepeat });
      const api = Api();
      await api.patch(`users/${userId}/reset-password/password`, {
        password,
        passwordRepeat,
      });

      dispatch(turnAlertOn("비밀번호가 새로 설정되었습니다."));
      setPassword("");
      setPasswordRepeat("");
      navigate("/login");
    } catch (error) {
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };

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
