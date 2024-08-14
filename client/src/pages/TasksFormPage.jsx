import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function TasksFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format('YYYY-MM-DD'));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const dataValid = {
        ...data,
        date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
      }
   
      if (params.id) {
        updateTask(params.id, dataValid);
      } else {
        const newTask = await createTask(dataValid);
        console.log("New task created:", newTask);
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          placeholder="Titulo"
          {...register("title")}
          autoFocus
        />

        <label htmlFor="description">Descripcion</label>
        <textarea
          rows="3"
          placeholder="Descripcion"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("description")}
        ></textarea>
        <label htmlFor="date" >Date </label>
        <input className="bg-zinc-700 text-white px-1 py-2 mx-2" type="date" {...register('date')} />

        <button className="rounded-md bg-teal-500 px-5 py-2 mx-5">Save</button>
      </form>
    </div>
    </div>
  );
}

export default TasksFormPage;
