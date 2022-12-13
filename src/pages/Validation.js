import ReactDOM from "react-dom";
import { turnAlertOff } from "../context/modalSlice";
import { turnAlertOn } from "../context/modalSlice";
import AlertModal from "../components/AlertModal";
import Api from "../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { StyledButton, StyledPage } from "../style/style";
import { useNavigate } from "react-router-dom";

const ValidationModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const confirmHandler = () => {
    dispatch(turnAlertOff());
    navigate("/login");
  };
  return ReactDOM.createPortal(
    <AlertModal confirmHandler={confirmHandler}></AlertModal>,
    document.body
  );
};
export const Validation = () => {
  const url = new URLSearchParams(window.location.search);
  const token = url.get("token");
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  const dispatch = useDispatch();
  const onClickHandler = async () => {
    try {
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
      style={{ justifyContent: "center" }}
      className={isDarkMode && "dark"}
    >
      <StyledButton onClick={onClickHandler} style={{ width: "200px" }}>
        Click to Verify Email
      </StyledButton>
      <ValidationModal></ValidationModal>
    </StyledPage>
  );
};
