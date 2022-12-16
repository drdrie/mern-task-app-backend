const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router()
const {createTask,getTasks,getTask,deleteTask,udpateTask} = require("../controllers/TaskController");

/* router.route("/").get(getTasks).post(createTask)
router.route("/:id").get(getTask).delete(deleteTask).put(udpateTask) */


//CREATE A TASK
router.post("/",createTask);

//Get/Read Tasks
router.get("/",getTasks);

//Get single Task
router.get("/:id",getTask);

//Delete a task
router.delete("/:id",deleteTask);

//Update task
router.put("/:id",udpateTask);


module.exports = router