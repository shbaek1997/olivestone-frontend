import { useSelector } from "react-redux";
import { StyledAlertModal, StyledHeader, StyledButton } from "../style/style";
// AlertModal is replacing the alert function
const AlertModal = ({ confirmHandler }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  const isAlertActive = useSelector((state) => state.modal.isAlertActive);
  const alertMessage = useSelector((state) => state.modal.alertModalContent);
  return (
    <StyledAlertModal
      // if it is dark mode, modal style is dark
      className={isDarkMode && "dark"}
      // if alert modal is active, we display the alert modal
      style={isAlertActive ? { display: "flex" } : { display: "none" }}
    >
      <StyledHeader>Message</StyledHeader>
      <h3 style={{ color: "white" }}>{alertMessage}</h3>
      <StyledButton onClick={confirmHandler}>Ok</StyledButton>
    </StyledAlertModal>
  );
};

export default AlertModal;
