import styled from "styled-components";
import { StyledForm, StyledInput, StyledButton } from "../style/style";
const FileModal = ({ isActive, fileId, setPropsFunc }) => {
  const handleModalSubmit = (event) => {
    event.preventDefault();
    console.log(fileId);
  };
  return (
    <StyledFileModal
      id="file-password-modal"
      style={isActive ? { display: "flex" } : { display: "none" }}
    >
      <StyledForm onSubmit={handleModalSubmit}>
        <label>Enter new file password</label>
        <StyledInput type={"password"} required></StyledInput>
        <label>Confirm new file password</label>
        <StyledInput type={"password"} required></StyledInput>
        <StyledButton>Submit</StyledButton>
      </StyledForm>
      <StyledButton
        onClick={() => {
          setPropsFunc("", false);
        }}
      >
        Cancel
      </StyledButton>
    </StyledFileModal>
  );
};

export default FileModal;

const StyledFileModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: black;
  border-radius: 10px;
  padding: 40px;
  color: white;
`;
