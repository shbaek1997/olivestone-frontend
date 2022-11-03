import api from "./api";
import getUserToken from "./getUserToken";

const checkLogin = async () => {
  const token = getUserToken();
  if (!token) return false;
  try {
    const res = await api.get(`/users/auth`);
    console.log("check login");
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    sessionStorage.clear();
    return false;
  }
};

export default checkLogin;
