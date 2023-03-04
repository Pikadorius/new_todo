import React, {FC, useEffect} from 'react';
import {TaskDomainType, UpdateTaskType} from "features/tasks/tasksTypes";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import { setModalTask, setModalType} from 'app/appSlice';
import s from './Task.module.scss'
import {updateTodoTC} from 'features/todolists/todolistsSlice';
import {updateTaskTC} from 'features/tasks/tasksSlice';

const Task:FC<TaskDomainType> = (props) => {
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(setModalType('deleteTask'))
        dispatch(setModalTask(props))
    }

    const newTask:UpdateTaskType = {
        ...props,
        status: 1,
        title: 'lol'
    }
    const updateTask = () => {
        dispatch(updateTaskTC({newTask, taskId: props.id, todoId: props.todoListId}))
    }

    return (
        <div className={s.container}>
            <input type={'checkbox'} checked={props.status===1}/>
            <span>{props.title}</span>
            <button onClick={deleteHandler}>x</button>
            <button onClick={updateTask}>update</button>
        </div>
    );
};

export default Task;