import deleteAllCookies from "../lib/deleteAllCookies";

const useSignOut = () => {
  deleteAllCookies();
  // Cookies.remove("_auth");
  localStorage.clear();
  sessionStorage.clear();
};

export default useSignOut;
