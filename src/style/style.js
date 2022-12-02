import styled from "styled-components";
import { MIDDLE_COLOR, DARK_COLOR } from "../config/variables";
//all css styles in a single file using styled-components

// upload/download pages
export const StyledFileInput = styled.input`
  margin: 10px;
  padding: 10px;
`;
export const StyledButton = styled.button`
  padding: 10px;
  width: 100%;
  margin: 10px;

  height: 60px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  background-color: ${MIDDLE_COLOR};
  border-radius: 10px;
  border: none;
  &:hover {
    background-color: white;
    cursor: pointer;
    color: black;
  }
`;
export const StyledInput = styled.input`
  width: 90%;
  margin: 10px;
  padding: 10px;
  border: 4px solid white;
  box-shadow: 0px 0px 5px rgb(60, 60, 60);
  &:last-of-type {
    margin-bottom: 40px;
  }
  &:focus {
    outline: none;
    border-color: ${MIDDLE_COLOR};
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: ${DARK_COLOR};
  padding: 40px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 350px;
  margin-top: 70px;
`;

export const StyledHeader = styled.div`
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 50px;
`;

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

//File info .js
export const StyledTableDiv = styled.div`
  display: flex;
  align-items: center;

  &.original-name:hover {
    color: ${MIDDLE_COLOR};
    cursor: pointer;
  }
`;
export const StyledFileButton = styled.button`
  width: 100px;
  color: white;
  background-color: ${DARK_COLOR};
  padding: 10px;
  height: 35px;
  margin: auto;

  border-radius: 10px;
  border: none;
  font-weight: bold;
  &:hover {
    background-color: ${MIDDLE_COLOR};
    cursor: pointer;
  }
  &.change-password-button {
    width: 150px;
  }
`;

//files.js
export const StyledSelect = styled.select`
  margin: 40px 10px;
  width: 180px;
  height: 40px;
  color: white;
  background-color: ${DARK_COLOR};
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: none;
  outline: none;
  &:hover {
    background-color: ${MIDDLE_COLOR};
    cursor: pointer;
  }
`;
export const StyledTableHeader = styled.div`
  display: flex;
  border-bottom: 2px solid black;
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  &.dark-header {
    border-bottom: white solid 2px;
  }
`;

export const StyledFileContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 250px 1fr 100px 100px 150px 100px 100px;
  width: 90%;
`;

export const StyledNavBar = styled.div`
  display: flex;
  width: 100vw;
  justify-content: flex-end;
  margin-right: 150px;
`;

export const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  &.active {
    filter: blur(10px);
    pointer-events: none;
  }
  &.dark {
    background-color: rgb(30, 30, 30);
    color: white;
  }
  &.dark button,
  &.dark select {
    background-color: ${MIDDLE_COLOR};
    color: ${DARK_COLOR};
    &:hover {
      background-color: white;
      cursor: pointer;
      color: ${DARK_COLOR};
    }
  }

  &.dark input {
    background-color: rgb(60, 60, 60);
    border: rgb(60, 60, 60) 4px solid;
    color: white;
    &:focus {
      border-color: ${MIDDLE_COLOR};
    }
  }
`;

export const StyledNavButton = styled.button`
  margin: 40px 10px;
  width: 100px;
  height: 40px;
  color: white;
  background-color: ${DARK_COLOR};
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${MIDDLE_COLOR};
    cursor: pointer;
  }
`;

//file modal
export const StyledFileModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${DARK_COLOR};
  border-radius: 10px;
  padding: 40px;
  color: white;
  z-index: 2;
  &.dark input {
    background-color: rgb(60, 60, 60);
    border: rgb(60, 60, 60) 4px solid;
    color: white;
    &:focus {
      outline: none;
      border-color: ${MIDDLE_COLOR};
    }
  }
  &.dark button {
    color: ${DARK_COLOR};
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledPaginationContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    background-color: ${DARK_COLOR};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    margin: 5px;
    & a {
      text-decoration: none;
      color: ${MIDDLE_COLOR};
      font-size: 1rem;
    }
  }
  ul.pagination li.active {
    background-color: ${MIDDLE_COLOR};
    & a {
      color: ${DARK_COLOR};
    }
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: white;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: ${DARK_COLOR};
  }
`;
