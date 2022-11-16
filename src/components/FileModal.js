import styled from "styled-components";
import { StyledForm, StyledInput, StyledButton } from "../style/style";
import Api from "../utils/api";
import useInput from "../hooks/useInput";
import { errorHandler } from "../utils/error-handler";
const FileModal = ({ isActive, fileId, setPropsFunc }) => {
  const [filePassword, setFilePassword, handleChangeFilePassword] =
    useInput("");
  const [
    fileRepeatPassword,
    setFileRepeatPassword,
    handleChangeFileRepeatPassword,
  ] = useInput("");
  const handleModalSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(fileId);
      const api = Api();
      console.log("passwords:", filePassword, fileRepeatPassword);
      const response = await api.patch(
        `files/${fileId}`,
        { filePassword, fileRepeatPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setFilePassword("");
      setFileRepeatPassword("");
      const { originalName } = response?.data;
      alert(`${originalName} 파일 비밀번호가 성공적으로 변경되었습니다.`);
      setPropsFunc("", false);
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <StyledFileModal
      id="file-password-modal"
      style={isActive ? { display: "flex" } : { display: "none" }}
    >
      <StyledForm onSubmit={handleModalSubmit}>
        <label>Enter new file password</label>
        <StyledInput
          type={"password"}
          required
          value={filePassword}
          onChange={handleChangeFilePassword}
        ></StyledInput>
        <label>Confirm new file password</label>
        <StyledInput
          type={"password"}
          required
          value={fileRepeatPassword}
          onChange={handleChangeFileRepeatPassword}
        ></StyledInput>
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
