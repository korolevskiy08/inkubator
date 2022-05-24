import React from "react";

type TodolistPropsType = {
    title1?: string,
    title2?: string,
    tasks: Array<TodoType>
}

type TodoType = {
    id: number,
    title: string,
    isDone: boolean
}

export const TodoList = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title1}</h3>
            <h3>{props.title2}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
        )
}