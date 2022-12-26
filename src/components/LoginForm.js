import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../config/variables";
import { userLogin } from "../context/authSlice";
import { turnAlertOn } from "../context/modalSlice";
import useInput from "../hooks/useInput";
import { loginSchema } from "../validation/validationSchema";
import { StyledForm, StyledButton, StyledInput } from "../style/style";

//login form component
export const LogInForm = () => {
  const [email, setEmail, handleChangeEmail] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle login submit
  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      //validate username, password format
      await loginSchema.validate({ email, password });
      // dispatch login action
      await dispatch(userLogin({ email, password })).unwrap();
      //if login success, set username, password back to empty string
      setEmail("");
      setPassword("");
      // navigate to upload page
      navigate("/upload");
    } catch (error) {
      //alert error (different to other forms because we use await dispatch for login only)
      // error is string for dispatch error, error.message for login schema validation error
      // pop-up alert if error
      typeof error === "string"
        ? dispatch(turnAlertOn(error))
        : dispatch(turnAlertOn(error.message));
    }
  };
  return (
    <StyledForm method="post" onSubmit={handleLoginSubmit}>
      <label>Email</label>
      <StyledInput
        type="text"
        value={email}
        onChange={handleChangeEmail}
      ></StyledInput>
      <label>Password</label>
      <StyledInput
        type="password"
        value={password}
        onChange={handleChangePassword}
      ></StyledInput>
      <StyledButton type="submit" onSubmit={handleLoginSubmit}>
        Log in
      </StyledButton>
      {/* reset password link */}
      <a
        href={`${HOME_PAGE}/reset-password`}
        style={{ marginLeft: "100px", marginTop: "20px", color: "white" }}
      >
        Forgot Password
      </a>
    </StyledForm>
  );
};
