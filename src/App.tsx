import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksType, TodoList} from './component/TodoList/TodoList';
import {AddItemForm} from './component/TodoList/AddItemForm';


export type FilterValuesType = 'all' | 'completed' | 'active'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


type TaskStateType = {
[key:string]: Array<TasksType>
}


function App() {

    function removeTask(id: string, todoListId: string) {

        let tasks = tasksObj[todoListId];

        let filteredTasks = tasks.filter((t) => t.id !== id);
        tasksObj[todoListId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId];

        let newTasks = [newTask, ...tasks];
        tasksObj[todoListId] = newTasks;

        setTasks({...tasksObj});
    }


    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todolists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todolists]);
        }
    }


    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];

        let task = tasks.find((t) => t.id === taskId);
        if (task) {

            task.isDone = isDone;
            setTasks({...tasksObj});

        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]);


    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todolists.filter((tl => tl.id !== todoListId));
        setTodoLists(filteredTodoList);
        delete tasksObj[todoListId];
        setTasks({...tasksObj});
    };

    let changeTodolistTitle = (todoListId: string, newTitle:string ) => {
        const todolist = todolists.find(tl => tl.id === todoListId)
        if(todolist){
            todolist.title = newTitle
            setTodoLists([...todolists])
        }
    }

    let [tasksObj, setTasks] = useState<TaskStateType>({
        [todoListId1]: [{id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'REST API', isDone: false},
            {id: v1(), title: 'Graph QL', isDone: true},],
        [todoListId2]: [{id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'book', isDone: true},
            {id: v1(), title: 'Milk', isDone: false}
        ]
    });


    function addTodolist(title:string){
        let todolist: TodoListType = {
            id:v1(),
            filter:'all',
            title:title,
        }

        setTodoLists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    function changeTaskTitle(taskId: string, newTitle:string, todoListId: string) {
        let tasks = tasksObj[todoListId];

        let task = tasks.find((t) => t.id === taskId);
        if (task) {

            task.title = newTitle;
            setTasks({...tasksObj});

        }
    }

    return (
        <div className="App">
<AddItemForm addItem={addTodolist}  />
            {
                todolists.map((tl) => {
                    let tasksForTodoList = tasksObj[tl.id];
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
                    }

                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
                    }

                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    );
                })
            }


        </div>
    );
}

export default App;