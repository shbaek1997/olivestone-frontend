import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserByJWT } from "../context/authSlice";
import Api from "../utils/api";
import { PageLayout } from "../components/PageLayout";
import { ResetPasswordForm } from "../components/ResetPasswordForm";
import { Loading } from "../components/Loading";

//reset password page
export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // loading state
  const [isLoading, setIsLoading] = useState(true);
  //set token validity
  const [isTokenValid, setIsTokenValid] = useState(false);
  //set user
  const [user, setUser] = useState({});
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        //check login
        await dispatch(fetchUserByJWT()).unwrap();
        // if logged in redirect to upload
        navigate("/upload");
      } catch (error) {
        //not loggedIn
        //set loading to false
        setIsLoading(false);
      }
    };
    const checkUserToken = async () => {
      try {
        //get token from url params
        const url = new URLSearchParams(window.location.search);
        const token = url.get("token");
        //check token with server
        const api = Api();
        const response = await api.get(
          `/users/reset-password/check-token?token=${token}`
        );
        const { data } = response;
        //set user, token validity from api response
        setUser(data.user);
        setIsTokenValid(true);
      } catch (error) {}
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
