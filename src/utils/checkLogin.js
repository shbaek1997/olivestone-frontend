import Api from "./api";

const checkLogin = async () => {
  try {
    const api = Api();
    await api.get(`/users/auth`);
    return true;
  } catch (error) {
    sessionStorage.clear();
    return false;
  }
};

export default checkLogin;
