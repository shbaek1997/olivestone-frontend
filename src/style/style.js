import styled from "styled-components";
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
  color: white;
  font-weight: bold;
  font-size: 16px;
  background-color: grey;
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
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: black;
  padding: 40px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 350px;
`;

export const StyledHeader = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
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
    color: blue;
    cursor: pointer;
  }
`;
export const StyledFileButton = styled.button`
  width: 100px;
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
  background-color: black;
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
    background-color: grey;
    cursor: pointer;
  }
`;
export const StyledTableHeader = styled.div`
  display: flex;
  border-bottom: 2px solid black;
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
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

export const StyledFilePage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

export const StyledNavButton = styled.button`
  margin: 40px 10px;
  width: 100px;
  height: 40px;
  color: white;
  background-color: black;
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`;

//file modal
export const StyledFileModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: black;
  border-radius: 10px;
  padding: 40px;
  color: white;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
