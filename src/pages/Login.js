import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserByJWT } from "../context/authSlice";
import { PageLayout } from "../components/PageLayout";
import { LogInForm } from "../components/LoginForm";
import { Loading } from "../components/Loading";

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
        //dispatch fetch user
        await dispatch(fetchUserByJWT()).unwrap();
        // success means already logged in, so redirect to upload
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
