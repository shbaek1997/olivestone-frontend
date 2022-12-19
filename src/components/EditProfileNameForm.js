import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { turnAlertOn } from "../context/modalSlice";
import { changeUserNameSchema } from "../validation/validationSchema";
import { errorHandler } from "../utils/error-handler";
import { StyledForm, StyledButton, StyledInput } from "../style/style";

//login form component
export const EditProfileNameForm = () => {
  //set inputs for username, password
  const [name, setName, handleChangeName] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle login submit
  const handleChangeNameSubmit = async (e) => {
    try {
      e.preventDefault();

      await changeUserNameSchema.validate({ name, password });
      //use Api here
      const api = Api();
      const response = await api.get("users/auth");
      const { user } = response.data;
      const userId = user._id;
      const nameResponse = await api.patch(`/users/${userId}/change-name`, {
        name,
        password,
      });
      console.log(nameResponse);
      // navigate to upload page
      dispatch(turnAlertOn(`${name}으로 이름이 성공적으로 변경되었습니다.`));
      setName("");
      setPassword("");
      navigate("/");
    } catch (error) {
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };
  return (
    <StyledForm method="post" onSubmit={handleChangeNameSubmit}>
      <label htmlFor="name-input">New Name</label>
      <StyledInput
        id="name-input"
        type="text"
        value={name}
        onChange={handleChangeName}
      ></StyledInput>
      <label htmlFor="current-password-input">Current Password</label>
      <StyledInput
        id="current-password-input"
        type="password"
        value={password}
        onChange={handleChangePassword}
      ></StyledInput>
      <StyledButton type="submit">Change Name</StyledButton>
    </StyledForm>
  );
};
