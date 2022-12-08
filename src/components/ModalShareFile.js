import { useDispatch, useSelector } from "react-redux";
import { turnOff, turnAlertOn } from "../context/modalSlice";
import { errorHandler } from "../utils/error-handler";
import { HOME_PAGE } from "../config/variables";
import {
  StyledForm,
  StyledHeader,
  StyledInput,
  StyledButton,
} from "../style/style";
//dispatch for redux

//Modal content for share files
export const ModalShareFile = ({ handleCancelButtonClick }) => {
  //dispatch for redux
  const dispatch = useDispatch();

  // use selector to get file Id
  const fileId = useSelector((state) => state.modal.fileId);

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
      //make modal inactive
      dispatch(turnOff());
    } catch (error) {
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
