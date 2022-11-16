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
  /////
  const [fileId, setFileId] = useState("");
  const [isActive, setIsActive] = useState(false);
  const setPropsFunc = (fileIdVal, clickVal) => {
    setIsActive(clickVal);
    setFileId(fileIdVal);
  };
  /////
  const navigate = useNavigate();
  const api = Api();
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const getFile = async () => {
    try {
      const response = await api.get("/files/files");
      const { data } = response;
      const responseFiles = data.files;
      setFiles([...responseFiles]);
      setIsLoading(false);
      return;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const setLoginValue = async () => {
      const checkValue = await checkLogin();
      if (!checkValue) {
        console.log(checkValue, "check value");
        return navigate("/");
      }
    };

    setLoginValue();
    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledFilePage
      id="file-page"
      style={isActive ? { opacity: "0.1" } : { opacity: "1" }}
    >
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <>
          <StyledNavBar>
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
            <StyledTableHeader>Expire Date</StyledTableHeader>
            <StyledTableHeader>Change Pasword</StyledTableHeader>
            {files.map(({ originalName, _id, expireDate }) => {
              return (
                <FileInfo
                  key={_id}
                  originalName={originalName}
                  _id={_id}
                  expireDate={expireDate}
                  setPropsFunc={setPropsFunc}
                ></FileInfo>
              );
            })}
          </StyledFileContainer>
        </>
      )}
      <Modal
        isActive={isActive}
        fileId={fileId}
        setPropsFunc={setPropsFunc}
      ></Modal>
    </StyledFilePage>
  );
}
