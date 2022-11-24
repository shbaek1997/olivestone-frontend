//import
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadPageForm } from "../components/UploadPageForm";
import { fetchUserByJWT } from "../context/authSlice";

import { PageLayout } from "../components/PageLayout";

//Upload page
export function Upload() {
  const dispatch = useDispatch();
  // loading and login state
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // set state, onChange handlers for username, password, upload password, upload password repeat, valid period

  // call setLogInValue once when page is first loaded
  useEffect(() => {
    dispatch(fetchUserByJWT());
    setIsLoading(false);
  }, [dispatch]);
  const headerTitle = isLoggedIn ? "Upload" : " Login";

  //if loading show "loading..." else show form
  return isLoading ? (
    <div>Loading ...</div>
  ) : (
    <PageLayout headerTitle={headerTitle}>
      <UploadPageForm></UploadPageForm>
    </PageLayout>
  );
}
