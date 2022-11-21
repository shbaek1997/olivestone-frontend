import getFilename from "./getFilename";
const downloadFile = (response) => {
  const contentType = response.headers["content-type"];
  const blob = new Blob([response.data], {
    type: contentType,
    encoding: "UTF-8",
  });
  // create a tag link
  const link = document.createElement("a");
  //attach blob to link, set download name as decoded file name, then click the link to start downlad
  const decodedFileName = getFilename(response);
  link.href = window.URL.createObjectURL(blob);
  link.download = decodedFileName;
  link.click();
};

export default downloadFile;
