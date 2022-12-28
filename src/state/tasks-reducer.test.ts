import {v1} from "uuid";
import {addTaskAC, tasksReducer, tasksStateType} from "./tasks-reducer";

test('correct task should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: tasksStateType = {
        [todolistId1]: [{taskId: v1(), title: "HTML&CSS", isDone: true},
            {taskId: v1(), title: "JS", isDone: true},
            {taskId: v1(), title: "JS", isDone: false},
            {taskId: v1(), title: "JS", isDone: true},],
        [todolistId2]: [{taskId: v1(), title: "HTML&CSS2", isDone: true},
            {taskId: v1(), title: "JS2", isDone: false},
            {taskId: v1(), title: "JS2", isDone: true},
            {taskId: v1(), title: "JS2", isDone: true},]
    }
    const endState = tasksReducer(startState, addTaskAC(todolistId1, "REDUX"))

    expect(startState[todolistId1].length).toBe(4)
    expect(endState[todolistId1].length).toBe(5)
    expect(endState[todolistId1][0].title).toBe("REDUX")
    expect(endState[todolistId1][0].isDone).toBe(false)
})