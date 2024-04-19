import { useTodoContext } from "../hooks/useTodoContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useNavigate } from "react-router-dom";

function TodoList({ todo }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { dispatch } = useTodoContext();

  const handleClick = async () => {
    navigate(`todo/${todo._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!user) {
      return;
    }
    const response = await fetch(`http://localhost:4000/api/todo/${todo._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();
    console.log(`Deleted ${json.todo}`);

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };
  return (
    <div
      onClick={handleClick}
      className="border-2 p-10 mb-4 rounded text-xl flex justify-between"
    >
      <div>{todo.todo}</div>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TodoList;
