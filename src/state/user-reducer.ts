import React from "react";
import todoList, {TodoListType} from "../TodoList";
import {v1} from "uuid";


type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}
type RemoveTodolistAC = {
    type: 'REMOVE-TODOLIST'
    todolistId:string
}
type AddTodolistAC={
    type:'ADD-TODOLIST'
    title:string
}
export const todolistReducer=(todoList:Array <TodoListType>,action:RemoveTodolistAC|AddTodolistAC):Array<TodoListType> =>{
    switch (action.type){

        default:
            return todoList
    }

}
// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
// export const userReducer = (state: StateType, action: ActionType): StateType => {
//     switch (action.type) {
//         case 'INCREMENT-AGE':
//             let newState = {...state}
//             newState.age = state.age + 1
//             return newState
//         case 'INCREMENT-CHILDREN-COUNT':
//             return {
//                 ...state, childrenCount: state.childrenCount + 1
//             }
//
//         default:
//             throw new Error('I don\'t understand this type')
//     }
// }
