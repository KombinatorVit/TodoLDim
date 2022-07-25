import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from './component/TodoList/TodoList';


export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {


    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: number) {
        let filteredTasks = tasks.filter((t) => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />


        </div>
    );
}

export default App;