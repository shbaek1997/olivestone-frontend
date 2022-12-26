import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchUserByJWT } from "../context/authSlice";
import { PageLayout } from "../components/PageLayout";
import { Loading } from "../components/Loading";
import { EditProfileForm } from "../components/EditProfileForm";
import { EditProfileNameForm } from "../components/EditProfileNameForm";
import { EditProfilePasswordForm } from "../components/EditProfilePassword";

//change profile page
export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // is loading state
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  //get path name
  const pathName = location.pathname;
  const isPathDefault = pathName === "/profile";
  const isPathName = pathName === "/profile/name";
  const isPathPassword = pathName === "/profile/password";

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        //check user login
        await dispatch(fetchUserByJWT()).unwrap();
        //set loading to false
        setIsLoading(false);
      } catch (error) {
        //if not logged in, redirect to login page
        navigate("/login");
      }
    };
    checkUserLogin();
  }, [dispatch, navigate]);
  const headerTitle = "Edit Profile";
  //depending on the path of current page, we show different forms
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
