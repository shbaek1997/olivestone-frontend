import {
  StyledForm,
  StyledHeader,
  StyledInput,
  StyledButton,
} from "../style/style";
import { useDispatch, useSelector } from "react-redux";
import { turnOff } from "../context/modalSlice";
import { HOME_PAGE } from "../config/variables";
import { errorHandler } from "../utils/error-handler";
//dispatch for redux

export const ModalShareFile = ({ handleCancelButtonClick }) => {
  const dispatch = useDispatch();

  // use selector to get states
  const fileId = useSelector((state) => state.modal.fileId);

  //copy url var for share file mode
  const COPY_URL = `${HOME_PAGE}/?fileId=${fileId}`;
  //handle copy to clipboard button
  const handleCopyButtonClick = async (event) => {
    try {
      //copy url to clipboard
      await window.navigator.clipboard.writeText(COPY_URL);
      //alert user
      alert("클립보드에 복사하였습니다");
      //make modal inactive
      dispatch(turnOff());
    } catch (error) {
      errorHandler(error);
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
