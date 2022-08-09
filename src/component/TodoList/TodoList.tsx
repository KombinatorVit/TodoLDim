import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../../App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}


export function TodoList(props: TodoListType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('');
        }
    };

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        } else {
            setError('Title is required');
        }
    };
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed',  props.id);
    const removeTodoList = () => {
props.removeTodoList(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>X</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}

                >+
                </button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {

                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id);

                    };
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    };

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type="checkbox"
                                                                                    onChange={onChangeHandler}
                                                                                    checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}
                            >X
                            </button>
                        </li>
                    );
                })}

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}