import {
  StyledHeader,
  StyledButtonContainer,
  StyledButton,
} from "../style/style";
import Api from "../utils/api";
import { errorHandler } from "../utils/error-handler";
import { useSelector, useDispatch } from "react-redux";
import { turnOff, setFiles } from "../context/modalSlice";

export const ModalDeleteFile = ({ handleCancelButtonClick }) => {
  //handle delete file button
  const dispatch = useDispatch();
  // use selector to get states
  const fileId = useSelector((state) => state.modal.fileId);
  const files = useSelector((state) => state.modal.files);
  const handleDeleteFileButtonClick = async (event) => {
    try {
      //expire file server-side also
      const api = Api();
      const response = await api.patch(`files/expireDate/${fileId}`, {
        headers: { "Content-Type": "application/json" },
      });
      //filter files after deleting
      const newFiles = files.filter((file) => file._id !== fileId);
      dispatch(setFiles(newFiles));
      //alert user
      const { originalName } = response?.data;
      alert(`${originalName} 파일이 성공적으로 삭제되었습니다.`);
      //turn off modal
      dispatch(turnOff());
    } catch (error) {
      errorHandler(error);
    }
  };
  return (
    <>
      <StyledHeader>Are you sure?</StyledHeader>
      <h3 style={{ color: "white" }}>
        You will not be able to revert this change
      </h3>
      <StyledButtonContainer>
        <StyledButton onClick={handleDeleteFileButtonClick}>
          Delete
        </StyledButton>
        <StyledButton onClick={handleCancelButtonClick}>Cancel</StyledButton>
      </StyledButtonContainer>
    </>
  );
};
