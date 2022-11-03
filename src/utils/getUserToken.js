export default function getUserToken() {
  const token = sessionStorage.getItem("token");
  return token;
}
