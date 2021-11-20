import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import Todolist from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Box, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";

export type TasksType = {
    title: string
    id: string,
    isDone: boolean,

}
export type TodolistType = {
    id: string
    title: string
    filter: 'all' | "active" | "completed"
}
type tasksStateType = {
    [key: string]: Array<TasksType>
}


function App() {
    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id != id)
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }

    function changeFilter(value: 'all' | "active" | "completed", todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
    ])
    let [tasks, setTasks] = useState<tasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Res API", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true}],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    });
    return (
        <div>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            Photos
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style ={{padding:"20px"}}>
            <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing ={3}>
            {
                todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodoList = allTodolistTasks
                    if (tl.filter === "active") {
                        tasksForTodoList = allTodolistTasks.filter(t => t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = allTodolistTasks.filter(t => t.isDone);
                    }
                    return<Grid item>
                        <Paper style={{padding:"10px"}}>
                        <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
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
