import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./component/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./component/AddItemForm";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";

export type tasksType = {
    taskId: string
    title: string
    isDone: boolean
}
export type filterType = "all" | "active" | "completed"
export type todolistType = {
    todolistId: string
    title: string
    filter: filterType
    tasks: Array<tasksType>
}

function App() {
    const [todolists, setTodolists] = useState<todolistType[]>([
        {
            todolistId: v1(),
            title: "What to learn",
            filter: "all",
            tasks:
                [
                    {taskId: v1(), title: "HTML&CSS", isDone: true},
                    {taskId: v1(), title: "JS", isDone: true},
                    {taskId: v1(), title: "JS", isDone: false},
                    {taskId: v1(), title: "JS", isDone: true},
                ],
        },
        {
            todolistId: v1(),
            title: "What to do",
            filter: "all",
            tasks:
                [
                    {taskId: v1(), title: "HTML&CSS2", isDone: true},
                    {taskId: v1(), title: "JS2", isDone: false},
                    {taskId: v1(), title: "JS2", isDone: true},
                    {taskId: v1(), title: "JS2", isDone: true},
                ],
        }
    ])

    const addTask = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(t => t.todolistId === todolistId ? {
                ...t,
                tasks: [{taskId: v1(), title: newTitle, isDone: false}, ...t.tasks]
            } : t)
        )
    }
    const deleteTask = (todolistId: string, tId: string) => {
        setTodolists(todolists.map(t => t.todolistId === todolistId ? {
            ...t,
            tasks: t.tasks.filter(el => el.taskId !== tId)
        } : t))
    }
    const changeIsDone = (todolistId: string, tId: string, checked: boolean) => {
        setTodolists(todolists.map(t => t.todolistId === todolistId ? {
            ...t,
            tasks: t.tasks.map(el => el.taskId === tId ? {...el, isDone: checked} : el)
        } : t))
    }
    const changeFilter = (todolistId: string, newFilter: filterType) => {
        setTodolists(todolists.map(t => t.todolistId === todolistId ? {...t, filter: newFilter} : t))
    }
    const editeTaskTitle = (todolistId: string, tId: string, newTitle: string) => {
        setTodolists(todolists.map(t => t.todolistId === todolistId ? {
            ...t,
            tasks: t.tasks.map(el => el.taskId === tId ? {...el, title: newTitle} : el)
        } : t))
    }

    const addTodolist = (title: string) => {
        setTodolists([{
            todolistId: v1(),
            title: title,
            filter: "all",
            tasks: [],
        }, ...todolists])
    }
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t => t.todolistId !== todolistId))
    }
    const editMainTitle = (todolistId: string, newMainTitle: string) => {
        setTodolists(todolists.map(t => t.todolistId === todolistId ? {...t, title: newMainTitle} : t))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                      justifyContent="center"
                      alignItems="center"
                      style={{padding: "10px"}}>
                    <Grid item><AddItemForm addItem={addTodolist}/></Grid>
                </Grid>
                <Grid container
                      justifyContent="center"
                      spacing={4}>
                    {
                        todolists.map(t => {
                                let filteredTasks = t.tasks
                                if (t.filter === "active") filteredTasks = t.tasks.filter(el => !el.isDone)
                                if (t.filter === "completed") filteredTasks = t.tasks.filter(el => el.isDone)

                                return <Grid item key={t.todolistId}>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            todolistId={t.todolistId}
                                            mainTitle={t.title}
                                            tasks={filteredTasks}
                                            addTask={addTask}
                                            deleteTask={deleteTask}
                                            changeIsDone={changeIsDone}
                                            changeFilter={changeFilter}
                                            deleteTodolist={deleteTodolist}
                                            editeTaskTitle={editeTaskTitle}
                                            editMainTitle={editMainTitle}
                                        />
                                    </Paper>
                                </Grid>
                            }
                        )
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
