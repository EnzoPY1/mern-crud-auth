/*import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";*/
import { useTasks } from "../context/TasksContext";
import { useEffect } from "react";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks, clearTasks  } = useTasks();
  /*const { logout } = useAuth(); 
  const navigate = useNavigate();*/

  useEffect(() => {
    const fetchTasks = async () => {
      await getTasks();
    };
    fetchTasks();
  }, []);

  /*const handleLogout = async () => {
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
  };*/

  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard task={task} key={task._id}/>
        ))
      ) : (
        <p>No hay tareas disponibles</p>
      )}


    </div>
  );
}

export default TasksPage;
