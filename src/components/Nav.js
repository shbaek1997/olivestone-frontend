import { StyledNavBar, StyledSelect, StyledNavButton } from "../style/style";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ALPHABETICAL,
  ALPHABETICAL_REVERSE,
  UPLOAD_DATE,
  UPLOAD_DATE_REVERSE,
  EXPIRE_DATE,
  EXPIRE_DATE_REVERSE,
  FILE_TYPE,
} from "../config/variables";
import { userLogout } from "../context/authSlice";
import {
  sortFilesAlph,
  sortFilesAlphReverse,
  sortFilesExpireDate,
  sortFilesExpireDateReverse,
  sortFilesMimeType,
  sortFilesUploadDate,
  sortFilesUploadDateReverse,
} from "../context/fileSlice";
import { toggleDarkMode } from "../context/darkModeSlice";
import { useDispatch, useSelector } from "react-redux";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const isPathFiles = pathName === "/files";
  const isPathUpload = pathName === "/upload";
  const isPathDownload = pathName === "/";
  const isPathLogin = pathName === "/login";
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };
  const files = useSelector((state) => state.files.files);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
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
      default:
    }
  };
  return isLoggedIn ? (
    <StyledNavBar>
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
