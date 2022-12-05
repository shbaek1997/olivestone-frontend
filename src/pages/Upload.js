//import
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { UploadForm } from "../components/UploadForm";
import { Loading } from "../components/Loading";
import { fetchUserByJWT } from "../context/authSlice";

//Upload page
export function Upload() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // loading  state
  const [isLoading, setIsLoading] = useState(true);
  // check user login
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        //dispatch show no error means user is loggedin
        await dispatch(fetchUserByJWT()).unwrap();
        // set loading false
        setIsLoading(false);
      } catch (error) {
        //not loggedIn => redirect to login page
        navigate("/login");
      }
    };
    checkUserLogin();
  }, [dispatch, navigate]);
  const headerTitle = "Upload";

  //if loading show loading component else show upload form
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <PageLayout headerTitle={headerTitle}>
      <UploadForm></UploadForm>
    </PageLayout>
  );
}
