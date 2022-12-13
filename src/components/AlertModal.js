import { useSelector } from "react-redux";
import { StyledAlertModal, StyledHeader, StyledButton } from "../style/style";
//File Modal component
const AlertModal = ({ confirmHandler }) => {
  //dispatch for redux
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  const isAlertActive = useSelector((state) => state.modal.isAlertActive);
  const alertMessage = useSelector((state) => state.modal.alertModalContent);

  //if modal is active, we display modal, else we display none
  // depending on the mode of modal, the content of modal changes..
  return (
    <StyledAlertModal
      // if darkmode, modal gets class "dark"
      className={isDarkMode && "dark"}
      // if modal is active we display flex else modal display is none
      //   style={isActive ? { display: "flex" } : { display: "none" }}
      style={isAlertActive ? { display: "flex" } : { display: "none" }}
    >
      <StyledHeader>Message</StyledHeader>
      <h3 style={{ color: "white" }}>{alertMessage}</h3>
      <StyledButton onClick={confirmHandler}>Ok</StyledButton>
    </StyledAlertModal>
  );
};

export default AlertModal;
