import styled from "styled-components";
export const StyledButton = styled.button`
  padding: 10px;
  width: 100%;
  margin: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  background-color: grey;
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
