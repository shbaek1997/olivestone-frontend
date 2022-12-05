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
  // loading and login state
  const [isLoading, setIsLoading] = useState(true);
  // set state, onChange handlers for username, password, upload password, upload password repeat, valid period

  // call setLogInValue once when page is first loaded
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

  //if loading show "loading..." else show form
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <PageLayout headerTitle={headerTitle}>
      <LogInForm></LogInForm>
    </PageLayout>
  );
}
