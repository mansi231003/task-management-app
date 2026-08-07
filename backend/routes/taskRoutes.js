import express from "express"
import { getTasks,createTask,deleteTask, editTask, updateStatus } from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";

const taskRouter = express.Router()


taskRouter.get("/",protect, getTasks)

taskRouter.post("/",protect, createTask)

taskRouter.patch("/:id",protect, editTask)

taskRouter.delete("/:id",protect, deleteTask)
taskRouter.patch("/status/:id",protect,updateStatus);


export default taskRouter