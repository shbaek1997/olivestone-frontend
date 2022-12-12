import { useSelector, useDispatch } from "react-redux";
import { turnOff, turnAlertOn } from "../context/modalSlice";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import {
  StyledHeader,
  StyledButtonContainer,
  StyledButton,
} from "../style/style";
import { setUsers } from "../context/userSlice";

// Modal content for deleting file
export const ModalChangeRole = ({ handleCancelButtonClick }) => {
  //dispatch for redux
  const dispatch = useDispatch();
  // use selector to get states- file id, files
  const userId = useSelector((state) => state.modal.id);
  const users = useSelector((state) => state.users.users);
  const selectedUserRole = useSelector((state) => state.modal.clickedUserRole);
  const isSelectedUserAdmin = selectedUserRole === "admin";
  const headerMessage = isSelectedUserAdmin
    ? "This will change the selected user to basic-user"
    : "This will change the selected user to admin";
  const handleChangeRoleButtonClick = async (event) => {
    try {
      //expire file on the server-side
      const api = Api();
      await api.patch(`/users/role/${userId}`);
      const usersList = [...users];
      const matchedUser = (user) => user._id === userId;
      const userIndex = usersList.findIndex(matchedUser);
      const user = usersList[userIndex];
      const { fullname } = user;
      const newRole = isSelectedUserAdmin ? "basic-user" : "admin";
      const updatedUser = { ...user, role: newRole };
      usersList[userIndex] = updatedUser;
      dispatch(setUsers(usersList));
      //alert user
      const alertString = isSelectedUserAdmin
        ? `${fullname}님이 일반 유저로 변경되었습니다.`
        : `${fullname}님이 관리자로 변경되었습니다.`;
      dispatch(turnAlertOn(alertString));
      //turn off modal
      dispatch(turnOff());
    } catch (error) {
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };
  return (
    <>
      <StyledHeader>Change Role</StyledHeader>
      <h3 style={{ color: "white" }}> {headerMessage}</h3>
      <StyledButtonContainer>
        <StyledButton onClick={handleChangeRoleButtonClick}>
          Change Role
        </StyledButton>
        <StyledButton onClick={handleCancelButtonClick}>Cancel</StyledButton>
      </StyledButtonContainer>
    </>
  );
};
