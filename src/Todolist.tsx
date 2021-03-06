import React, {ChangeEvent} from 'react';
import './App.css';
import {TasksType} from "./App";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import AddItemForm from "./AddItemForm";
import {EdditAbleSpan} from "./EdditAbleSpan";


type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: 'all' | "active" | "completed", todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle:string, todolistId: string) => void
    filter: 'all' | "active" | "completed"
    id: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle:(id:string,newTitle:string)=>void
}
type TaskStateType = {
    [key: string]: Array<TasksType>
}

function Todolist(props: TodolistType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle=(newTitle:string)=>{
        props.changeTodolistTitle(props.id,newTitle);
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    };


    return (<div>
            <h3><EdditAbleSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>{
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id);
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                    }
                    const onChangeTitleHandler = (newValue:string)=>{
                        props.changeTaskTitle(t.id, newValue,props.id);
                    }
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox color={'primary'} onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EdditAbleSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton aria-label="delete"
                                    onClick={onClickHandler}>
                            <Delete fontSize="medium"/>
                        </IconButton>

                    </div>
                })
            }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? "outlined" : 'text'}
                        onClick={onAllClickHandler}
                        color={"default"}>All
                </Button>
                <Button variant={props.filter === 'active' ? "outlined" : "text"}
                        onClick={onActiveHandler}
                        color={"primary"}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"}
                        onClick={onCompletedClickHandler}
                        color={"secondary"}>Completed
                </Button>
            </div>
        </div>
    )
}


export default Todolist;
