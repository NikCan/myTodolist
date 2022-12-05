import {v1} from "uuid";
import {todolistType} from "../App";
import {addTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<todolistType> = [
        {todolistId: todolistId1, title: 'What to learn', filter: 'all', tasks:
                [
                    {taskId: v1(), title: "HTML&CSS", isDone: true},
                    {taskId: v1(), title: "JS", isDone: true},
                    {taskId: v1(), title: "JS", isDone: false},
                    {taskId: v1(), title: "JS", isDone: true},
                ],},
        {todolistId: todolistId2, title: 'What to buy', filter: 'all',tasks:
                [
                    {taskId: v1(), title: "HTML&CSS", isDone: true},
                    {taskId: v1(), title: "JS", isDone: true},
                    {taskId: v1(), title: "JS", isDone: false},
                    {taskId: v1(), title: "JS", isDone: true},
                ],}
    ]
    const endState = tasksReducer(startState, addTaskAC(todolistId1, "REDUX"))

    expect(startState[0].tasks.length).toBe(4)
    expect(endState[0].tasks.length).toBe(5)
    expect(endState[1].tasks.length).toBe(4)
    expect(endState[0].tasks[0].title).toBe("REDUX")
    expect(endState[0].tasks[0].isDone).toBe(false)
})