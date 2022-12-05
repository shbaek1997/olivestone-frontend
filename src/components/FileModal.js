import { useSelector, useDispatch } from "react-redux";
import { turnOff } from "../context/modalSlice";
import { ModalChangePassword } from "./ModalChangePassword";
import { ModalShareFile } from "./ModalShareFile";
import { ModalDeleteFile } from "./ModalDeleteFile";
import {
  CHANGE_PASSWORD_BUTTON_NAME,
  DELETE_FILE_BUTTON_NAME,
  SHARE_FILE_BUTTON_NAME,
} from "../config/variables";
import { StyledFileModal } from "../style/style";
//File Modal component
const FileModal = () => {
  //dispatch for redux
  const dispatch = useDispatch();
  // use selector to get states
  const modalMode = useSelector((state) => state.modal.modalMode);
  const isActive = useSelector((state) => state.modal.isActive);
  const isDarkMode = useSelector((state) => state.darkMode.isActive);

  const handleCancelButtonClick = () => {
    dispatch(turnOff());
  };
  return (
    <StyledFileModal
      id="file-password-modal"
      className={isDarkMode && "dark"}
      // if modal is active we display flex else modal display is none
      style={isActive ? { display: "flex" } : { display: "none" }}
    >
      {modalMode === CHANGE_PASSWORD_BUTTON_NAME && (
        <ModalChangePassword
          handleCancelButtonClick={handleCancelButtonClick}
        ></ModalChangePassword>
      )}
      {modalMode === SHARE_FILE_BUTTON_NAME && (
        <ModalShareFile
          handleCancelButtonClick={handleCancelButtonClick}
        ></ModalShareFile>
      )}
      {modalMode === DELETE_FILE_BUTTON_NAME && (
        <ModalDeleteFile
          handleCancelButtonClick={handleCancelButtonClick}
        ></ModalDeleteFile>
      )}
    </StyledFileModal>
  );
};

export default FileModal;
