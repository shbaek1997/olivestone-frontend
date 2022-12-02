import { useSelector } from "react-redux";
import {
  StyledPage,
  StyledContainer,
  StyledHeader,
  StyledFormContainer,
} from "../style/style";
import { NavBar } from "./Nav";
export const PageLayout = ({ children, headerTitle }) => {
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  return (
    <StyledPage className={isDarkMode && "dark"}>
      <NavBar></NavBar>
      <StyledContainer>
        <StyledHeader>{headerTitle}</StyledHeader>
        <StyledFormContainer>{children}</StyledFormContainer>
      </StyledContainer>
    </StyledPage>
  );
};
