import { useState } from "react";
import { useAuthContext } from "./useAuthContext.jsx";

export const useSignUp = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signUp = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // Set local storage to grab user
      localStorage.setItem("user", JSON.stringify(json));
      // Set user data to context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
};
