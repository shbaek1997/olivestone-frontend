import { useDispatch } from "react-redux";
import { turnAlertOn } from "../context/modalSlice";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import { registerSchema } from "../validation/validationSchema";
import { StyledForm, StyledButton, StyledInput } from "../style/style";

//Register Form
export const RegisterForm = () => {
  // set input variables -email, full name, password, password repeat
  const [email, setEmail, handleChangeEmail] = useInput("");
  const [fullname, setFullname, handleChangeFullname] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const [passwordRepeat, setPasswordRepeat, handleChangePasswordRepeat] =
    useInput("");
  const dispatch = useDispatch();
  // handler for register form submission
  const handleRegisterSubmit = async (e) => {
    try {
      e.preventDefault();
      // validate data
      await registerSchema.validate({
        email,
        fullname,
        password,
        passwordRepeat,
      });
      // register user in db using api
      const api = Api();
      const response = await api.post("users/register", {
        email,
        fullname,
        password,
        passwordRepeat,
      });
      // created user info
      const { user } = response.data;
      const newUser = user.fullname;
      // notify user that sign-up was successful
      dispatch(
        turnAlertOn(
          `${newUser}님이 회원가입에 성공하였습니다. 이메일 인증을 해주세요!`
        )
      );
      // reset input fields
      setPassword("");
      setPasswordRepeat("");
      setEmail("");
      setFullname("");
      // send confirmation email
      await api.post("users/register/email", { email });
    } catch (error) {
      //pop up alert modal if error
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };

  return (
    <StyledForm
      method="post"
      encType="multipart/form-data"
      onSubmit={handleRegisterSubmit}
      acceptCharset="UTF-8"
    >
      <label htmlFor="email-input">Email</label>
      <StyledInput
        id="email-input"
        type="email"
        value={email}
        onChange={handleChangeEmail}
        required
      ></StyledInput>
      <label htmlFor="fullname-input">Full name</label>
      <StyledInput
        id="fullname-input"
        type="text"
        value={fullname}
        onChange={handleChangeFullname}
        required
      ></StyledInput>
      <label htmlFor="password-input">Password</label>
      <StyledInput
        id="password-input"
        type="password"
        value={password}
        onChange={handleChangePassword}
        required
      ></StyledInput>
      <label htmlFor="password-repeat-input">Confirm Password</label>
      <StyledInput
        id="password-repeat-input"
        type="password"
        value={passwordRepeat}
        onChange={handleChangePasswordRepeat}
        required
      ></StyledInput>
      <StyledButton type="submit">Sign Up</StyledButton>
    </StyledForm>
  );
};
