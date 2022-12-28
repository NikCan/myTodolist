import {legacy_createStore, combineReducers} from "redux";
import {
    addTaskActionType,
    changeTaskStatusActionType,
    deleteTaskActionType,
    editeTaskTitleActionType,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistActionType, todolistsReducer} from "./todolists-reducer";

export type ActionsType =
    addTaskActionType
    | addTodolistActionType
    | changeTaskStatusActionType
    | deleteTaskActionType
    | editeTaskTitleActionType

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)