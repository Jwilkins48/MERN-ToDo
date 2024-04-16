import { useAuthContext } from "../hooks/useAuthContext";
import { useTodoContext } from "../hooks/useTodoContext";
import { useState } from "react";

function TodoField() {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [todo, setTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Must be signed in");
      return;
    }

    const response = await fetch("http://localhost:4000/api/todo", {
      method: "POST",
      body: JSON.stringify({ todo }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setTodo("");
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  return (
    <div className="m-10 flex align-center justify-center">
      <form onSubmit={handleSubmit}>
        <input
          value={todo}
          onChange={(e) => setTodo(e.currentTarget.value)}
          type="text"
          placeholder="What to do..."
          className="rounded w-[20rem] px-2 py-3"
        />

        <button className="btn ml-2 h-13">Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default TodoField;
