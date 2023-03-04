import React, {FC, useEffect} from 'react';
import {TaskDomainType, UpdateTaskType} from "features/tasks/tasksTypes";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import { setModalTask, setModalType} from 'app/appSlice';
import s from './Task.module.scss'
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
        title: 'lol',
        description: 'you must do it'
    }
    const updateTask = () => {
        dispatch(setModalType('updateTask'))
        dispatch(setModalTask(props))
        // dispatch(updateTaskTC({newTask, taskId: props.id, todoId: props.todoListId}))
    }

    return (
        <div className={s.container}>
            <input type={'checkbox'} checked={props.status===1}/>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <button onClick={deleteHandler}>x</button>
            <button onClick={updateTask}>update</button>
        </div>
    );
};

export default Task;