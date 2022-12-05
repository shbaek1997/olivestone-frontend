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
  // loading and login state
  const [isLoading, setIsLoading] = useState(true);
  // set state, onChange handlers for username, password, upload password, upload password repeat, valid period

  // call setLogInValue once when page is first loaded
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
  const headerTitle = "Upload";

  //if loading show "loading..." else show form
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <PageLayout headerTitle={headerTitle}>
      <UploadForm></UploadForm>
    </PageLayout>
  );
}
