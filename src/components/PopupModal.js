import { useSelector, useDispatch } from "react-redux";
import { turnOff } from "../context/modalSlice";
import { ModalChangePassword } from "./ModalChangePassword";
import { ModalShareFile } from "./ModalShareFile";
import { ModalDeleteFile } from "./ModalDeleteFile";
import { ModalDeleteUser } from "./ModalDeleteUser";
import { ModalChangeRole } from "./ModalChangeRole";
import {
  CHANGE_PASSWORD_BUTTON_NAME,
  DELETE_FILE_BUTTON_NAME,
  SHARE_FILE_BUTTON_NAME,
  DELETE_USER_BUTTON_NAME,
  CHANGE_ROLE_BUTTON_NAME,
} from "../config/variables";
import { StyledPopupModal } from "../style/style";
//File Modal component
const PopupModal = () => {
  //dispatch for redux
  const dispatch = useDispatch();
  // use selector to get states
  const modalMode = useSelector((state) => state.modal.modalMode);
  const isActive = useSelector((state) => state.modal.isActive);
  const isDarkMode = useSelector((state) => state.darkMode.isActive);

  //click on cancel button on modal turns off modal
  const handleCancelButtonClick = () => {
    dispatch(turnOff());
  };
  //if modal is active, we display modal, else we display none
  // depending on the mode of modal, the content of modal changes..
  return (
    <StyledPopupModal
      // if darkmode, modal gets class "dark"
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
      {modalMode === CHANGE_ROLE_BUTTON_NAME && (
        <ModalChangeRole
          handleCancelButtonClick={handleCancelButtonClick}
        ></ModalChangeRole>
      )}
      {modalMode === DELETE_USER_BUTTON_NAME && (
        <ModalDeleteUser
          handleCancelButtonClick={handleCancelButtonClick}
        ></ModalDeleteUser>
      )}
    </StyledPopupModal>
  );
};

export default PopupModal;
