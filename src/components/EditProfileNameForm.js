import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { turnAlertOn } from "../context/modalSlice";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import { changeUserNameSchema } from "../validation/validationSchema";
import { StyledForm, StyledButton, StyledInput } from "../style/style";

//form content for edit profile name
export const EditProfileNameForm = () => {
  const [name, setName, handleChangeName] = useInput("");
  const [password, setPassword, handleChangePassword] = useInput("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handler for change name form submit
  const handleChangeNameSubmit = async (e) => {
    try {
      e.preventDefault();
      //validate form - name and currrent password
      await changeUserNameSchema.validate({ name, password });
      //use Api to get user ID
      const api = Api();
      const response = await api.get("users/auth");
      const { user } = response.data;
      const userId = user._id;
      // use Api to change name of the user
      await api.patch(`/users/${userId}/change-name`, {
        name,
        password,
      });
      // if successful, alert user that name changed successfully
      dispatch(turnAlertOn(`${name}으로 이름이 성공적으로 변경되었습니다.`));
      // reset form
      setName("");
      setPassword("");
      // go back home
      navigate("/");
    } catch (error) {
      //pop up alert modal if error
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
