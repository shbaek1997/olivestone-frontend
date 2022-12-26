import { useRef } from "react";
import { useDispatch } from "react-redux";
import { turnAlertOn } from "../context/modalSlice";
import useInput from "../hooks/useInput";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import { uploadFileSchema } from "../validation/validationSchema";
import {
  StyledForm,
  StyledButton,
  StyledInput,
  StyledFileInput,
} from "../style/style";

//Upload Form
export const UploadForm = () => {
  // set password , password repeat, valid period for upload file
  const [uploadPassword, setUploadPassword, handleChangeUploadPassword] =
    useInput("");
  const [validPeriod, setValidPeriod, handleValidPeriod] = useInput(7);
  const [
    uploadPasswordRepeat,
    setUploadPasswordRepeat,
    handleChangeUploadPasswordRepeat,
  ] = useInput("");
  const dispatch = useDispatch();

  //use Ref for input type file
  const fileInputRef = useRef(null);
  // reset file input after file upload success
  const resetFileInput = () => {
    fileInputRef.current.value = "";
  };
  // handle upload submit
  const handleUploadSubmit = async (e) => {
    try {
      e.preventDefault();

      //get file from file input
      const file = fileInputRef.current.files[0];
      // validate upload password, password repeat, valid period
      await uploadFileSchema.validate({
        file,
        uploadPassword,
        uploadPasswordRepeat,
        validPeriod,
      });
      //create new form data
      let formData = new FormData();
      // add key/value to form data
      formData.append("password", uploadPassword);
      formData.append("passwordRepeat", uploadPasswordRepeat);
      formData.append("validPeriod", validPeriod);
      // adding file last is important for multer middleware to work
      formData.append("file", file);
      // use api post request to upload file to server
      const api = Api();
      const response = await api.post("files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data; charset=UTF-8" },
      });
      // upload success, so reset input fields
      setUploadPassword("");
      resetFileInput();
      setUploadPasswordRepeat("");
      setValidPeriod(7);
      //get file name uploaded from response and alert user
      const uploadedFile = response.data.file;
      dispatch(
        turnAlertOn(
          `${uploadedFile.originalName} 파일이 성공적으로 업로드 되었습니다. 파일 페이지에서 확인할 수 있습니다.`
        )
      );
    } catch (error) {
      //pop up alert modal if error
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };

  return (
    <StyledForm
      method="post"
      encType="multipart/form-data"
      onSubmit={handleUploadSubmit}
      acceptCharset="UTF-8"
    >
      <label htmlFor="file-input">Upload file</label>
      <StyledFileInput
        id="file-input"
        ref={fileInputRef}
        style={{ backgroundColor: "transparent", border: "none" }}
        type="file"
        required
      ></StyledFileInput>
      <label htmlFor="file-password-input">File Password</label>
      <StyledInput
        id="file-password-input"
        type="password"
        value={uploadPassword}
        onChange={handleChangeUploadPassword}
        required
      ></StyledInput>
      <label htmlFor="file-password-repeat-input">Confirm File Password</label>
      <StyledInput
        id="file-password-repeat-input"
        type="password"
        value={uploadPasswordRepeat}
        onChange={handleChangeUploadPasswordRepeat}
        required
      ></StyledInput>
      <label htmlFor="valid-days-input">Valid for ( in days )</label>
      <StyledInput
        id="valid-days-input"
        type="number"
        min={1}
        value={validPeriod}
        onChange={handleValidPeriod}
        required
      ></StyledInput>
      <StyledButton type="submit">Upload File</StyledButton>
    </StyledForm>
  );
};
