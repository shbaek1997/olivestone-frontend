// import { useDispatch } from "react-redux";
import {
  setModalMode,
  setId,
  turnOn,
  setClickedUserRole,
} from "../context/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { StyledTableDiv, StyledFileButton } from "../style/style";
import {
  CHANGE_ROLE_BUTTON_NAME,
  DELETE_USER_BUTTON_NAME,
} from "../config/variables";

//file info component shown on table
const UserInfo = ({ _id, fullname, email, role, createdAt }) => {
  const loggedInUserRole = useSelector((state) => state.auth.role);
  const isUserAdmin = loggedInUserRole === "admin";
  const isRoleSuperUser = role === "super-user";
  //dispatch to handle actions for modal
  const dispatch = useDispatch();
  const handleButtonClick = (event) => {
    const mode = event.target.name;
    const userId = _id;
    //dispatch file Id, mode of modal, and turn on the modal
    dispatch(setId(userId));
    dispatch(setClickedUserRole(role));
    dispatch(setModalMode(mode));
    dispatch(turnOn());
  };
  //click on file name on table trigger file download
  //data editing for dates
  //convert expire date and upload date to YY-MM-DD format
  const joinDateToString = createdAt.toString().slice(0, 10);

  if (isUserAdmin) {
    return (
      <>
        <StyledTableDiv>{_id}</StyledTableDiv>
        <StyledTableDiv>{fullname}</StyledTableDiv>
        <StyledTableDiv>{email}</StyledTableDiv>
        <StyledTableDiv>{joinDateToString}</StyledTableDiv>
        <StyledTableDiv>{role}</StyledTableDiv>
        <StyledFileButton
          name={DELETE_USER_BUTTON_NAME}
          onClick={handleButtonClick}
          className="long-button"
        >
          Delete Account
        </StyledFileButton>
      </>
    );
  } else {
    return (
      <>
        <StyledTableDiv>{_id}</StyledTableDiv>
        <StyledTableDiv>{fullname}</StyledTableDiv>
        <StyledTableDiv>{email}</StyledTableDiv>
        <StyledTableDiv>{joinDateToString}</StyledTableDiv>
        <StyledTableDiv>{role}</StyledTableDiv>
        <StyledFileButton
          name={CHANGE_ROLE_BUTTON_NAME}
          className="long-button"
          onClick={handleButtonClick}
          disabled={isRoleSuperUser}
        >
          Change Role
        </StyledFileButton>
        <StyledFileButton
          name={DELETE_USER_BUTTON_NAME}
          className="long-button"
          onClick={handleButtonClick}
          disabled={isRoleSuperUser}
        >
          Delete Account
        </StyledFileButton>
      </>
    );
  }
};
export default UserInfo;
