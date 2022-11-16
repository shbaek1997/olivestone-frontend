import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import checkLogin from "../utils/checkLogin";
import Api from "../utils/api";
import FileInfo from "../components/FileInfo";
import FileModal from "../components/FileModal";
import styled from "styled-components";

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
    console.log("fileId", fileId);
    console.log(isActive);
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
              Go Back
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
const StyledTableHeader = styled.div`
  display: flex;
  border-bottom: 2px solid black;
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
`;

const StyledFileContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 250px 1fr 100px 150px;
  width: 90%;
`;

const StyledNavBar = styled.div`
  display: flex;
  width: 100vw;
  justify-content: flex-end;
  margin-right: 150px;
`;

const StyledFilePage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const StyledNavButton = styled.button`
  margin: 40px 10px;
  width: 100px;
  height: 40px;
  color: white;
  background-color: black;
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`;

// padding: 10px;
// width: 100%;
// margin: 10px;
// color: white;
// font-weight: bold;
// font-size: 16px;
// background-color: grey;
// &:hover {
//   background-color: white;
//   cursor: pointer;
//   color: black;
// }
