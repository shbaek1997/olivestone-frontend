import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { userLogin } from "../context/authSlice";
import { loginSchema } from "../validation/validationSchema";
import { StyledForm, StyledButton, StyledInput } from "../style/style";

//login form component
export const LogInForm = () => {
  //set inputs for username, password
  const [username, setUsername, handleChangeUsername] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle login submit
  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      //validate username, password format
      await loginSchema.validate({ username, password });
      // dispatch login action
      await dispatch(userLogin({ username, password })).unwrap();
      //if login success, set username, password back to empty string
      // navigate to upload page
      setUsername("");
      setPassword("");
      navigate("/upload");
    } catch (error) {
      //alert error (different to other forms because we use await dispatch for login only)
      // error is string for dispatch error, error.message for login schema validation error
      typeof error === "string" ? alert(error) : alert(error.message);
    }
  };
  return (
    <StyledForm method="post" onSubmit={handleLoginSubmit}>
      <label>Username</label>
      <StyledInput
        type="text"
        value={username}
        onChange={handleChangeUsername}
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
    </StyledForm>
  );
};
