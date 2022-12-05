import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PageLayout } from "../components/PageLayout";
import { DownloadForm } from "../components/DownloadForm";
import { fetchUserByJWT } from "../context/authSlice";

//download page
export function Download() {
  //set file ID, download file password state and onChange handlers.
  /////////////
  const dispatch = useDispatch();
  // call setLogInValue once when page is first loaded
  useEffect(() => {
    dispatch(fetchUserByJWT());
  }, [dispatch]);

  return (
    <PageLayout headerTitle="Download">
      <DownloadForm></DownloadForm>
    </PageLayout>
  );
}
