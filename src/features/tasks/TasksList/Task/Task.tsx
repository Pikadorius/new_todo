import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {setModalTask, setModalType} from 'app/appSlice';
import s from './Task.module.scss'
import changeIcon from 'assets/icons/change.svg';
import changeIconBlack from 'assets/icons/changeBlack.svg'
import deleteIcon from 'assets/icons/delete.svg';
import deleteIconBlack from 'assets/icons/deleteBlack.svg';
import {TaskType} from 'features/tasks/tasksTypes';
import {themeSelector} from 'features/theme/themeSelectors';
import dayjs from 'dayjs';
import {Draggable} from '@hello-pangea/dnd';

type Props = {
    taskStatus: 'active' | 'inProgress' | 'completed'
    index: number
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

    const d = dayjs(props.addedDate).format('DD.MM.YYYY')

    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided, snapshot) => (
                <div
                    className={`${theme === 'dark' ? taskClass : `${taskClass} ${s.ligth}`} ${snapshot.isDragging ? s.dragging : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className={s.taskHeader}>
                        <button onClick={updateTask} className={s.noBtn}><img
                            src={theme === 'dark' ? changeIcon : changeIconBlack} alt={'Change'}/></button>
                        <h3 className={s.taskTitle}>{props.title}</h3>
                        <button onClick={deleteHandler} className={s.noBtn}><img
                            src={theme === 'dark' ? deleteIcon : deleteIconBlack} alt={'Change'}/></button>
                    </div>
                    {props.description && <div className={s.description}>{props.description}</div>}
                    <div className={s.addedDate}>{d}</div>
                </div>
            )}
        </Draggable>
    );
};

export default Task;