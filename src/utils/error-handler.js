// error handler to handle mostly axios errors
export const errorHandler = async (error) => {
  //if not axios error, just alert error.message
  if (!error.response) {
    return error.message;
  }
  const { data } = error.response;
  // specific for downloading improper file ID format
  if (error.response.data instanceof Blob) {
    let { reason } = JSON.parse(await data.text());
    return reason;
  }
  //if it is axios error ...

  const { reason } = data;
  return reason;
};
