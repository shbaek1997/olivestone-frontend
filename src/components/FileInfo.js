import { StyledTableDiv, StyledFileButton } from "../style/style";
//file info component
//get props about file and setPropsFunc for change password button
const FileInfo = ({
  originalName,
  _id,
  expireDate,
  setPropsFunc,
  createdAt,
}) => {
  //convert expire date to YY-MM-DD formate
  const expireDateToString = expireDate.toString().slice(0, 10);
  const uploadedDateToString = createdAt.toString().slice(0, 10);
  //on button click, we set fileId value and isActive to true
  const handleButtonClick = (event) => {
    setPropsFunc(_id, true);
  };

  return (
    <>
      <StyledTableDiv>{_id}</StyledTableDiv>
      <StyledTableDiv>{originalName}</StyledTableDiv>
      <StyledTableDiv>{uploadedDateToString}</StyledTableDiv>
      <StyledTableDiv>{expireDateToString}</StyledTableDiv>
      <StyledFileButton onClick={handleButtonClick}>
        Change Password
      </StyledFileButton>
    </>
  );
};

export default FileInfo;
