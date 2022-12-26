import { useNavigate } from "react-router-dom";
import { StyledForm, StyledButton } from "../style/style";

// first form the user see on the edit profile page
export function EditProfileForm() {
  const navigate = useNavigate();
  //two options - edit name/ edit password
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
