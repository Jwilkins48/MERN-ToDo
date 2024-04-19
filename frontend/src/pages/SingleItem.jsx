import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useTodoContext } from "../hooks/useTodoContext.jsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SingleItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [todo, setTodo] = useState();
  const { dispatch } = useTodoContext();
  const [newTask, setNewTask] = useState("");

  // Display todo
  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch(`http://localhost:4000/api/todo/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      setTodo(json);
    };

    if (user) {
      fetchTodo();
    }
  }, [dispatch, user, id]);

  // Input Change
  const handleChange = (e) => {
    setNewTask(e.currentTarget.value);
  };

  // Update onClick
  const handleClick = async () => {
    if (newTask) {
      const response = await fetch(`http://localhost:4000/api/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ todo: newTask }),
      });

      if (response.ok) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div onClick={() => console.log(todo._id)} className="px-20 pt-10 flex">
      <div className="flex justify-center items-center">
        <label className="text-2xl">Task: </label>
        <input
          onChange={handleChange}
          type="text"
          className="rounded ml-2 py-[13px] w-80 p-2"
          defaultValue={todo?.todo}
        />
      </div>

      <button onClick={handleClick} className="btn btn-secondary ml-1">
        Update
      </button>
    </div>
  );
}

export default SingleItem;
