import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {

    let [newTitle, setNewTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter'){
            addTaskHandler()
        }
    }

    const korolChangeHandler = (value: FilterValuesType) => {
        console.log(value)
        props.changeFilter(value)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <Button title={'+'} callback={addTaskHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone} />
                    <span>{t.title}</span>

                    <Button title={'x'} callback={() => removeTaskHandler(t.id)} />
                </li>)
            }
        </ul>
        <div>
            <Button title={'All'} callback={()=>korolChangeHandler('all')} />
            <Button title={'Active'} callback={()=>korolChangeHandler('active')} />
            <Button title={'Completed'} callback={()=>korolChangeHandler('completed')} />
        </div>
    </div>
}
