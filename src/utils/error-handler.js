export const errorHandler = async (error) => {
  console.log(error);
  console.log(error.message);
  if (!error.response) {
    alert(error.message);
    return;
  }
  const { data } = error.response;
  if (error.response.data instanceof Blob) {
    let { reason } = JSON.parse(await data.text());
    const mongooseErrorMessage = reason.slice(0, 23);
    if (mongooseErrorMessage === "Cast to ObjectId failed") {
      reason = "올바른 형식의 아이디가 아닙니다.";
    }
    alert(reason);
    return;
  }
  if (error.response) {
    const { data } = error.response;
    const { reason } = data;
    alert(reason);
  }
};
