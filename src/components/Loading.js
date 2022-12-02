import { StyledPage } from "../style/style";
import { useSelector } from "react-redux";

export const Loading = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  return <StyledPage className={isDarkMode && "dark"}>Loading ....</StyledPage>;
};
