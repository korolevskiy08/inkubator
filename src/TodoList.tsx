import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm/AddItemForm";
import EditTitle from "./editTitle/EditTitle";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const tasksJSX = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            return (
                <li key={t.id} className={t.isDone ? "task isDone" : "task"}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={t.isDone}
                    />
                    <EditTitle title={t.title}/>
                    <button onClick={removeTask}>х</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>
    const getOnClickHandler = (filter: FilterValuesType, id: string) => {
        return () => props.changeTodoListFilter(filter, id)
    }
    const onClickHandler = () => props.changeTodoListFilter("all", props.id)


    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => props.addTask(title, props.id)


    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoListHandler}>delete</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active" : ""}
                    onClick={onClickHandler}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "active" : ""}
                    onClick={getOnClickHandler("active", props.id)}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "active" : ""}
                    onClick={getOnClickHandler("completed", props.id)}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;