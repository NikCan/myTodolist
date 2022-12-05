import {filterType, tasksType} from "../App";
import React, {ChangeEvent, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";

type TodolistPropsType = {
    todolistId: string
    mainTitle: string
    tasks: tasksType[]
    addTask: (todolistId: string, title: string) => void
    deleteTask: (todolistId: string, tId: string) => void
    changeIsDone: (todolistId: string, tId: string, checked: boolean) => void
    changeFilter: (todolistId: string, filter: filterType) => void
    deleteTodolist: (todolistId: string) => void
    editeTaskTitle: (todolistId: string, tId: string, newTitle: string) => void
    editMainTitle: (todolistId: string, newMainTitle: string) => void
}
export const Todolist: React.FC<TodolistPropsType> = ({
                                                          todolistId,
                                                          mainTitle,
                                                          tasks,
                                                          addTask,
                                                          deleteTask,
                                                          changeIsDone,
                                                          changeFilter,
                                                          deleteTodolist,
                                                          editeTaskTitle,
                                                          editMainTitle,
                                                      }) => {
    const [localF, setLocalF] = useState<filterType>("all")
    const onClickFilterHandler = (filter: filterType) => {
        changeFilter(todolistId, filter)
        setLocalF(filter)
    }
    const tasksList = tasks.length
        ? <div>{
            tasks.map((t: tasksType) => {
                    const onClickDeleteHandler = () => {
                        deleteTask(todolistId, t.taskId)
                    }
                    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeIsDone(todolistId, t.taskId, e.currentTarget.checked)
                    }
                    const callBackHandler = (newTitle: string) => {
                        editeTaskTitle(todolistId, t.taskId, newTitle)
                    }
                    return (
                        <Grid container alignItems="center" key={t.taskId}>
                            <Checkbox defaultChecked checked={t.isDone}
                                      onChange={onChangeCheckboxHandler}/>
                            <Grid item xs={8}><EditableSpan title={t.title} callBack={callBackHandler}/></Grid>
                            <Grid item xs={2}><IconButton onClick={onClickDeleteHandler}>
                                <Delete/>
                            </IconButton></Grid>
                        </Grid>
                    )
                }
            )
        }
        </div>
        : <span>All tasks are DONE!</span>
    const addItem = (title: string) => {
        addTask(todolistId, title)
    }
    const onClickDeleteTodoHandler = () => {
        deleteTodolist(todolistId)
    }
    const callBackHandler = (newMainTitle: string) => {
        editMainTitle(todolistId, newMainTitle)
    }
    return (
        <div>
            <h3><EditableSpan title={mainTitle} callBack={callBackHandler}/>
                <IconButton aria-label="delete" color="primary" onClick={onClickDeleteTodoHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItem}/>
            {tasksList}
            <div>
                <Button variant={localF === "all" ? "outlined" : "text"}
                        onClick={() => onClickFilterHandler("all")}> All tasks</Button>
                <Button variant={localF === "active" ? "outlined" : "text"}
                        onClick={() => onClickFilterHandler("active")}>Active</Button>
                <Button variant={localF === "completed" ? "outlined" : "text"}
                        onClick={() => onClickFilterHandler("completed")}>Completed</Button>
            </div>
        </div>
    )
}


