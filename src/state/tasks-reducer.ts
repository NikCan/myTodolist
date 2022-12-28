import {v1} from "uuid";
import {ActionsType} from "./store";

export type addTaskActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type deleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type editeTaskTitleActionType = ReturnType<typeof editeTaskTitleAC>
export type taskType = {
    taskId: string
    title: string
    isDone: boolean
}
export type tasksStateType = {
    [key: string]: Array<taskType>
}
const InitialState: tasksStateType = {}

export const tasksReducer = (state: tasksStateType = InitialState, action: ActionsType): tasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{
                    taskId: v1(),
                    title: action.newTitle,
                    isDone: false
                }, ...state[action.todolistId]]
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.taskId === action.taskId ? {
                    ...t,
                    isDone: action.checked
                } : t)
            }
        case "DELETE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.taskId !== action.taskId)}
        case "EDITE-TASK-TITLE":
            return {...state,
                [action.todolistId]: state[action.todolistId].map(t => t.taskId === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        default:
            return state
    }
}
export const addTaskAC = (todolistId: string, newTitle: string) => {
    return {
        type: "ADD-TASK", todolistId, newTitle
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, checked: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS", todolistId, taskId, checked
    } as const
}
export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "DELETE-TASK", todolistId, taskId
    } as const
}
export const editeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: "EDITE-TASK-TITLE", todolistId, taskId, newTitle
    } as const
}