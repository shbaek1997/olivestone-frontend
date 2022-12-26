import { useSelector, useDispatch } from "react-redux";
import {
  setModalMode,
  setId,
  turnOn,
  setClickedUserRole,
} from "../context/modalSlice";
import {
  CHANGE_ROLE_BUTTON_NAME,
  DELETE_USER_BUTTON_NAME,
} from "../config/variables";
import { StyledTableDiv, StyledFileButton } from "../style/style";

//user info component shown on table
const UserInfo = ({ _id, fullname, email, role, createdAt, emailVerified }) => {
  //get role of the user logged in
  const loggedInUserRole = useSelector((state) => state.auth.role);
  //check is user admin, is user super-user
  const isUserAdmin = loggedInUserRole === "admin";
  const isRoleSuperUser = role === "super-user";
  //set classes for buttons (buttons need to be long, so long-button class is added as default)
  const classes = isRoleSuperUser ? "long-button super-user" : "long-button";
  const dispatch = useDispatch();
  //handle button click
  const handleButtonClick = (event) => {
    //set modal mode
    const mode = event.target.name;
    const userId = _id;
    //set user Id, set user role, set modal mode, turn alert on
    dispatch(setId(userId));
    dispatch(setClickedUserRole(role));
    dispatch(setModalMode(mode));
    dispatch(turnOn());
  };
  //data editing for dates
  //convert join date to YY-MM-DD format
  const joinDateToString = createdAt.toString().slice(0, 10);
  //if user is super-user, there is change role button
  //the buttons of super-user data shown on user table are disabled - super user should never be deleted/ role should not change
  if (isUserAdmin) {
    return (
      <>
        <StyledTableDiv>{_id}</StyledTableDiv>
        <StyledTableDiv>{fullname}</StyledTableDiv>
        <StyledTableDiv>{email}</StyledTableDiv>
        <StyledTableDiv>{emailVerified}</StyledTableDiv>
        <StyledTableDiv>{joinDateToString}</StyledTableDiv>
        <StyledTableDiv>{role}</StyledTableDiv>
        <StyledFileButton
          name={DELETE_USER_BUTTON_NAME}
          onClick={handleButtonClick}
          className={classes}
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
        <StyledTableDiv>{emailVerified}</StyledTableDiv>
        <StyledTableDiv>{joinDateToString}</StyledTableDiv>
        <StyledTableDiv>{role}</StyledTableDiv>
        <StyledFileButton
          name={CHANGE_ROLE_BUTTON_NAME}
          className={classes}
          onClick={handleButtonClick}
          disabled={isRoleSuperUser}
        >
          Change Role
        </StyledFileButton>
        <StyledFileButton
          name={DELETE_USER_BUTTON_NAME}
          className={classes}
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
