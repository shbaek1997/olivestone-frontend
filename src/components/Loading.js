import { useSelector } from "react-redux";
import { StyledPage } from "../style/style";

export const Loading = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  return <StyledPage className={isDarkMode && "dark"}>Loading ....</StyledPage>;
};
