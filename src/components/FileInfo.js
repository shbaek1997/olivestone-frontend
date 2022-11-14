const FileInfo = ({ originalName, _id, expireDate }) => {
  const expireDateToString = expireDate.toString().slice(0, 10);
  const handleButtonClick = (event) => {
    //여기서 아이디 값으로 api요청 수정..
    console.log(_id);
  };

  return (
    <>
      <div>{_id}</div>
      <div>{originalName}</div>
      <div>{expireDateToString}</div>
      <button onClick={handleButtonClick}>Change Password</button>
    </>
  );
};

export default FileInfo;
