import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
 try { 
  const tasks = await Task.find({
    user: req.user.id,
  }).populate({
    path: "user",
    select: "username email",
  });
  res.json(tasks);
} catch (error) {
  return res.status(500).json({ message: "Error fetching tasks", error: error.message });
}
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id, // Asegúrate de que req.user esté definido
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate({
      path: "user",
      select: "username email",
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(404).json({ message: "Task not found" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.sendStatus(204);
}catch (error) {
  return res.status(404).json({ message: "Task not found" });
}
};

export const updateTask = async (req, res) => {
  try{
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
}catch (error) {
  return res.status(404).json({ message: "Task not found" });
}
};
