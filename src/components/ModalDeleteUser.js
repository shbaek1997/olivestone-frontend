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
export const ModalDeleteUser = ({ handleCancelButtonClick }) => {
  //dispatch for redux
  const dispatch = useDispatch();
  // use selector to get states- file id, files
  const userId = useSelector((state) => state.modal.id);
  const users = useSelector((state) => state.users.users);
  const handleDeleteUserButtonClick = async (event) => {
    try {
      //expire file on the server-side
      const api = Api();
      const response = await api.delete(`users/${userId}`);
      //filter files after deleting
      const newUsers = users.filter((user) => user._id !== userId);
      dispatch(setUsers(newUsers));
      //alert user
      const { fullname } = response?.data;
      dispatch(turnAlertOn(`${fullname}님이 성공적으로 회원 탈퇴 되었습니다.`));
      //turn off modal
      dispatch(turnOff());
    } catch (error) {
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };
  return (
    <>
      <StyledHeader>Are you sure?</StyledHeader>
      <h3 style={{ color: "white" }}>
        You will not be able to revert this change
      </h3>
      <StyledButtonContainer>
        <StyledButton onClick={handleDeleteUserButtonClick}>
          Delete
        </StyledButton>
        <StyledButton onClick={handleCancelButtonClick}>Cancel</StyledButton>
      </StyledButtonContainer>
    </>
  );
};
