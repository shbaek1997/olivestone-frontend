import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByJWT } from "../context/authSlice";
import { setFiles } from "../context/fileSlice";
import Api from "../utils/api";
import FileInfo from "../components/FileInfo";
import FileModal from "../components/PopupModal";
import { NavBar } from "../components/Nav";
import { Loading } from "../components/Loading";
import Pagination from "../components/Pagination";
import {
  StyledPage,
  StyledFileContainer,
  StyledTableHeader,
  StyledPaginationContainer,
} from "../style/style";
// create Modal and attach to body, so it is outside of files page
// send file id, is modal active props, and setPropsFunc to change state of those props in the child components
const Modal = () => {
  return ReactDOM.createPortal(<FileModal></FileModal>, document.body);
};

export function Files() {
  //set file id and modal active, dark mode state
  const isActive = useSelector((state) => state.modal.isActive);
  const files = useSelector((state) => state.files.files);
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  // settings for pagination
  const [page, setPage] = useState(1);
  const itemsCountPerPage = 10;
  const handlePagination = (event) => {
    setPage(event);
  };
  //navigate to navigate between pages
  const navigate = useNavigate();
  //dispatch
  const dispatch = useDispatch();
  // set is loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // set login value async function check for user token and see if user is logged in
    // if not logged in, it redirects user back to home and "/files" route is protected
    // get all non expired files from the server and set files
    const getFile = async () => {
      try {
        // api get request to get all valid files
        const api = Api();
        const response = await api.get("/files/all");
        const { data } = response;
        const responseFiles = data.files;
        // set files by dispatching action
        dispatch(setFiles([...responseFiles]));
        //set loading false
        setIsLoading(false);
        return;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUserAndGetFile = async () => {
      try {
        //check user log in
        await dispatch(fetchUserByJWT()).unwrap();
        // get file
        getFile();
      } catch (error) {
        //failure redirects to login
        navigate("/login");
      }
    };
    fetchUserAndGetFile();
  }, [dispatch, navigate]);
  // dark-light mode class and active class for modal
  let classList = [];
  if (isDarkMode) {
    classList.push("dark");
  }
  if (isActive) {
    classList.push("active");
  }
  //get combined classes for dark mode and modal active
  //styled page classes change page blur and colors
  const classes = classList.join(" ");
  // table header inner content as an array
  const tableHeaderTitles = [
    "File ID",
    "File Name",
    "Upload Date",
    "Expire Date",
    "Change Password",
    "Share File",
    "Delete File",
  ];
  const isFilesListEmpty = files.length === 0;
  //inside styled page, we have two classes that impact style of file page
  // if loading, we show loading page
  // else we show nav bar + table headers + file info + pagination at bottom
  // the modal is outside of styled page and is attached to body - portal component
  return (
    <StyledPage id="file-page" className={classes}>
      {/* if loading we show "loading..." else we show file page */}
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <NavBar></NavBar>
          {isFilesListEmpty ? (
            <>
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50%",
                }}
              >
                Sorry, users you can view are empty
              </h2>
            </>
          ) : (
            <>
              {" "}
              <StyledFileContainer>
                {tableHeaderTitles.map((title) => {
                  return (
                    <StyledTableHeader
                      key={title}
                      className={isDarkMode && "dark-header"}
                    >
                      {title}
                    </StyledTableHeader>
                  );
                })}
                {/* we render file info by using info from files array, slice part is pagination logic */}
                {files
                  .map(({ originalName, _id, expireDate, createdAt }) => {
                    return (
                      <FileInfo
                        key={_id}
                        originalName={originalName}
                        _id={_id}
                        createdAt={createdAt}
                        expireDate={expireDate}
                      ></FileInfo>
                    );
                  })
                  .slice(
                    (page - 1) * itemsCountPerPage,
                    page * itemsCountPerPage
                  )}
              </StyledFileContainer>
              <StyledPaginationContainer className={isDarkMode && "dark"}>
                <Pagination
                  page={page}
                  itemsCountPerPage={itemsCountPerPage}
                  setOnChangeHandler={handlePagination}
                  count={files.length}
                ></Pagination>
              </StyledPaginationContainer>
            </>
          )}
        </>
      )}
      {/*Modal component here */}
      <Modal></Modal>
    </StyledPage>
  );
}
