const Task = require("../models/taskModel");
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1525212",
    key: "d70a8216dbd129b8d9ed",
    secret: "1585a0f3d8969d0d7c9b",
    cluster: "ap1",
    useTLS: true
  });

//create a Task
const createTask = async(req,res) => {
    try{
        const task = await Task.create(req.body)    
        res.status(200).json(task)
        // Task.create({
        //     name: req.body.name,
        //   }, async (err, name) => {
        //     if (!err) {
        //         pusher.trigger('my-channel','inserted', 
        //         { id: req._id, task: req.name,});  
        //         res.status(200).json(name);
        //     }
        //   });
    }catch(error){
        res.status(500).json({msg: error.message})
    }
}

//get all Tasks
const getTasks = async(req,res) =>{
    try{
        const tasks = await Task.find()
        res.status(200).json(tasks)
    }catch(error){
        res.status(500).json({msg: error.message})

    }
}

//get a single Task
const getTask = async(req,res) => {
    try{
        const {id} = req.params
        const task = await Task.findById(id);
        if (!task){
            return res.status(400).json(`No task with ${id}`);
        }
        res.status(200).json(task)
    }catch(error){
        res.status(500).json({msg: error.message})
    }
}

// Delete Task
const deleteTask = async(req,res) => {
    try{
        const {id} = req.params
        const task = await Task.findByIdAndDelete(id);
        if (!task){
            return res.status(400).json(`No task with ${id}`);
        }
        res.status(200).send("Task deleted")
    }catch(error){
        res.status(500).json({msg: error.message})
    }
};

//Update
const udpateTask = async(req,res) =>{
    try{
        const {id} = req.params
        const task = await Task.findByIdAndUpdate(
            {_id: id}, req.body, {new: true, runValidators: true} 
        )
        res.status
        if (!task){
            return res.status(400).json(`No task with ${id}`);
        }
        res.status(200).json(task);
    }catch(error){
        res.status(500).json({msg:error.message})
    }
};


module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    udpateTask
}