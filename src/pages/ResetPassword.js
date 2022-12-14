import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { fetchUserByJWT } from "../context/authSlice";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { Loading } from "../components/Loading";
import Api from "../utils/api";

//download page
export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [user, setUser] = useState({});
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
    const checkUserToken = async () => {
      try {
        const url = new URLSearchParams(window.location.search);
        const token = url.get("token");
        const api = Api();
        const response = await api.get(
          `/users/reset-password/check-token?token=${token}`
        );
        const { data } = response;
        setUser(data.user);
        setIsTokenValid(true);
      } catch (error) {
        console.log(error);
      }
    };
    checkUserLogin();
    checkUserToken();
  }, [dispatch, navigate]);
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <PageLayout headerTitle="Reset Password">
      <ResetPasswordForm
        isTokenValid={isTokenValid}
        user={user}
      ></ResetPasswordForm>
    </PageLayout>
  );
};
