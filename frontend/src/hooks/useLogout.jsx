import { useAuthContext } from "./useAuthContext.jsx";
import { useTodoContext } from "./useTodoContext.jsx";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: todoDispatch } = useTodoContext();

  const logOut = () => {
    // Remove user from local storage
    localStorage.removeItem("user");

    // set global user to null
    dispatch({ type: "LOGOUT" });

    // Clear global todo state on logout
    todoDispatch({ type: "SET_TODOS", payload: null });
  };

  return { logOut };
};
