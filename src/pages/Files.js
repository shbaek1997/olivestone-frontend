import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import checkLogin from "../utils/checkLogin";
import Api from "../utils/api";
import FileInfo from "../components/FileInfo";
import FileModal from "../components/FileModal";
import {
  StyledFilePage,
  StyledNavBar,
  StyledNavButton,
  StyledFileContainer,
  StyledTableHeader,
} from "../style/style";

// create Modal and attach to body, so it is outside of files page
// send file id, is modal active props, and setPropsFunc to change state of those props in the child components
const Modal = ({ isActive, fileId, setPropsFunc }) => {
  return ReactDOM.createPortal(
    <FileModal
      isActive={isActive}
      fileId={fileId}
      setPropsFunc={setPropsFunc}
    ></FileModal>,
    document.body
  );
};

export function Files() {
  //set file id and is modal active state
  const [fileId, setFileId] = useState("");
  const [isActive, setIsActive] = useState(false);
  //set props func which change state of those props
  const setPropsFunc = (fileIdVal, activeVal) => {
    setIsActive(activeVal);
    setFileId(fileIdVal);
  };
  //navigate to navigate between pages
  const navigate = useNavigate();
  // api call
  const api = Api();
  // set loading and files state
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);
  //sort files
  const alphString = "Alphabetical";
  const alphReverseString = "Alphabetical reverse";
  const uploadDateString = "Upload date";
  const uploadDateReverseString = "Upload date reverse";
  const expireDateString = "Expire date";
  const expireDateReverseString = "Expire date reverse";
  const handleSelectChange = (event) => {
    console.log(event.target.value);
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case alphString:
        console.log("alpha");
        break;
      case alphReverseString:
        console.log("alph rev");
        break;
      case uploadDateString:
        console.log("up date");
        break;
      case uploadDateReverseString:
        console.log("up date rev");
        break;
      case expireDateString:
        console.log("exp");
        break;
      case expireDateReverseString:
        console.log("exp rev");
        break;

      default:
        console.log("idk");
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
      console.log(responseFiles);
      setFiles([...responseFiles]);
      // set loading false
      setIsLoading(false);
      return;
    } catch (error) {
      console.log(error);
    }
  };
  //when page is first rendered, check login and get file data from server
  useEffect(() => {
    // set login value async function check for user token and see if user is logged in
    // if not logged in, it redirects user back to home and "/files" route is protected
    const setLoginValue = async () => {
      const checkValue = await checkLogin();
      if (!checkValue) {
        return navigate("/");
      }
    };
    setLoginValue();
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <select onChange={handleSelectChange}>
              <option>Sort</option>
              <option>{alphString}</option>
              <option>{alphReverseString}</option>
              <option>{uploadDateString}</option>
              <option>{uploadDateReverseString}</option>
              <option>{expireDateString}</option>
              <option>{expireDateReverseString}</option>
            </select>
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
            <StyledNavButton
              onClick={() => {
                sessionStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </StyledNavButton>
          </StyledNavBar>
          <StyledFileContainer>
            <StyledTableHeader>File ID</StyledTableHeader>
            <StyledTableHeader>File Name</StyledTableHeader>
            <StyledTableHeader>Uploaded Date</StyledTableHeader>
            <StyledTableHeader>Expire Date</StyledTableHeader>
            <StyledTableHeader>Change Pasword</StyledTableHeader>
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
      ></Modal>
    </StyledFilePage>
  );
}
