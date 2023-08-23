import Cookies from "js-cookie";
import useSignOut from "./useSignOut";

const useAuth = () => {
  try {
    if (atob(Cookies.get("_auth")) === "true") {
      return true;
    }
  } catch (error) {
    useSignOut();
  }

  return false;
};

export default useAuth;
