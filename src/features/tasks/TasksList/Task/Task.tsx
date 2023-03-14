import React, {DragEvent, FC} from 'react';
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {setModalTask, setModalType} from 'app/appSlice';
import s from './Task.module.scss'
import changeIcon from 'assets/icons/change.svg';
import deleteIcon from 'assets/icons/delete.svg';
import {TaskType} from 'features/tasks/tasksTypes';
import {themeSelector} from 'features/theme/themeSelectors';

type Props = {
    taskStatus: 'active' | 'inProgress' | 'completed'
}
const Task: FC<TaskType & Props> = (props) => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(themeSelector)

    const taskClass =
        props.taskStatus === 'inProgress' ?
            `${s.inProgress} ${s.container}` : props.taskStatus === 'completed' ? `${s.container} ${s.completed}` : `${s.container} ${s.active}`

    const deleteHandler = () => {
        dispatch(setModalType('deleteTask'))
        dispatch(setModalTask(props))
    }

    const updateTask = () => {
        dispatch(setModalType('updateTask'))
        dispatch(setModalTask(props))
    }

    const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    }
    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {

    }

    return (
        <div className={theme==='dark'? taskClass : `${taskClass} ${s.ligth}`}
             draggable={true}
             onDragStart={dragStartHandler}
             onDragLeave={dragLeaveHandler}
             onDragEnd={dragEndHandler}
             onDragOver={dragOverHandler}
             onDrop={dropHandler}
        >
            <div className={s.taskHeader}>
                <button onClick={updateTask} className={s.noBtn}><img src={changeIcon} alt={'Change'}/></button>
                <h3 className={s.taskTitle}>{props.title}</h3>
                <button onClick={deleteHandler} className={s.noBtn}><img src={deleteIcon} alt={'Change'}/></button>
            </div>

            {props.description && <p className={s.description}>{props.description}</p>}
        </div>
    );
};

export default Task;