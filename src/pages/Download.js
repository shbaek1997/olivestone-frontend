import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PageLayout } from "../components/PageLayout";
import { DownloadForm } from "../components/DownloadForm";
import { fetchUserByJWT } from "../context/authSlice";

//download page
export function Download() {
  const dispatch = useDispatch();
  // check user login by checking jwt for nav bar
  useEffect(() => {
    dispatch(fetchUserByJWT());
  }, [dispatch]);
  return (
    <PageLayout headerTitle="Download">
      <DownloadForm></DownloadForm>
    </PageLayout>
  );
}
