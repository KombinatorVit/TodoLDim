import React from 'react';

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListType = {
    title: string
    tasks: Array<TasksType>
}


export function TodoList(props: TodoListType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        <button onClick={() => {alert('click')}}>X</button></li>
                    );
                })}

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}