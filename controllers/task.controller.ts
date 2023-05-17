import { Request, Response } from "express";
import { AppDatasource } from "../models/datasource";
import { Task } from "../models/task.entity";

const taskRepository = AppDatasource.getRepository(Task);

// Get all Task
const getAllTask = async (req: Request, res: Response) => {
  const task = await taskRepository.find();
  if (!task.length) {
    return res.status(400).json({ msg: `You haven't added any task yet` });
  }
  return res.status(200).json(task);
};

// Get Single Task
const getTask = async (req: Request, res: Response) => {
  const task = await taskRepository.findOneBy({
    id: Number(req.params.id),
  });
  if (!task) {
    return res.status(400).json({ msg: `Task not found` });
  }
  return res.status(200).json(task);
};

// Create Task
const postTask = async (req: Request, res: Response) => {
  try {
    const task = new Task();
    task.name = req.body.name;
    task.description = req.body.description;

    await taskRepository.save(task);
    return res.send(`Added task successfully`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Unable to add task..` });
  }
};
// Update Task
const updateTask = async (req: Request, res: Response) => {
  try {
    const task: any = await taskRepository.findOneBy({
      id: Number(req.params.id),
    });

    task.name = req.body.name;
    task.description = req.body.description;

    await taskRepository.save(task);
    console.log(`Updated task with id ${req.params.id}`);
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Unable to update task..` });
  }
};

// Delete Task
const deleteTask = async (req: Request, res: Response) => {
  try {
    const task: any = await taskRepository.findOneBy({
      id: Number(req.params.id),
    });

    await taskRepository.remove(task);
    console.log(`Deleted task with id: ${req.params.id}`);
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Unable to delete task..` });
  }
};

export { getAllTask, getTask, postTask, updateTask, deleteTask };
