import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import { useEffect } from "react";

function TasksPage() {
  const { logout } = useAuth();
  const { getTasks, tasks, clearTasks  } = useTasks();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      await getTasks();
    };
    fetchTasks();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      clearTasks();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleTask = () => {
    navigate("/add-task");
  };

  return (
    <div>
      <h1>TasksPage</h1>
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id}>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
          </div>
        ))
      ) : (
        <p>No hay tareas disponibles</p>
      )}

      <button
        onClick={handleTask}
        style={{
          padding: "10px 20px",
          backgroundColor: "#14B8A6",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Tasks
      </button>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default TasksPage;
