import { useSelector } from "react-redux";

//Not found page
export const NotFound = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isActive);

  return isDarkMode ? (
    <>
      <h1 style={{ color: "white" }}>Ooops...!</h1>
      <h2 style={{ color: "white" }}>Page Not Found</h2>
    </>
  ) : (
    <>
      <h1>Ooops...!</h1>
      <h2>Page Not Found</h2>
    </>
  );
};
