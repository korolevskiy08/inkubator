import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm/AddItemForm";

// CRUD
// create +
// read ++
// update +
// delete +

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = { // типизация тудушки
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = { // типизация тасок
    [todoListID: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoList, setTodoList] = useState<Array<TodoListType>>([ // тудушки
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What a buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({ // таски для туду
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
    })

    const removeTask = (taskID: string, todoListID: string) => {
        const copyTask = {...tasks}
        copyTask[todoListID] = tasks[todoListID].filter(el => el.id !== taskID)
        setTasks(copyTask)
        // const filteredTasks = tasks.filter(t => t.id !== taskID)
        // setState(tasks)
        // setTasks(filteredTasks)
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const copyTask = {...tasks}
        copyTask[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyTask)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone: isDone} : el)})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoList(todoList.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
    }

    const addTodolist = (title: string) => {
        const newTodolistID = v1()
        const newTodolist: TodoListType = {
            id: newTodolistID,
            title: title,
            filter: 'all'
        }
        setTodoList([newTodolist, ...todoList])
        setTasks({...tasks, [newTodolistID]: []})
    }

    const todoListsComponents = todoList.map(tl => {

        let tasksForRender;
        switch (tl.filter) {
            case "active":
                tasksForRender = tasks[tl.id].filter(t => !t.isDone)
                break;
            case "completed":
                tasksForRender = tasks[tl.id].filter(t => t.isDone)
                break;
            default:
                tasksForRender = tasks[tl.id]
                break;
        }

        return (
            <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                addTask={addTask}
                filter={tl.filter}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        )
    })


    //UI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todoListsComponents}
        </div>
    );
}

export default App;
