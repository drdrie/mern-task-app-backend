const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors")

const bodyParser = require('body-parser');
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: "1525212",
    key: "d70a8216dbd129b8d9ed",
    secret: "1585a0f3d8969d0d7c9b",
    cluster: "ap1",
    useTLS: true
  });

const channel = 'my-channel';

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: ["http://localhost:3000","https://mern-task-app-v9ug-api.onrender.com","https://sockjs.pusher.com"]
}));

//pusher app
app.use((req, res, next) => {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  
     next();
    });
app.use(bodyParser.json());app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/tasks",taskRoutes);

//ROUTES
app.get("/",(req,res) => {
    res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

const db = mongoose.connection;
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        });
        const taskCollection = db.collection('tasks');  
        const changeStream = taskCollection.watch();
        changeStream.on('change', (change) => {    console.log(change);
            if(change.operationType === 'insert') {      
                const task = change.fullDocument;   
                pusher.trigger(channel, "my-event", { message: "hello world" })   
                // pusher.trigger(channel,'inserted', 
                // { id: task._id, task: task.name,});  
            } else if(change.operationType === 'delete') {      
                pusher.trigger(channel, "my-event", { message: "hello world" })   
            }else if(change.operationType === 'update') {      
                pusher.trigger(channel, "my-event", { message: "hello world" })   
            }
        });
    })
    .catch((err) => console.log(err));
