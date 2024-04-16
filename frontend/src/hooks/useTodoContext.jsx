import { TodoContext } from "../context/TodoContext.jsx";
import { useContext } from "react";

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw Error("useTodoContext must be used inside TodoContextProvider");
  }

  return context;
};
