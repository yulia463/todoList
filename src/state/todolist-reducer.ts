import {TodoListType} from "../TodoList";
import {v1} from "uuid";
import {FilterValuesType} from "../App";


export type RemoveTodolistAC = {
    type: 'REMOVE-TODOLIST'
    todolistId:string
}
export type AddTodolistAC={
    type:'ADD-TODOLIST'
    title:string
}
type ChangeTodolistFilter={
   type:'CHANGE-TODOLIST-FILTER'
    filter:FilterValuesType
    todolistId:string
}

type ChangeTodolistTitle={
    type:'CHANGE-TODOLIST-TITLE'
    title:string
    todolistId:string
}

type ActionType= RemoveTodolistAC|AddTodolistAC|ChangeTodolistFilter|ChangeTodolistTitle



export const todolistReducer = (state: Array<TodoListType>, action:ActionType) => {
    switch(action.type){
        case 'REMOVE-TODOLIST':
            return state.filter((todolist) => todolist.id !==action.todolistId)
        case 'ADD-TODOLIST':
            const newTodolistId:string = v1();
            return ([...state, {id: newTodolistId, title: action.title, filter: 'all'}])
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todolist=>todolist.id === action.todolistId ? {...todolist, filter:action.filter}:todolist)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(todolist=>todolist.id === action.todolistId ? {...todolist, title:action.title}:todolist)
        default:
            throw new Error('i do not understand');
    }
}

export const RemoveTodolistAT=(id:string):RemoveTodolistAC=>({type:'REMOVE-TODOLIST',todolistId:id})
export const AddTodolistAC=(title:string):AddTodolistAC=>({type: 'ADD-TODOLIST',title})
export const ChangeTodolistFilterAC=(filter:FilterValuesType, todolistId:string):ChangeTodolistFilter=>({type:'CHANGE-TODOLIST-FILTER',filter ,todolistId})
export const ChangeTodolistTitleAC=(title:string,todolistId:string):ChangeTodolistTitle=>({type:'CHANGE-TODOLIST-TITLE', title, todolistId})