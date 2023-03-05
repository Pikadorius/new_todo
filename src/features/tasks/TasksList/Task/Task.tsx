import React, {FC} from 'react';
import {TaskDomainType} from "features/tasks/tasksTypes";
import {useAppDispatch} from "common/hooks/hooks";
import { setModalTask, setModalType} from 'app/appSlice';
import s from './Task.module.scss'
import changeIcon from 'assets/icons/change.svg';
import {NavLink} from 'react-router-dom';
import {PATH} from 'common/constants/PATH';
import deleteIcon from 'assets/icons/delete.svg';

type Props = {
    taskStatus: 'active' | 'inProgress' | 'completed'
}
const Task:FC<TaskDomainType & Props> = (props) => {
    const dispatch = useAppDispatch()

    const taskClass =
        props.taskStatus === 'inProgress' ?
            `${s.inProgress} ${s.container}` : props.taskStatus==='completed' ? `${s.container} ${s.completed}` : s.container

    const deleteHandler = () => {
        dispatch(setModalType('deleteTask'))
        dispatch(setModalTask(props))
    }

    const updateTask = () => {
        dispatch(setModalType('updateTask'))
        dispatch(setModalTask(props))
    }

    return (
        <div className={taskClass}>
            <div className={s.taskHeader} >
                <button onClick={updateTask} className={s.noBtn}><img src={changeIcon} alt={'Change'}/></button>
                <h3 className={s.taskTitle}>{props.title}</h3>
                <button onClick={deleteHandler} className={s.noBtn}><img src={deleteIcon} alt={'Change'}/></button>
            </div>
            {/*<p>{props.description}</p>*/}
        </div>
    );
};

export default Task;