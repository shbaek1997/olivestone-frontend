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
  //check dark mode
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  return (
    //if dark mode, page gets class "dark"
    <StyledPage className={isDarkMode && "dark"}>
      <NavBar></NavBar>
      <StyledContainer>
        <StyledHeader>{headerTitle}</StyledHeader>
        <StyledFormContainer>{children}</StyledFormContainer>
      </StyledContainer>
    </StyledPage>
  );
};
