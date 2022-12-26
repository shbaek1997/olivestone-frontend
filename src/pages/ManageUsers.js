import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserByJWT } from "../context/authSlice";
import { setUsers } from "../context/userSlice";
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

// create User Modal and attach to body, so it is outside of files page
const Modal = () => {
  return ReactDOM.createPortal(<UserModal></UserModal>, document.body);
};

//manage users page
export function ManageUsers() {
  //use selector to get modal active, current user role, dark mode and users state
  const isActive = useSelector((state) => state.modal.isActive);
  const users = useSelector((state) => state.users.users);
  const role = useSelector((state) => state.auth.role);
  const isDarkMode = useSelector((state) => state.darkMode.isActive);
  // settings for pagination
  const [page, setPage] = useState(1);
  const itemsCountPerPage = 10;
  const handlePagination = (event) => {
    setPage(event);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // set is loading state
  const [isLoading, setIsLoading] = useState(true);
  //check logged in user's role
  const isUserSuper = role === "super-user";
  const isUserAdmin = role === "admin";

  useEffect(() => {
    //get users data from server
    const getUsers = async () => {
      try {
        //use api to get users
        // set users differently depending on the current user's role
        const api = Api();
        let usersFound = [];
        //if user is just admin - get basic users only
        if (isUserAdmin) {
          const response = await api.get("/users/basic-users");
          const { data } = response;
          usersFound = data.users;
        }
        // if user is super-user- get all users
        if (isUserSuper) {
          const response = await api.get("/users/all");
          const { data } = response;
          usersFound = data.users;
        }
        //set users by dispatch
        dispatch(setUsers(usersFound));
        //set loading false
        setIsLoading(false);
        return;
      } catch (error) {}
    };
    const fetchUserAndGetUsers = async () => {
      try {
        //check user log in
        const response = await dispatch(fetchUserByJWT()).unwrap();
        const { user } = response;
        const { role } = user;
        // if role is basic-user, the user should not be allowed in manage users page
        if (role === "basic-user") {
          throw new Error("해당 페이지의 접근 권한이 없습니다.");
        }
        // get users
        getUsers();
      } catch (error) {
        //failure redirects to login
        navigate("/login");
      }
    };
    fetchUserAndGetUsers();
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
  const classes = classList.join(" ");
  //set class for the page
  const pageClass = isUserAdmin ? "admin" : "super-user";
  // table header inner content as an array
  // table header should be different for admin users and super-user
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

  //check if users list is empty
  const isUsersListEmpty = users.length === 0;
  return (
    //if loading show loading page, then check logged in user's role and render page accordingly
    <StyledPage id="file-page" className={classes}>
      {/* if loading we show "loading..." else we show file page */}
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <NavBar></NavBar>
          {/* check if users list is empty */}
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
              {/* set table headers */}
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
