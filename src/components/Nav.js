import ReactDOM from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AlertModal from "./AlertModal";
import { userLogout } from "../context/authSlice";
import { turnAlertOff } from "../context/modalSlice";
import {
  sortFilesAlph,
  sortFilesAlphReverse,
  sortFilesExpireDate,
  sortFilesExpireDateReverse,
  sortFilesMimeType,
  sortFilesUploadDate,
  sortFilesUploadDateReverse,
  sortUploader,
} from "../context/fileSlice";
import {
  sortUsersEmailAlph,
  sortUsersNameAlph,
  sortUsersRoleAlph,
  sortUsersUploadDate,
} from "../context/userSlice";
import { toggleDarkMode } from "../context/darkModeSlice";
import {
  ALPHABETICAL,
  ALPHABETICAL_REVERSE,
  UPLOAD_DATE,
  UPLOAD_DATE_REVERSE,
  EXPIRE_DATE,
  EXPIRE_DATE_REVERSE,
  FILE_TYPE,
  FULLNAME,
  EMAIL,
  ROLE,
  JOIN_DATE,
  UPLOADER,
} from "../config/variables";
import { StyledNavBar, StyledSelect, StyledNavButton } from "../style/style";

// Create popup modal component with confirm handler as prop
// Popup modal for alerting users with pop up message
const PopupModal = () => {
  const dispatch = useDispatch();
  //confirm handler turn off alert
  const confirmHandler = () => {
    dispatch(turnAlertOff());
  };
  return ReactDOM.createPortal(
    <AlertModal confirmHandler={confirmHandler}></AlertModal>,
    document.body
  );
};
// navigation bar for all pages
export const NavBar = () => {
  //navigate
  const navigate = useNavigate();
  // location to know which page we are in
  const location = useLocation();
  // Get path
  const pathName = location.pathname;
  //Check path booleans
  const isPathFiles = pathName === "/files";
  const isPathUpload = pathName === "/upload";
  const isPathDownload = pathName === "/";
  const isPathLogin = pathName === "/login";
  const isPathRegister = pathName === "/register";
  const isPathUsers = pathName === "/users";
  const isPathProfile = pathName === "/profile";
  const dispatch = useDispatch();

  // handle logout button click
  const handleLogout = () => {
    //dispatch logout action
    dispatch(userLogout());
    // go to login page
    navigate("/login");
  };
  //get states - files, users, isLoggedIn,  isAdmin, isDarkMode
  const files = useSelector((state) => state.files.files);
  const users = useSelector((state) => state.users.users);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = useSelector(
    (state) => state.auth.role === "admin" || state.auth.role === "super-user"
  );
  const isDarkMode = useSelector((state) => state.darkMode.isActive);

  //handle select change for sorting files
  const handleSelectChange = (event) => {
    //selected value in select options
    const selectedValue = event.target.value;
    // for each value, sort files with the chosen method
    switch (selectedValue) {
      case ALPHABETICAL:
        dispatch(sortFilesAlph(files));
        break;
      case ALPHABETICAL_REVERSE:
        dispatch(sortFilesAlphReverse(files));
        break;
      case UPLOAD_DATE:
        dispatch(sortFilesUploadDate(files));
        break;
      case UPLOAD_DATE_REVERSE:
        dispatch(sortFilesUploadDateReverse(files));
        break;
      case EXPIRE_DATE:
        dispatch(sortFilesExpireDate(files));
        break;
      case EXPIRE_DATE_REVERSE:
        dispatch(sortFilesExpireDateReverse(files));
        break;
      case FILE_TYPE:
        dispatch(sortFilesMimeType(files));
        break;
      case UPLOADER:
        dispatch(sortUploader(files));
        break;
      //do nothing for default
      default:
    }
  };
  //handle select change for sorting users
  const handleSelectChangeUsers = (event) => {
    //selected value in select options
    const selectedValue = event.target.value;
    // for each value, sort users with the chosen method
    switch (selectedValue) {
      case FULLNAME:
        dispatch(sortUsersNameAlph(users));
        break;
      case EMAIL:
        dispatch(sortUsersEmailAlph(users));
        break;
      case ROLE:
        dispatch(sortUsersRoleAlph(users));
        break;
      case JOIN_DATE:
        dispatch(sortUsersUploadDate(users));
        break;
      //do nothing for default
      default:
    }
  };
  // actual nav bar structure
  // check for login, user type, dark mode, path of current page etc..
  return isLoggedIn ? (
    <StyledNavBar>
      <PopupModal></PopupModal>

      <StyledNavButton
        onClick={() => {
          dispatch(toggleDarkMode());
        }}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </StyledNavButton>
      {isAdmin && !isPathRegister && (
        <StyledNavButton
          onClick={() => {
            navigate("/register");
          }}
        >
          Register a new user
        </StyledNavButton>
      )}
      {isAdmin && !isPathUsers && (
        <StyledNavButton
          onClick={() => {
            navigate("/users");
          }}
        >
          Manage Users
        </StyledNavButton>
      )}
      {isAdmin && isPathUsers && (
        <StyledSelect onChange={handleSelectChangeUsers}>
          <option>-- Sort --</option>
          <option>{FULLNAME}</option>
          <option>{EMAIL}</option>
          <option>{ROLE}</option>
          <option>{JOIN_DATE}</option>
        </StyledSelect>
      )}

      {isPathFiles && (
        <StyledSelect onChange={handleSelectChange}>
          <option>-- Sort --</option>
          <option>{ALPHABETICAL}</option>
          <option>{ALPHABETICAL_REVERSE}</option>
          <option>{UPLOAD_DATE}</option>
          <option>{UPLOAD_DATE_REVERSE}</option>
          <option>{EXPIRE_DATE}</option>
          <option>{EXPIRE_DATE_REVERSE}</option>
          <option>{FILE_TYPE}</option>
          <option>{UPLOADER}</option>
        </StyledSelect>
      )}
      {!isPathProfile && (
        <StyledNavButton
          onClick={() => {
            navigate("/profile");
          }}
        >
          Edit Profile
        </StyledNavButton>
      )}
      {!isPathUpload && (
        <StyledNavButton
          onClick={() => {
            navigate("/upload");
          }}
        >
          Go to Upload
        </StyledNavButton>
      )}
      {!isPathDownload && (
        <StyledNavButton
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Download
        </StyledNavButton>
      )}
      {!isPathFiles && (
        <StyledNavButton
          onClick={() => {
            navigate("/files");
          }}
        >
          See all files
        </StyledNavButton>
      )}

      <StyledNavButton onClick={handleLogout}>Logout</StyledNavButton>
    </StyledNavBar>
  ) : (
    <StyledNavBar>
      <PopupModal></PopupModal>
      <StyledNavButton
        onClick={() => {
          dispatch(toggleDarkMode());
        }}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </StyledNavButton>
      {!isPathDownload && (
        <StyledNavButton
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Download
        </StyledNavButton>
      )}
      {!isPathLogin && (
        <StyledNavButton
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </StyledNavButton>
      )}
    </StyledNavBar>
  );
};
