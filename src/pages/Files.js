import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import Api from "../utils/api";
import FileInfo from "../components/FileInfo";
import FileModal from "../components/FileModal";
import {
  StyledPage,
  StyledFileContainer,
  StyledTableHeader,
} from "../style/style";

import { fetchUserByJWT } from "../context/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { setFiles } from "../context/modalSlice";
import { NavBar } from "../components/Nav";
// create Modal and attach to body, so it is outside of files page
// send file id, is modal active props, and setPropsFunc to change state of those props in the child components
const Modal = () => {
  return ReactDOM.createPortal(<FileModal></FileModal>, document.body);
};

export function Files() {
  //set file id and is modal active state
  const isActive = useSelector((state) => state.modal.isActive);
  const files = useSelector((state) => state.modal.files);

  //set props func which change state of those props
  //navigate to navigate between pages
  const navigate = useNavigate();
  // api call
  // set loading and files state
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  // get all non expired files from the server and set files
  const getFile = async () => {
    try {
      // api get request to get all valid files
      const api = Api();
      const response = await api.get("/files/files");
      const { data } = response;
      const responseFiles = data.files;
      // set files
      dispatch(setFiles([...responseFiles]));
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
    <StyledPage
      id="file-page"
      style={isActive ? { opacity: "0.1" } : { opacity: "1" }}
    >
      {/* if loading we show "loading..." else we show file page */}
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <NavBar></NavBar>
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
                ></FileInfo>
              );
            })}
          </StyledFileContainer>
        </>
      )}
      {/*Modal component here */}
      <Modal></Modal>
    </StyledPage>
  );
}
