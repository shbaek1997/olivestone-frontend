import { useSelector } from "react-redux";
import { StyledPage } from "../style/style";

//Loading component
export const Loading = () => {
  //get dark mode state
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  //if dark mode, loading component gets class "dark"
  return <StyledPage className={isDarkMode && "dark"}>Loading ....</StyledPage>;
};
