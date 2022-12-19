import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { turnAlertOn } from "../context/modalSlice";
import { registerSchema } from "../validation/validationSchema";
import { errorHandler } from "../utils/error-handler";
import { StyledForm, StyledButton, StyledInput } from "../style/style";

//Upload Form
export const RegisterForm = () => {
  // set password , password repeat, valid period for upload file +on change handlers
  const [password, setPassword, handleChangePassword] = useInput("");
  const [email, setEmail, handleChangeEmail] = useInput("");
  const [fullname, setFullname, handleChangeFullname] = useInput("");
  const [passwordRepeat, setPasswordRepeat, handleChangePasswordRepeat] =
    useInput("");
  const dispatch = useDispatch();
  // handle register submit
  const handleRegisterSubmit = async (e) => {
    try {
      e.preventDefault();
      // validate upload password, password repeat, valid period
      ///나중에 validation 추가...
      await registerSchema.validate({
        email,
        fullname,
        password,
        passwordRepeat,
      });
      //create new form data
      // add key/value to form data as api is required
      // api post request
      const api = Api();
      const response = await api.post("users/register", {
        email,
        fullname,
        password,
        passwordRepeat,
      });
      const { user } = response.data;
      const newUser = user.fullname;
      dispatch(
        turnAlertOn(
          `${newUser}님이 회원가입에 성공하였습니다. 이메일 인증을 해주세요!`
        )
      );
      setPassword("");
      setPasswordRepeat("");
      setEmail("");
      setFullname("");
      await api.post("users/register/email", { email });
      // upload success, so reset input fields

      //get file name uploaded from response and alert user

      // set upload success true to show user, uploaded file id
    } catch (error) {
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
