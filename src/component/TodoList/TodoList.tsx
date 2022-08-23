import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
    changeTaskTitle: (taskId: string,newValue:string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodolistTitle:(todoListId: string, newTitle:string)=> void
}


export function TodoList(props: TodoListType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    };
    const changeTodolistTitle = (newTitle:string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    };


    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((t) => {

                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id);

                    };
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    };
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id,newValue, props.id);
                    };

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type="checkbox"
                                                                                    onChange={onChangeStatusHandler}
                                                                                    checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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

