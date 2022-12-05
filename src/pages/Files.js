import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByJWT } from "../context/authSlice";
import { setFiles } from "../context/fileSlice";
import Api from "../utils/api";
import FileInfo from "../components/FileInfo";
import FileModal from "../components/FileModal";
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
  //set file id and is modal active state
  const isActive = useSelector((state) => state.modal.isActive);
  const files = useSelector((state) => state.files.files);
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  const [page, setPage] = useState(1);
  const itemsCountPerPage = 10;

  const handlePagination = (event) => {
    setPage(event);
  };
  //set props func which change state of those props
  //navigate to navigate between pages
  const navigate = useNavigate();
  // api call
  // set loading and files state
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  //when page is first rendered, check login and get file data from server
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
        // set files
        dispatch(setFiles([...responseFiles]));
        setIsLoading(false);
        return;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUserAndGetFile = async () => {
      try {
        await dispatch(fetchUserByJWT()).unwrap();
        getFile();
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUserAndGetFile();
  }, [dispatch, navigate]);
  let classList = [];
  if (isDarkMode) {
    classList.push("dark");
  }
  if (isActive) {
    classList.push("active");
  }
  const classes = classList.join(" ");
  return (
    //if modal is active, we blur the file page
    <StyledPage id="file-page" className={classes}>
      {/* if loading we show "loading..." else we show file page */}
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <NavBar></NavBar>
          <StyledFileContainer>
            <StyledTableHeader className={isDarkMode && "dark-header"}>
              File ID
            </StyledTableHeader>
            <StyledTableHeader className={isDarkMode && "dark-header"}>
              File Name
            </StyledTableHeader>
            <StyledTableHeader className={isDarkMode && "dark-header"}>
              Upload Date
            </StyledTableHeader>
            <StyledTableHeader className={isDarkMode && "dark-header"}>
              Expire Date
            </StyledTableHeader>
            <StyledTableHeader className={isDarkMode && "dark-header"}>
              Change Pasword
            </StyledTableHeader>
            <StyledTableHeader className={isDarkMode && "dark-header"}>
              Share File
            </StyledTableHeader>
            <StyledTableHeader className={isDarkMode && "dark-header"}>
              Delete File
            </StyledTableHeader>
            {/* we render file info by using info from files array */}
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
              .slice((page - 1) * itemsCountPerPage, page * itemsCountPerPage)}
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
      {/*Modal component here */}
      <Modal></Modal>
    </StyledPage>
  );
}
