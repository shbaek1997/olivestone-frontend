import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkLogin from "../utils/checkLogin";
import Api from "../utils/api";
import FileInfo from "../components/FileInfo";
import styled from "styled-components";

export function Files() {
  const navigate = useNavigate();
  const api = Api();
  const [files, setFiles] = useState([]);
  const getFile = async () => {
    try {
      const response = await api.get("/files/files");
      const { data } = response;
      const responseFiles = data.files;
      setFiles([...responseFiles]);
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
  }, []);
  return (
    <>
      <StyledFileContainer>
        <div>File ID</div>
        <div>File Name</div>
        <div>Expire Date</div>
        <div>Change Pasword</div>
        {files.map(({ originalName, _id, expireDate }) => {
          return (
            <FileInfo
              key={_id}
              originalName={originalName}
              _id={_id}
              expireDate={expireDate}
            ></FileInfo>
          );
        })}
      </StyledFileContainer>
      <button>Go Back</button>
    </>
  );
}

const StyledFileContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 100px 150px;
`;
