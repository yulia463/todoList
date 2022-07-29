import React, {useState} from 'react';
import './App.css';
import {create} from "domain";
import {read} from "fs";
import TodoList, {TaskType} from "./TodoList";

// CRUD читать добавлять обновлять
// create добавлять
// read читать
// update обновлять
// delete удалять
// GUI-> графический интерфейс
// CLI

export type FilterValuesType = "all" | "active" | "completed"


function App() {
    const todoListTitle = "what to learn";
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},

    ])

    const [filter, setFilter] = React.useState<FilterValuesType>("all")

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const removeTask = (taskID: number) => {
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
            />
            {/*<TodoList title={"what to buy"}/>*/}
            {/*<TodoList title={"what to read"}/>*/}
        </div>
    );
}

export default App;
