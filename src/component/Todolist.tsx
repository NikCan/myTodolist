import {filterType} from "../App";
import React from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {changeTaskStatusAC, deleteTaskAC, editeTaskTitleAC, tasksStateType} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {Task} from "./Task";

type TodolistPropsType = {
    todolistId: string
    mainTitle: string
    filter: filterType
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filter: filterType) => void
    deleteTodolist: (todolistId: string) => void
    editMainTitle: (todolistId: string, newMainTitle: string) => void
}
export const Todolist: React.FC<TodolistPropsType> = ({
                                                          todolistId,
                                                          mainTitle,
                                                          filter, addTask,

                                                          changeFilter,
                                                          deleteTodolist,
                                                          editMainTitle,
                                                      }) => {
    const onClickFilterHandler = (filter: filterType) => {
        changeFilter(todolistId, filter)
    }
    const tasks = useSelector<AppRootStateType, tasksStateType>(state => state.tasks)
    const dispatch = useDispatch()
    let filteredTasks = tasks[todolistId]
    if (filter === "active") filteredTasks = tasks[todolistId].filter(el => !el.isDone)
    if (filter === "completed") filteredTasks = tasks[todolistId].filter(el => el.isDone)

    const addItem = (title: string) => {
        addTask(todolistId, title)
    }
    const onClickDeleteTodoHandler = () => {
        deleteTodolist(todolistId)
    }
    const callBackHandler = (newMainTitle: string) => {
        editMainTitle(todolistId, newMainTitle)
    }
    const deleteTask = (taskId: string) => {
        dispatch(deleteTaskAC(todolistId, taskId))
    }
    const changeTaskStatus = (taskId: string, checked: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, checked))
    }
    const editeTaskTitle = (tId: string, newTitle: string) => {
        dispatch(editeTaskTitleAC(todolistId, tId, newTitle))
    }
    return (
        <div>
            <h3><EditableSpan title={mainTitle} onChange={callBackHandler}/>
                <IconButton aria-label="delete" color="primary" onClick={onClickDeleteTodoHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addItem}/>
            <div>{
                filteredTasks.map(t => <Task key={t.taskId}
                                             task={t}
                                             deleteTask={deleteTask}
                                             changeTaskStatus={changeTaskStatus}
                                             editeTaskTitle={editeTaskTitle}
                />)
            }</div>
            <div>
                <Button variant={filter === "all" ? "outlined" : "text"}
                        onClick={() => onClickFilterHandler("all")}> All tasks</Button>
                <Button variant={filter === "active" ? "outlined" : "text"}
                        onClick={() => onClickFilterHandler("active")}>Active</Button>
                <Button variant={filter === "completed" ? "outlined" : "text"}
                        onClick={() => onClickFilterHandler("completed")}>Completed</Button>
            </div>
        </div>
    )
}


