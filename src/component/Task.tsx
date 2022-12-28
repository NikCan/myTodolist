import {taskType} from "../state/tasks-reducer";
import React, {ChangeEvent} from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";

type TaskPropsType = {
    task: taskType
    deleteTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, checked: boolean) => void
    editeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task: React.FC<TaskPropsType> = ({
                                                  task,
                                                  deleteTask,
                                                  changeTaskStatus,
                                                  editeTaskTitle
                                              }) => {
    const onClickDeleteHandler = () => deleteTask(task.taskId)
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.taskId, e.currentTarget.checked)
    }
    const onChangeTitleHandler = (newTitle: string) => editeTaskTitle(task.taskId, newTitle)

    return (
        <Grid container alignItems="center" key={task.taskId}>
            <Checkbox checked={task.isDone}
                      onChange={onChangeCheckboxHandler}/>
            <Grid item xs={8}><EditableSpan title={task.title} onChange={onChangeTitleHandler}/></Grid>
            <Grid item xs={2}><IconButton onClick={onClickDeleteHandler}>
                <Delete/>
            </IconButton></Grid>
        </Grid>
    )
}