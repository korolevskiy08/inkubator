import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type filterNameType = 'All' | 'Completed' | 'Active'

function App() {

    let [tasks1, setTask1] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    const[filterValue, setFilterValue] = useState('All')

    const filterName = (name: string) => {
        setFilterValue(name)
    }

    const removeTask = (id: number) => {
        tasks1 = tasks1.filter((el) => el.id !== id)
        setTask1(tasks1)
        console.log(id)
    }

    let filteredTask = tasks1

    if (filterValue === 'Active'){
        filteredTask = tasks1.filter(el => el.isDone === false)
    }

    if (filterValue === 'Completed'){
        filteredTask = tasks1.filter(el => el.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTask}
                      removeTask={removeTask}
                      filterName={filterName}

            />
        </div>
    );
}

export default App;
