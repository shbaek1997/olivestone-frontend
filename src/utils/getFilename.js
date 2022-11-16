const getFilename = (response) => {
  // file name is in content disposition of header
  const contentDisposition = response.headers["content-disposition"];
  // declare file name
  let fileName = "untitled";
  if (contentDisposition) {
    //split content disposition string with ";"
    //then in that array get item with filename
    const [fileNameMatch] = contentDisposition
      .split(";")
      .filter((str) => str.includes("filename"));
    //we get item like "filename=something", so we split string by "="
    if (fileNameMatch) [, fileName] = fileNameMatch.split("=");
  }
  //we get url encoded file name as result, so we decode uri
  const decodedFileName = decodeURI(fileName);
  return decodedFileName;
};
export default getFilename;
