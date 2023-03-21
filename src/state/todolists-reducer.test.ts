import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, todolistReducer} from './todolist-reducer'
import { v1 } from 'uuid'
import {TodoListType} from "../TodoList";
import {RemoveTodolistAC} from "./todolist-reducer";
import {RemoveTodolistAT} from "./todolist-reducer";

test('filter should be change ', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, ChangeTodolistFilterAC('active',todolistId2))

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe('active');
});

test('todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
let newTodolistTitle='new Todolist';
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, AddTodolistAC (newTodolistTitle) )

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('new Todolist');
});

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, RemoveTodolistAT(todolistId1));



    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: ActionType = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     id: todolistId2,
    //     title: newTodolistTitle
    // };

    const endState = todolistReducer(startState, ChangeTodolistTitleAC(newTodolistTitle,todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
