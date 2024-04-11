import { useAuthContext } from "./useAuthContext.jsx";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();

  const logOut = () => {
    // Remove user from local storage
    localStorage.removeItem("user");
    // set global user to null
    dispatch({ type: "LOGOUT" });
  };

  return { logOut };
};
