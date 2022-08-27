import React, {useState} from 'react';
import './App.css';
import {create} from "domain";
import {read} from "fs";
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

// CRUD читать добавлять обновлять
// create добавлять
// read читать
// update обновлять
// delete удалять
// GUI-> графический интерфейс
// CLI

export type FilterValuesType = "all" | "active" | "completed"

// state состоянние приложения. данные твоего приложения
function App() {
    const todoListTitle = "what to learn";
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},

    ]);
    console.log(tasks);

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: Boolean) {
        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.isDone = !task.isDone;
        }

        setTasks([...tasks]);
    }


    const [filter, setFilter] = React.useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID));
        console.log(tasks)
        // useEffect узнать что это
    }
    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(task => task.isDone)
            break
        case "active":
            tasksForRender = tasks.filter(task => !task.isDone)
            break
        default:
            tasksForRender = tasks
    }


    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
            />
        </div>

    );
}

export default App;
