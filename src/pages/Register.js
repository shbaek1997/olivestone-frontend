//import
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { RegisterForm } from "../components/RegisterForm";
import { Loading } from "../components/Loading";
import { fetchUserByJWT } from "../context/authSlice";

//Upload page
export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // loading  state
  const [isLoading, setIsLoading] = useState(true);
  // check user login
  useEffect(() => {
    const checkUserAdmin = async () => {
      try {
        //dispatch show no error means user is loggedin
        const response = await dispatch(fetchUserByJWT()).unwrap();
        const { user } = response;
        const { role } = user;
        if (role === "basic-user") {
          navigate("/");
        }
        // set loading false
        setIsLoading(false);
      } catch (error) {
        //not loggedIn => redirect to login page
        navigate("/");
      }
    };
    checkUserAdmin();
  }, [dispatch, navigate]);
  const headerTitle = "Register";

  //if loading show loading component else show upload form
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <PageLayout headerTitle={headerTitle}>
      <RegisterForm></RegisterForm>
    </PageLayout>
  );
}
