import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByJWT } from "../context/authSlice";
import Api from "../utils/api";
import UserInfo from "../components/UserInfo";
import UserModal from "../components/PopupModal";
import { NavBar } from "../components/Nav";
import { Loading } from "../components/Loading";
import Pagination from "../components/Pagination";
import {
  StyledPage,
  StyledUserContainer,
  StyledTableHeader,
  StyledPaginationContainer,
} from "../style/style";
import { setUsers } from "../context/userSlice";
// create Modal and attach to body, so it is outside of files page
// send file id, is modal active props, and setPropsFunc to change state of those props in the child components
const Modal = () => {
  return ReactDOM.createPortal(<UserModal></UserModal>, document.body);
};

export function ManageUsers() {
  //set file id and modal active, dark mode state
  const isActive = useSelector((state) => state.modal.isActive);
  // users state
  const users = useSelector((state) => state.users.users);
  const role = useSelector((state) => state.auth.role);
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
  const isUserSuper = role === "super-user";
  const isUserAdmin = role === "admin";

  useEffect(() => {
    // set login value async function check for user token and see if user is logged in
    // if not logged in, it redirects user back to home and "/files" route is protected
    // get all non expired files from the server and set files
    const getUsers = async () => {
      try {
        const api = Api();
        let usersFound = [];
        if (isUserAdmin) {
          const response = await api.get("/users/basic-users");
          const { data } = response;
          usersFound = data.users;
        }
        if (isUserSuper) {
          const response = await api.get("/users/all");
          const { data } = response;
          usersFound = data.users;
        }
        dispatch(setUsers(usersFound));
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
        const response = await dispatch(fetchUserByJWT()).unwrap();
        const { user } = response;
        const { role } = user;
        if (role === "basic-user") {
          throw new Error("permission not allowed");
        }
        // get file
        getUsers();
      } catch (error) {
        //failure redirects to login
        navigate("/");
      }
    };
    fetchUserAndGetFile();
  }, [dispatch, navigate, isUserAdmin, isUserSuper]);
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
  const pageClass = isUserAdmin ? "admin" : "super-user";
  // table header inner content as an array
  const tableHeaderTitles = isUserAdmin
    ? [
        "User ID",
        "Name",
        "Email",
        "Email Verified",
        "Join Date",
        "Role",
        "Delete User",
      ]
    : [
        "User ID",
        "Name",
        "Email",
        "Email Verified",
        "Join Date",
        "Role",
        "Change Role",
        "Delete User",
      ];
  //inside styled page, we have two classes that impact style of file page
  // if loading, we show loading page
  // else we show nav bar + table headers + file info + pagination at bottom
  // the modal is outside of styled page and is attached to body - portal component
  const isUsersListEmpty = users.length === 0;
  return (
    <StyledPage id="file-page" className={classes}>
      {/* if loading we show "loading..." else we show file page */}
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <NavBar></NavBar>
          {isUsersListEmpty ? (
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
              <StyledUserContainer className={pageClass}>
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
                {users
                  .map(
                    ({
                      fullname,
                      email,
                      _id,
                      createdAt,
                      role,
                      emailVerified,
                    }) => {
                      const verificationStatus = emailVerified
                        ? "Verified"
                        : "Not verified";
                      return (
                        <UserInfo
                          key={_id}
                          fullname={fullname}
                          email={email}
                          emailVerified={verificationStatus}
                          _id={_id}
                          createdAt={createdAt}
                          role={role}
                        ></UserInfo>
                      );
                    }
                  )
                  .slice(
                    (page - 1) * itemsCountPerPage,
                    page * itemsCountPerPage
                  )}
              </StyledUserContainer>
              <StyledPaginationContainer className={isDarkMode && "dark"}>
                <Pagination
                  page={page}
                  itemsCountPerPage={itemsCountPerPage}
                  setOnChangeHandler={handlePagination}
                  count={users.length}
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
