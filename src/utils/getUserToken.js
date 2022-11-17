export default function getUserToken() {
  //get jwt token from sessionStorage
  const token = sessionStorage.getItem("token");
  return token;
}
