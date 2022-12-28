import {filterType} from "../App";
import {ActionsType} from "./store";
import {v1} from "uuid";

export type addTodolistActionType = ReturnType<typeof addTodolistAC>

export type todolistType = {
    todolistId: string
    title: string
    filter: filterType
}
const InitialState: todolistType[] = []

export const todolistsReducer = (state: todolistType[] = InitialState, action: ActionsType): todolistType[] => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [{
                todolistId: action.todolistId,
                title: action.title,
                filter: "all",
            }, ...state]
        default:
            return state
    }
}
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST", todolistId: v1(), title
    } as const
}