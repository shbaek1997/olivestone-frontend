import { useSelector, useDispatch } from "react-redux";
import { turnOff } from "../context/modalSlice";
import {
  CHANGE_PASSWORD_BUTTON_ID,
  DELETE_FILE_BUTTON_ID,
  SHARE_FILE_BUTTON_ID,
} from "../config/variables";
import { StyledFileModal } from "../style/style";
import { ModalChangePassword } from "./ModalChangePassword";
import { ModalShareFile } from "./ModalShareFile";
import { ModalDeleteFile } from "./ModalDeleteFile";

//File Modal component
const FileModal = () => {
  //dispatch for redux
  const dispatch = useDispatch();
  // use selector to get states
  const modalMode = useSelector((state) => state.modal.modalMode);
  const isActive = useSelector((state) => state.modal.isActive);

  const handleCancelButtonClick = () => {
    dispatch(turnOff());
  };
  return (
    <StyledFileModal
      id="file-password-modal"
      // if modal is active we display flex else modal display is none
      style={isActive ? { display: "flex" } : { display: "none" }}
    >
      {modalMode === CHANGE_PASSWORD_BUTTON_ID && (
        <ModalChangePassword
          handleCancelButtonClick={handleCancelButtonClick}
        ></ModalChangePassword>
      )}
      {modalMode === SHARE_FILE_BUTTON_ID && (
        <ModalShareFile
          handleCancelButtonClick={handleCancelButtonClick}
        ></ModalShareFile>
      )}
      {modalMode === DELETE_FILE_BUTTON_ID && (
        <ModalDeleteFile
          handleCancelButtonClick={handleCancelButtonClick}
        ></ModalDeleteFile>
      )}
    </StyledFileModal>
  );
};

export default FileModal;
