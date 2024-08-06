import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTasksRequest,
  getTaskRequest,
} from "../api/tasks";
import axiosInstance from "../api/axios";
import Cookies from "js-cookie";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await axiosInstance.post("/tasks", task);
      console.log("Task created:", response.data);
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response?.data || error.message
      );
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response?.data || error.message
      );
    }
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        clearTasks,
        deleteTask,
        getTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
