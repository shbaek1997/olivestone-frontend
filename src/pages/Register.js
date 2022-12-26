import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserByJWT } from "../context/authSlice";
import { PageLayout } from "../components/PageLayout";
import { RegisterForm } from "../components/RegisterForm";
import { Loading } from "../components/Loading";

//Sign up page
export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // loading  state
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkUserAdmin = async () => {
      try {
        //check user login
        const response = await dispatch(fetchUserByJWT()).unwrap();
        const { user } = response;
        const { role } = user;
        //to sign up a new user, the role should be admin or super-user
        //if user is basic-user, redirect to home
        if (role === "basic-user") {
          navigate("/");
        }
        // set loading false
        setIsLoading(false);
      } catch (error) {
        //not loggedIn => redirect to login page
        navigate("/login");
      }
    };
    checkUserAdmin();
  }, [dispatch, navigate]);
  const headerTitle = "Register";

  //if loading show loading component else show sign-up form
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <PageLayout headerTitle={headerTitle}>
      <RegisterForm></RegisterForm>
    </PageLayout>
  );
}
