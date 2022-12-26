import { useDispatch, useSelector } from "react-redux";
import { turnOff, turnAlertOn } from "../context/modalSlice";
import { HOME_PAGE } from "../config/variables";
import { errorHandler } from "../utils/error-handler";
import {
  StyledForm,
  StyledHeader,
  StyledInput,
  StyledButton,
} from "../style/style";

//Modal content for share files
export const ModalShareFile = ({ handleCancelButtonClick }) => {
  const dispatch = useDispatch();
  const fileId = useSelector((state) => state.modal.id);

  //copy url variable for share file mode
  const COPY_URL = `${HOME_PAGE}/?fileId=${fileId}`;
  //handle copy to clipboard button
  const handleCopyButtonClick = async (event) => {
    try {
      event.preventDefault();
      //copy url to clipboard
      await window.navigator.clipboard.writeText(COPY_URL);
      //alert user
      dispatch(turnAlertOn("클립보드에 복사하였습니다"));
      //turn off modal
      dispatch(turnOff());
    } catch (error) {
      //pop-up alert modal if error
      const message = await errorHandler(error);
      dispatch(turnAlertOn(message));
    }
  };
  return (
    <>
      <StyledForm>
        <StyledHeader>Copy Link</StyledHeader>
        <StyledInput readOnly value={COPY_URL}></StyledInput>
        <StyledButton onClick={handleCopyButtonClick}>
          Copy to Clipboard
        </StyledButton>
      </StyledForm>
      <StyledButton onClick={handleCancelButtonClick}>Cancel</StyledButton>
    </>
  );
};
