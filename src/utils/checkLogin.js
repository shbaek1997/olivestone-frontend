import Api from "./api";
// async function to request get api with passport authenticate middleware
const checkLogin = async () => {
  try {
    const api = Api();
    //api request return user if logged in, else return 401 unauthorized
    await api.get(`/users/auth`);
    //no error means logged in , so return true
    return true;
  } catch (error) {
    //else return false and clear storage
    sessionStorage.clear();
    return false;
  }
};

export default checkLogin;
