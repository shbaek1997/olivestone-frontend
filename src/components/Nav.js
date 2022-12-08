import ReactDOM from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../context/authSlice";
import { toggleDarkMode } from "../context/darkModeSlice";
import AlertModal from "./AlertModal";
import {
  sortFilesAlph,
  sortFilesAlphReverse,
  sortFilesExpireDate,
  sortFilesExpireDateReverse,
  sortFilesMimeType,
  sortFilesUploadDate,
  sortFilesUploadDateReverse,
} from "../context/fileSlice";
import {
  ALPHABETICAL,
  ALPHABETICAL_REVERSE,
  UPLOAD_DATE,
  UPLOAD_DATE_REVERSE,
  EXPIRE_DATE,
  EXPIRE_DATE_REVERSE,
  FILE_TYPE,
} from "../config/variables";
import { StyledNavBar, StyledSelect, StyledNavButton } from "../style/style";

const PopupModal = () => {
  return ReactDOM.createPortal(<AlertModal></AlertModal>, document.body);
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
  // dispatch
  const dispatch = useDispatch();
  // handle logout button click
  const handleLogout = () => {
    //dispatch logout action
    dispatch(userLogout());
    // go to login page
    navigate("/login");
  };
  //get states - files, isLoggedIn, isDarkMode
  const files = useSelector((state) => state.files.files);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
      //do nothing for default
      default:
    }
  };
  // actual nav bar structure
  //check login, dark mode and path of the page
  //if logged in - dark mode button, sort button, upload button, download button, logout button
  //not logged in -dark mode button , download button, login button
  // the boolean checks for the current page,
  // so if you are in download page, the download button does not show in the nav bar
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
        </StyledSelect>
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
