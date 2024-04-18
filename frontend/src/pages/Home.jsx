import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useTodoContext } from "../hooks/useTodoContext.jsx";
import TodoField from "../components/ToDoField.jsx";
import TodoList from "../components/TodoList.jsx";
import { useEffect } from "react";

function Home() {
  const { user } = useAuthContext();
  const { todos, dispatch } = useTodoContext();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:4000/api/todo", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);

  return (
    <div className="px-20 pt-10 flex">
      <div className="w-[70%]">
        <h1 className="text-2xl font-bold mb-2 text-3xl">Tasks:</h1>

        <div className="todos">
          {todos &&
            todos?.map((todo) => <TodoList key={todo._id} todo={todo} />)}
        </div>
      </div>

      <TodoField />
    </div>
  );
}

export default Home;
