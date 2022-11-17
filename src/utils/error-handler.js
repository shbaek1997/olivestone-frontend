// error handler to handle mostly axios errors
export const errorHandler = async (error) => {
  //if not axios error, just alert error.message
  if (!error.response) {
    alert(error.message);
    return;
  }
  const { data } = error.response;
  //specific for downloading improper file ID format
  if (error.response.data instanceof Blob) {
    let { reason } = JSON.parse(await data.text());
    const mongooseErrorMessage = reason.slice(0, 23);
    if (mongooseErrorMessage === "Cast to ObjectId failed") {
      reason = "올바른 형식의 아이디가 아닙니다.";
    }
    alert(reason);
    return;
  }
  //if it is axios error ...
  if (error.response) {
    const { data } = error.response;
    const { reason } = data;
    alert(reason);
  }
};
