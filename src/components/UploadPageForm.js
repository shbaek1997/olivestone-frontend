//import

import { useSelector } from "react-redux";

import { UploadForm } from "./UploadForm";
import { LogInForm } from "./LoginForm";

//Upload page
export function UploadPageForm() {
  // login state
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <UploadForm></UploadForm> : <LogInForm></LogInForm>;
}
