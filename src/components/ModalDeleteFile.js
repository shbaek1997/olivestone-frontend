import { useSelector, useDispatch } from "react-redux";
import { turnOff, turnAlertOn } from "../context/modalSlice";
import { setFiles } from "../context/fileSlice";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import {
  StyledHeader,
  StyledButtonContainer,
  StyledButton,
} from "../style/style";

// Modal content for deleting file
export const ModalDeleteFile = ({ handleCancelButtonClick }) => {
  const dispatch = useDispatch();
  const fileId = useSelector((state) => state.modal.id);
  const files = useSelector((state) => state.files.files);
  //handler for clicking delete file button
  const handleDeleteFileButtonClick = async (event) => {
    try {
      //expire file + delete file in server directory on the server-side
      const api = Api();
      const response = await api.patch(`files/expireDate/${fileId}`, {
        headers: { "Content-Type": "application/json" },
      });
      //filter files after deleting to re-render files page
      const newFiles = files.filter((file) => file._id !== fileId);
      dispatch(setFiles(newFiles));
      //alert user that the file was deleted successfully
      const { originalName } = response?.data;
      dispatch(
        turnAlertOn(`${originalName} 파일이 성공적으로 삭제되었습니다.`)
      );
      //turn off modal
      dispatch(turnOff());
    } catch (error) {
      //pop up alert modal if error
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };
  return (
    <>
      <StyledHeader>Are you sure?</StyledHeader>
      <h3 style={{ color: "white" }}>파일을 삭제하면 되돌릴 수 없습니다.</h3>
      <StyledButtonContainer>
        <StyledButton onClick={handleDeleteFileButtonClick}>
          Delete
        </StyledButton>
        <StyledButton onClick={handleCancelButtonClick}>Cancel</StyledButton>
      </StyledButtonContainer>
    </>
  );
};
