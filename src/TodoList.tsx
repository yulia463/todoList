import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {ChangeEventHandler} from "react";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: Boolean) => void
}


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    let [title ,setTitle] = useState("")


    const [newTasktitle, setNewTaskTitle] = useState("");
    const onNewTitleCangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTasktitle);
            setNewTaskTitle("");
            // setTitle(e.currentTarget.value)
        }
    }
    const addTask = () => {
        if(title.trim() === ""){
            return;
        }
        if(newTasktitle === "govno"){
            return;
        }
        props.addTask(newTasktitle);
        setNewTaskTitle("");
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");


    const tasksItems = props.tasks.map((task: TaskType) => {
        {
            const onRemoveHandler = () => {
                props.removeTask(task.id)
            }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked);
            }

            return (
                <li key={task.id}>
                    <input type="checkbox"
                           onChange={onChangeHandler}
                           checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={onRemoveHandler}>x</button>
                </li>
            )
        }
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTasktitle}
                       onChange={onNewTitleCangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}> Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;