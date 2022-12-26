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

// Modal content for deleting a user
export const ModalDeleteUser = ({ handleCancelButtonClick }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.modal.id);
  const users = useSelector((state) => state.users.users);
  //handle clicking delete user button (userOnly)
  const handleDeleteUserButtonClick = async (event) => {
    try {
      event.preventDefault();
      //delete user data using api
      const api = Api();
      const response = await api.delete(`users/${userId}`);
      //filter users after deleting
      const newUsers = users.filter((user) => user._id !== userId);
      dispatch(setUsers(newUsers));
      //alert user that the user was successfully deleted
      const { user } = response.data;
      const { fullname } = user;
      dispatch(turnAlertOn(`${fullname}님이 성공적으로 회원 탈퇴 되었습니다.`));
      //turn off modal
      dispatch(turnOff());
    } catch (error) {
      //pop-up alert modal if error
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };
  // handle button click for delete user + user uploaded files
  const handleDeleteUserAndFilesButtonClick = async (event) => {
    try {
      event.preventDefault();
      //use api to patch files uploaded by the selected user (expire on server + delete files in server dir)
      const api = Api();
      await api.patch(`files/${userId}`);
      //use api to delete selected user data
      const userResponse = await api.delete(`users/${userId}`);
      //filter users after deleting
      const newUsers = users.filter((user) => user._id !== userId);
      dispatch(setUsers(newUsers));
      //alert user that user deletion + files deletion were successful
      const { user } = userResponse.data;
      const { fullname } = user;
      dispatch(
        turnAlertOn(
          `${fullname}님이 성공적으로 회원 탈퇴 되었고, 회원의 파일들도 같이 삭제되었습니다.`
        )
      );
      //turn off modal
      dispatch(turnOff());
    } catch (error) {
      //pop-up alert modal if error
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };

  return (
    <>
      <StyledHeader>Are you sure?</StyledHeader>
      <h3 style={{ color: "white" }}>유저를 탈퇴시키면 되돌릴 수 없습니다.</h3>
      <StyledButtonContainer>
        <StyledButton onClick={handleDeleteUserButtonClick}>
          Delete User Only
        </StyledButton>
        <StyledButton onClick={handleDeleteUserAndFilesButtonClick}>
          Delete User and Files
        </StyledButton>
        <StyledButton onClick={handleCancelButtonClick}>Cancel</StyledButton>
      </StyledButtonContainer>
    </>
  );
};
