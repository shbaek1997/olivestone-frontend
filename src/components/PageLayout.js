import { useSelector } from "react-redux";
import { NavBar } from "./Nav";
import {
  StyledPage,
  StyledContainer,
  StyledHeader,
  StyledFormContainer,
} from "../style/style";
//same page layout used for upload, download, login pages
// children prop to insert child components
// header title changes the header of the form
export const PageLayout = ({ children, headerTitle }) => {
  //check dark mode, alert active
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  const isAlertActive = useSelector((state) => state.modal.isAlertActive);
  //get combined classes for dark mode and alert active
  let classList = [];
  if (isDarkMode) {
    classList.push("dark");
  }
  if (isAlertActive) {
    classList.push("active");
  }

  const classes = classList.join(" ");

  return (
    <StyledPage className={classes}>
      <NavBar></NavBar>
      <StyledContainer>
        <StyledHeader>{headerTitle}</StyledHeader>
        <StyledFormContainer>{children}</StyledFormContainer>
      </StyledContainer>
    </StyledPage>
  );
};
