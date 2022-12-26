import { useSelector, useDispatch } from "react-redux";
import { turnOff, turnAlertOn } from "../context/modalSlice";
import { setUsers } from "../context/userSlice";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import {
  StyledHeader,
  StyledButtonContainer,
  StyledButton,
} from "../style/style";

//modal content for changing the role of the user selected
export const ModalChangeRole = ({ handleCancelButtonClick }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.modal.id);
  const users = useSelector((state) => state.users.users);
  const selectedUserRole = useSelector((state) => state.modal.clickedUserRole);
  //set header message for the modal
  //check if selected user is admin or basic-user
  // depending on the selected user's role, the header message changes
  const isSelectedUserAdmin = selectedUserRole === "admin";
  const headerMessage = isSelectedUserAdmin
    ? `이 유저를 "BASIC-USER" 권한으로 변경하시겠습니까?`
    : `이 유저를"ADMIN" 권한으로 변경하시겠습니까?`;
  // handle button click for changing selected user's role
  const handleChangeRoleButtonClick = async (event) => {
    try {
      // use Api to change the role
      const api = Api();
      await api.patch(`/users/role/${userId}`);
      // set new usersList as usersList is now updated
      // set usersList as previous users list
      const usersList = [...users];
      //find changed user
      //callback to find index
      const matchedUserCallback = (user) => user._id === userId;
      const userIndex = usersList.findIndex(matchedUserCallback);
      //changed user -found using index
      const user = usersList[userIndex];
      const { fullname } = user;
      //update user role info
      const newRole = isSelectedUserAdmin ? "basic-user" : "admin";
      const updatedUser = { ...user, role: newRole };
      //also update the list
      usersList[userIndex] = updatedUser;
      //dispatch users with updated users list
      dispatch(setUsers(usersList));
      // alert user that selected user's role has changed successfully
      const alertString = isSelectedUserAdmin
        ? `${fullname}님이 일반 유저로 변경되었습니다.`
        : `${fullname}님이 관리자로 변경되었습니다.`;
      dispatch(turnAlertOn(alertString));
      //turn off modal
      dispatch(turnOff());
    } catch (error) {
      //pop up alert modal if error
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
