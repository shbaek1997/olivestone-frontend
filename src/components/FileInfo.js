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
    const modalMode = event.target.id;
    setPropsFunc(_id, true, modalMode);
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
        id={"change-password"}
        className={"change-password-button"}
        onClick={handleButtonClick}
      >
        Change Password
      </StyledFileButton>
      <StyledFileButton id={"copy-link"} onClick={handleButtonClick}>
        Share File
      </StyledFileButton>
      <StyledFileButton id={"delete-file"} onClick={handleButtonClick}>
        Delete File
      </StyledFileButton>
    </>
  );
};

export default FileInfo;
