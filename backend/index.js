
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILE_PATH = "./tasks.json";

function readTasks() {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
}


function writeTasks(tasks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}


app.get("/tasks", (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});


app.post("/tasks", (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: Date.now(),
        text: req.body.text
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});


app.put("/tasks/:id", (req, res) => {
    const tasks = readTasks();
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].text = req.body.text;
        writeTasks(tasks);
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});


app.delete("/tasks/:id", (req, res) => {
    let tasks = readTasks();
    const taskId = parseInt(req.params.id);
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    writeTasks(updatedTasks);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
