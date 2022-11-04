import Api from "./api";

const checkLogin = async () => {
  try {
    const api = Api();
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
