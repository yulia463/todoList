import React, {useState} from 'react';
import './App.css';
import {create} from "domain";
import {read} from "fs";
import {v1} from "uuid";
import TodoList, {TaskType, TodoListPropsType, TodoListType} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {MenuBook, MenuRounded} from "@material-ui/icons";


// CRUD читать добавлять обновлять
// create добавлять
// read читать
// update обновлять
// delete удалять
// GUI-> графический интерфейс
// CLI

export type FilterValuesType = "all" | "active" | "completed"
type TasksStateType = {
    [key: string]: Array<TaskType>
}

// state состоянние приложения. данные твоего приложения
function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoListType>>(
        [
            {id: todolistID1, title: 'what to learn', filter: 'all'},
            {id: todolistID2, title: 'what to buy', filter: 'all'},
        ]
    )

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJs', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest  Api', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: true},
        ]
    })

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])

        }
    }

    function addTodolist(value: string) {
        const newTodolistId = v1();
        setTodolists([{id: newTodolistId, title: value, filter: 'all'}, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;

            setTasks({...tasks});
        }
    }

    function changeTitle(taskId: string, title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId);
        if (task) {
            task.title = title;

            setTasks({...tasks});
        }
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(todolist => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function AddTodoList(title: string) {
        let newTodoListId: string = v1()
        let newTodoList: TodoListType = {id: newTodoListId, title, filter: 'all'}
        setTodolists([newTodoList, ...todolists,])
        setTasks({...tasks, [newTodoListId]: []})
    }


    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <MenuRounded/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        TodoList
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>

            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todoList => {
                            let allTodolistTasks = tasks[todoList.id]
                            let tasksForTodoList = allTodolistTasks
                            if (todoList.filter === 'active') {
                                tasksForTodoList = allTodolistTasks.filter(task => !task.isDone)
                            }
                            if (todoList.filter === 'completed') {
                                tasksForTodoList = allTodolistTasks.filter(task => task.isDone)
                            }

                            return <Grid item>
                                <Paper style={{padding:'10px'}}>
                            <TodoList key={todoList.id}
                                             id={todoList.id}
                                             title={todoList.title}
                                             tasks={tasksForTodoList}
                                             removeTask={removeTask}
                                             changeFilter={changeFilter}
                                             addTask={addTask}
                                             changeTaskStatus={changeStatus}
                                             filter={todoList.filter}
                                             removeTodolist={removeTodolist}
                                             changeTitle={changeTitle}

                            />
                                </Paper>
                                </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>

    );
}


export default App;
