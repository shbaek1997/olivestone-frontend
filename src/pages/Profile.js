//import
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { Loading } from "../components/Loading";
import { fetchUserByJWT } from "../context/authSlice";
import { EditProfileForm } from "../components/EditProfileForm";
import { EditProfileNameForm } from "../components/EditProfileNameForm";
import { EditProfilePasswordForm } from "../components/EditProfilePassword";
//Login page
export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  // Get path
  const pathName = location.pathname;
  const isPathDefault = pathName === "/profile";
  const isPathName = pathName === "/profile/name";
  const isPathPassword = pathName === "/profile/password";
  // check for user login and redirect to upload if logged in
  // else set loading to false
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        //dispatch no error => loggedin
        await dispatch(fetchUserByJWT()).unwrap();
        setIsLoading(false);
      } catch (error) {
        //not loggedIn

        navigate("/login");
      }
    };
    checkUserLogin();
  }, [dispatch, navigate]);
  const headerTitle = "Edit Profile";

  //if loading show loading component else show log in form
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <PageLayout headerTitle={headerTitle}>
      {isPathDefault && <EditProfileForm></EditProfileForm>}
      {isPathName && <EditProfileNameForm></EditProfileNameForm>}
      {isPathPassword && <EditProfilePasswordForm></EditProfilePasswordForm>}
    </PageLayout>
  );
}
