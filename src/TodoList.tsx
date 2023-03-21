import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox} from "@material-ui/core";
import {ButtonGroup} from "@material-ui/core";
import {ListItem} from "@material-ui/core";
import {IconButton} from "@material-ui/core";
import { DeleteForever} from "@material-ui/icons";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (id: string) => void
    changeTitle: (taskId: string, title: string, todolistId: string) => void

}
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    // tasks:Array<TaskType>


}
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const onAllClickHandler = () => {
        props.changeFilter(`all`, props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter(`active`, props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(`completed`, props.id)
    }
    const changeTitle = (taskId: string, title: string) => {
        props.changeTitle(taskId, title, props.id)
    }
    return <div>
        <div style={{display: 'flex'}}>
        <h3> {props.title}</h3>

        <IconButton
            onClick={() => props.removeTodolist(props.id)}>
            <DeleteForever/>
        </IconButton>
        </div>
        <AddItemForm addItem={addTask}/>
        <ul>
            {props.tasks.map((t) => {
                const onClickHandler = () => props.removeTask(t.id, props.id)
                const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(t.id, event.currentTarget.checked, props.id);
                }

                return <ListItem key={t.id} className={t.isDone ? "is-done" : ""}>
                    <Checkbox
                        checked={t.isDone}
                        style={{color:'pink'}}
                        onChange={onChangeHandler}
                    />

                    <EditableSpan value={t.title} onChange={(value) => {
                        changeTitle(t.id, value)
                    }}/>

                    <IconButton
                        onClick={onClickHandler}>
                        <DeleteForever/>
                    </IconButton>
                </ListItem>
            })}
        </ul>
        <div>
            <ButtonGroup>
                <Button
                    size={'small'}
                    variant={"contained"}
                    disableElevation
                    style={{marginRight: '3px'}}
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    size={'small'}
                    variant={"contained"}
                    disableElevation
                    style={{marginRight: '3px'}}
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={'small'}
                    variant={"contained"}
                    disableElevation
                    style={{marginRight: '3px'}}
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}

export default TodoList;