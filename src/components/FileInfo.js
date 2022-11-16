import { StyledTableDiv, StyledFileButton } from "../style/style";
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
