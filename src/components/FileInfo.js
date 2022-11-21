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
  const handleButtonChangePasswordClick = (event) => {
    setPropsFunc(_id, true, true);
  };
  const handleButtonDeleteFileClick = (event) => {
    setPropsFunc(_id, true, false);
  };

  return (
    <>
      <StyledTableDiv>{_id}</StyledTableDiv>
      <StyledTableDiv
        className={"original-name"}
        onClick={() => {
          console.log(originalName);
        }}
      >
        {originalName}
      </StyledTableDiv>
      <StyledTableDiv>{uploadedDateToString}</StyledTableDiv>
      <StyledTableDiv>{expireDateToString}</StyledTableDiv>
      <StyledFileButton
        className={"password-change-button"}
        onClick={handleButtonChangePasswordClick}
      >
        Change Password
      </StyledFileButton>
      <StyledFileButton
        onClick={() => {
          console.log();
        }}
      >
        Copy Link
      </StyledFileButton>
      <StyledFileButton onClick={handleButtonDeleteFileClick}>
        Delete File
      </StyledFileButton>
    </>
  );
};

export default FileInfo;
