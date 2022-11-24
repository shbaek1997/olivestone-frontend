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
import CompareFunctions from "../utils/sort";
import { userLogout } from "../context/authSlice";
import { setFiles } from "../context/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const isPathFiles = pathName === "/files";
  const isPathUpload = pathName === "/upload";
  const isPathDownload = pathName === "/";
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/upload");
  };
  const files = useSelector((state) => state.modal.files);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const compareService = new CompareFunctions();
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case ALPHABETICAL:
        const alphSortedFiles = files
          .slice()
          .sort(compareService.compareAlphFilename);
        dispatch(setFiles([...alphSortedFiles]));
        break;
      case ALPHABETICAL_REVERSE:
        const alphRevSortedFiles = files
          .slice()
          .sort(compareService.compareAlphFilenameReverse);
        dispatch(setFiles([...alphRevSortedFiles]));
        break;
      case UPLOAD_DATE:
        const uploadDateSortedFiles = files
          .slice()
          .sort(compareService.compareUploadDate);
        dispatch(setFiles([...uploadDateSortedFiles]));
        break;
      case UPLOAD_DATE_REVERSE:
        const uploadDateRevSortedFiles = files
          .slice()
          .sort(compareService.compareUploadDateReverse);
        dispatch(setFiles([...uploadDateRevSortedFiles]));
        break;
      case EXPIRE_DATE:
        const expireDateSortedFiles = files
          .slice()
          .sort(compareService.compareExpireDate);
        dispatch(setFiles([...expireDateSortedFiles]));
        break;
      case EXPIRE_DATE_REVERSE:
        const expireDateRevSortedFiles = files
          .slice()
          .sort(compareService.compareExpireDateReverse);
        dispatch(setFiles([...expireDateRevSortedFiles]));
        break;
      case FILE_TYPE:
        const mimeTypeSortedFiles = files
          .slice()
          .sort(compareService.compareMimeType);
        dispatch(setFiles([...mimeTypeSortedFiles]));
        break;
      default:
    }
  };
  return isLoggedIn ? (
    <StyledNavBar>
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
      {!isPathDownload && (
        <StyledNavButton
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Download
        </StyledNavButton>
      )}
      {!isPathUpload && (
        <StyledNavButton
          onClick={() => {
            navigate("/upload");
          }}
        >
          Log in
        </StyledNavButton>
      )}
    </StyledNavBar>
  );
};
