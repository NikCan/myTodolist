import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type tasksType = {
    title: string
    id: string
    isDone: boolean
}

function App() {
    const titleMain = "What to do:"
    const [tasks, setTasks] = useState<tasksType[]>([
        {title: "Homework ", id: v1(), isDone: true},
        {title: "Lunch ", id: v1(), isDone: true},
        {title: "Work ", id: v1(), isDone: false},
        {title: "Gym ", id: v1(), isDone: true},
        {title: "Rest ", id: v1(), isDone: false},
    ])
    const [filter, setFilter] = useState("all")

    const addTask = (title: string) => {
        setTasks([{
            title: title,
            id: v1(),
            isDone: false
        }, ...tasks])
    }

    const deleteTask = (tId: string) => {
        setTasks([...tasks].filter(t => t.id !== tId))
    }

    const changeIsDone = (tId: string, checked: boolean) => {
        setTasks([...tasks].map((t: tasksType) => (t.id === tId ? {
            ...t, isDone: checked
        } : t)))
    }

    const changeFilter = (filter: string) => setFilter(filter)
    const getFilteredTasks = (t: tasksType[], filter: string) => {
        if (filter === "active") return [...t].filter(t => !t.isDone)
        else if (filter === "completed") return [...t].filter(t => t.isDone)
        else return [...t]
    }
    const filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <Todolist titleMain={titleMain}
                      tasks={filteredTasks}
                      addTask={addTask}
                      deleteTask={deleteTask}
                      changeIsDone={changeIsDone}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
