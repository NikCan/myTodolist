import {todolistType} from "../App";
import {v1} from "uuid";


type ActionType = addTaskActionType
type addTaskActionType = ReturnType<typeof addTaskAC>

export const tasksReducer = (state: todolistType[], action: ActionType): todolistType[] => {
    switch (action.type) {
        case "ADD-TASK":
            return state.map(td => td.todolistId === action.todolistId ? {
                ...td,
                tasks: [{taskId: v1(), title: action.newTitle, isDone: false}, ...td.tasks]
            } : td)
        default:
            throw new Error('I don\'t understand this type')
    }
}
export const addTaskAC = (todolistId: string, newTitle: string) => {
    return {
        type: "ADD-TASK",
        todolistId: todolistId,
        newTitle: newTitle
    } as const
}