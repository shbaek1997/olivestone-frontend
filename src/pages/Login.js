//import
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { LogInForm } from "../components/LoginForm";
import { Loading } from "../components/Loading";
import { fetchUserByJWT } from "../context/authSlice";
//Login page
export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  // check for user login and redirect to upload if logged in
  // else set loading to false
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        //dispatch no error => loggedin
        await dispatch(fetchUserByJWT()).unwrap();
        navigate("/upload");
      } catch (error) {
        //not loggedIn
        setIsLoading(false);
      }
    };
    checkUserLogin();
  }, [dispatch, navigate]);
  const headerTitle = " Login";

  //if loading show loading component else show log in form
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <PageLayout headerTitle={headerTitle}>
      <LogInForm></LogInForm>
    </PageLayout>
  );
}
