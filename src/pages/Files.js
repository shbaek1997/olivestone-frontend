import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Api from "../utils/api";
import FileInfo from "../components/FileInfo";
import FileModal from "../components/FileModal";
import {
  StyledFilePage,
  StyledNavBar,
  StyledNavButton,
  StyledFileContainer,
  StyledTableHeader,
  StyledSelect,
} from "../style/style";
import CompareFunctions from "../utils/sort";
import {
  ALPHABETICAL,
  ALPHABETICAL_REVERSE,
  EXPIRE_DATE,
  EXPIRE_DATE_REVERSE,
  FILE_TYPE,
  UPLOAD_DATE,
  UPLOAD_DATE_REVERSE,
} from "../config/variables";
import { useDispatch } from "react-redux";
import { fetchUserByJWT, userLogout } from "../context/authSlice";
// create Modal and attach to body, so it is outside of files page
// send file id, is modal active props, and setPropsFunc to change state of those props in the child components
const Modal = ({ isActive, fileId, setPropsFunc, files }) => {
  return ReactDOM.createPortal(
    <FileModal
      isActive={isActive}
      fileId={fileId}
      setPropsFunc={setPropsFunc}
      files={files}
    ></FileModal>,
    document.body
  );
};

export function Files() {
  //set file id and is modal active state
  const [fileId, setFileId] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [files, setFiles] = useState([]);
  //set props func which change state of those props
  const setPropsFunc = (fileIdVal, activeVal, fileVal) => {
    setIsActive(activeVal);
    setFileId(fileIdVal);
    setFiles(fileVal);
  };
  //navigate to navigate between pages
  const navigate = useNavigate();
  // api call
  const api = Api();
  // set loading and files state
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  //sort files
  //sort related string for option tag and switch cases
  //use compare service for cb in sort function js
  const compareService = new CompareFunctions();

  // handle change for select
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case ALPHABETICAL:
        const alphSortedFiles = files.sort(compareService.compareAlphFilename);
        setFiles([...alphSortedFiles]);
        break;
      case ALPHABETICAL_REVERSE:
        const alphRevSortedFiles = files.sort(
          compareService.compareAlphFilenameReverse
        );
        setFiles([...alphRevSortedFiles]);
        break;
      case UPLOAD_DATE:
        const uploadDateSortedFiles = files.sort(
          compareService.compareUploadDate
        );
        setFiles([...uploadDateSortedFiles]);
        break;
      case UPLOAD_DATE_REVERSE:
        const uploadDateRevSortedFiles = files.sort(
          compareService.compareUploadDateReverse
        );
        setFiles([...uploadDateRevSortedFiles]);
        break;
      case EXPIRE_DATE:
        const expireDateSortedFiles = files.sort(
          compareService.compareExpireDate
        );
        setFiles([...expireDateSortedFiles]);
        break;
      case EXPIRE_DATE_REVERSE:
        const expireDateRevSortedFiles = files.sort(
          compareService.compareExpireDateReverse
        );
        setFiles([...expireDateRevSortedFiles]);
        break;
      case FILE_TYPE:
        const mimeTypeSortedFiles = files.sort(compareService.compareMimeType);
        setFiles([...mimeTypeSortedFiles]);
        break;
      default:
    }
  };
  // get all non expired files from the server and set files
  const getFile = async () => {
    try {
      // api get request to get all valid files
      const response = await api.get("/files/files");
      const { data } = response;
      const responseFiles = data.files;
      // set files
      setFiles([...responseFiles]);
      // set loading false
      setIsLoading(false);
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };
  //when page is first rendered, check login and get file data from server
  useEffect(() => {
    // set login value async function check for user token and see if user is logged in
    // if not logged in, it redirects user back to home and "/files" route is protected
    const fetchUserAndGetFile = async () => {
      try {
        await dispatch(fetchUserByJWT()).unwrap();
        getFile();
        setIsLoading(false);
      } catch (error) {
        navigate("/");
      }
    };
    fetchUserAndGetFile();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    //if modal is active, we blur the file page
    <StyledFilePage
      id="file-page"
      style={isActive ? { opacity: "0.1" } : { opacity: "1" }}
    >
      {/* if loading we show "loading..." else we show file page */}
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <StyledNavBar>
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
            <StyledNavButton
              onClick={() => {
                navigate("/");
              }}
            >
              Go to Upload
            </StyledNavButton>
            <StyledNavButton
              onClick={() => {
                navigate("/download");
              }}
            >
              Go to Download
            </StyledNavButton>
            <StyledNavButton onClick={handleLogout}>Logout</StyledNavButton>
          </StyledNavBar>
          <StyledFileContainer>
            <StyledTableHeader>File ID</StyledTableHeader>
            <StyledTableHeader>File Name</StyledTableHeader>
            <StyledTableHeader>Upload Date</StyledTableHeader>
            <StyledTableHeader>Expire Date</StyledTableHeader>
            <StyledTableHeader>Change Pasword</StyledTableHeader>
            <StyledTableHeader>Share File</StyledTableHeader>
            <StyledTableHeader>Delete File</StyledTableHeader>
            {/* we render file info by using info from files array */}
            {files.map(({ originalName, _id, expireDate, createdAt }) => {
              return (
                <FileInfo
                  key={_id}
                  originalName={originalName}
                  _id={_id}
                  createdAt={createdAt}
                  expireDate={expireDate}
                  setPropsFunc={setPropsFunc}
                  files={files}
                ></FileInfo>
              );
            })}
          </StyledFileContainer>
        </>
      )}
      {/* we send props to Modal component here */}
      <Modal
        isActive={isActive}
        fileId={fileId}
        setPropsFunc={setPropsFunc}
        files={files}
      ></Modal>
    </StyledFilePage>
  );
}
