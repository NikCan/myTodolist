import React from 'react';
import './App.css';
import {Todolist} from "./component/Todolist";
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
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {addTodolistAC, todolistType} from "./state/todolists-reducer";

export type filterType = "all" | "active" | "completed"

function App() {
    const todolists = useSelector<AppRootStateType, todolistType[]>(state => state.todolists)
    const dispatch = useDispatch()
    const addTask = (todolistId: string, newTitle: string) => {
        dispatch(addTaskAC(todolistId, newTitle))
    }
    const changeFilter = (todolistId: string, newFilter: filterType) => {
        // setTodolists(todolists.map(t => t.todolistId === todolistId ? {...t, filter: newFilter} : t))
    }
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const deleteTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(t => t.todolistId !== todolistId))
    }
    const editMainTitle = (todolistId: string, newMainTitle: string) => {
        // setTodolists(todolists.map(t => t.todolistId === todolistId ? {...t, title: newMainTitle} : t))
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
                                return <Grid item key={t.todolistId}>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            todolistId={t.todolistId}
                                            mainTitle={t.title}
                                            filter={t.filter}
                                            addTask={addTask}
                                            changeFilter={changeFilter}
                                            deleteTodolist={deleteTodolist}
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
