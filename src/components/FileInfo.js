import styled from "styled-components";

const FileInfo = ({ originalName, _id, expireDate, setPropsFunc }) => {
  const expireDateToString = expireDate.toString().slice(0, 10);
  const handleButtonClick = (event) => {
    setPropsFunc(_id, true);
  };

  return (
    <>
      <StyledTableDiv>{_id}</StyledTableDiv>
      <StyledTableDiv>{originalName}</StyledTableDiv>
      <StyledTableDiv>{expireDateToString}</StyledTableDiv>
      <StyledFileButton onClick={handleButtonClick}>
        Change Password
      </StyledFileButton>
    </>
  );
};

export default FileInfo;

const StyledTableDiv = styled.div`
  display: flex;
  align-items: center;
`;
const StyledFileButton = styled.button`
  width: 150px;
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
