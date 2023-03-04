import React, {FC, useEffect} from 'react';
import {TaskDomainType} from "features/tasks/tasksTypes";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import { setModalTask, setModalType} from 'app/appSlice';
import s from './Task.module.scss'

const Task:FC<TaskDomainType> = (props) => {
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(setModalType('deleteTask'))
        dispatch(setModalTask(props))
    }
    return (
        <div className={s.container}>
            <input type={'checkbox'} checked={props.status===1}/>
            <span>{props.title}</span>
            <button onClick={deleteHandler}>x</button>
        </div>
    );
};

export default Task;