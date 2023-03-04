import React, {FC} from 'react';
import {TaskDomainType, UpdateTaskType} from "features/tasks/tasksTypes";
import {useAppDispatch} from "common/hooks/hooks";
import { setModalTask, setModalType} from 'app/appSlice';
import s from './Task.module.scss'

const Task:FC<TaskDomainType> = (props) => {
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(setModalType('deleteTask'))
        dispatch(setModalTask(props))
    }

    const updateTask = () => {
        dispatch(setModalType('updateTask'))
        dispatch(setModalTask(props))
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