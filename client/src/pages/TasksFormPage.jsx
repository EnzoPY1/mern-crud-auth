import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useEffect } from "react";

function TasksFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getTask(params.id);
    }
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newTask = await createTask(data);
      console.log("New task created:", newTask);
      navigate("/tasks");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Title"
          {...register("title")}
          autoFocus
        />

        <textarea
          rows="3"
          placeholder="Description"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("description")}
        ></textarea>

        <button className="rounded-md bg-teal-500 px-3 py-2 my-2">Save</button>
      </form>
    </div>
  );
}

export default TasksFormPage;
