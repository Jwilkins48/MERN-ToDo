import { useTodoContext } from "../hooks/useTodoContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

function TodoList({ todo }) {
  const { user } = useAuthContext();
  const { dispatch } = useTodoContext();

  const handleDelete = async () => {
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
    <div className="border-2 p-10 mb-4 rounded text-xl flex justify-between">
      <div>{todo.todo}</div>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TodoList;
