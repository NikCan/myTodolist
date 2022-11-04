import {tasksType} from "./App";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    titleMain: string
    tasks: tasksType[]
    addTask: (title: string) => void
    deleteTask: (tId: string) => void
    changeIsDone: (tId: string, checked: boolean) => void
    changeFilter: (filter: "all" | "active" | "completed") => void
}
export const Todolist: React.FC<TodolistPropsType> = ({
                                                          titleMain,
                                                          tasks,
                                                          addTask,
                                                          deleteTask,
                                                          changeIsDone,
                                                          changeFilter
                                                      }) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onClickAddTaskHandler = () => {
        const trimmedTitle = title.trim()
        title.trim() ? addTask(trimmedTitle)
            : setError(true)
        setTitle("")
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickFilterHandler = (filter: "all" | "active" | "completed") => changeFilter(filter)
    const tasksList = tasks.length
        ? <ul>{
            tasks.map((t: tasksType) => {
                    const onClickDeleteHandler = () => {
                        deleteTask(t.id)
                    }
                    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => changeIsDone(t.id, e.currentTarget.checked)

                    return (
                        <li key={t.id}><input type={"checkbox"} key={t.id} checked={t.isDone}
                                              onChange={onChangeCheckboxHandler}/>{t.title}
                            <button onClick={onClickDeleteHandler}>x</button>
                        </li>
                    )
                }
            )
        }
        </ul>
        : <span>All tasks are DONE!</span>
    const onInputsKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTaskHandler()
        }
        if (e.key === "Escape") {
            setTitle("")
        }

    }

    return (
        <div>
            <div>{titleMain}</div>
            <div><input className={error ? "inputError" : ""} type="text" onChange={onChangeTitleHandler} value={title}
                        onKeyDown={onInputsKeyDownHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            {error && <div className={"error"}>You need to use correct name!</div>}
            {tasksList}
            <div>
                <button onClick={() => onClickFilterHandler("all")}> All tasks</button>
                <button onClick={() => onClickFilterHandler("active")}>Active</button>
                <button onClick={() => onClickFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    )
}