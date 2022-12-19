import { StyledForm, StyledButton } from "../style/style";
import { useNavigate } from "react-router-dom";
//download page
export function EditProfileForm() {
  const navigate = useNavigate();
  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <StyledButton
        type="button"
        onClick={() => {
          navigate("/profile/name");
        }}
      >
        Edit name
      </StyledButton>
      <StyledButton
        type="button"
        onClick={() => {
          navigate("/profile/password");
        }}
      >
        Change Password
      </StyledButton>
    </StyledForm>
  );
}
