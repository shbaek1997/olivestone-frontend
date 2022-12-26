import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { turnAlertOff, turnAlertOn } from "../context/modalSlice";
import AlertModal from "../components/AlertModal";
import Api from "../utils/api";
import { StyledButton, StyledPage } from "../style/style";

// modal for email confirmation button
const ValidationModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //confirm handler for pop up modal
  const confirmHandler = () => {
    //turn off modal
    dispatch(turnAlertOff());
    //go to login after clicking the button
    navigate("/login");
  };
  //new alert modal for email confirmation
  return ReactDOM.createPortal(
    <AlertModal confirmHandler={confirmHandler}></AlertModal>,
    document.body
  );
};
// email validation page
export const Validation = () => {
  //get token from url params
  const url = new URLSearchParams(window.location.search);
  const token = url.get("token");
  //check dark mode
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  const dispatch = useDispatch();
  //handler for clicking confirmation button
  const onClickHandler = async () => {
    try {
      //check email validation using api
      const api = Api();
      await api.get(`/users/verify?token=${token}`);
      dispatch(turnAlertOn(" 인증되었습니다."));
    } catch (error) {
      if (error.response) {
        const { data } = error?.response;
        const { reason } = data;
        dispatch(turnAlertOn(reason));
        return;
      }
      const { message } = error;
      dispatch(turnAlertOn(message));
    }
  };
  return (
    <StyledPage
      style={{ justifyContent: "center", backgroundColor: "rgb(30, 30, 30)" }}
      className={isDarkMode && "dark"}
    >
      <StyledButton onClick={onClickHandler} style={{ width: "200px" }}>
        Click to Verify Email
      </StyledButton>
      <ValidationModal></ValidationModal>
    </StyledPage>
  );
};
