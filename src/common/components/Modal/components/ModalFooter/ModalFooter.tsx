import React, {FC} from 'react';
import {useAppDispatch} from 'common/hooks/hooks';
import {setModalType} from 'app/appSlice';
import {deleteTodoTC} from 'features/todolists/todolistsSlice';
import {deleteTaskTC} from 'features/tasks/tasksSlice';
import {TaskDomainType} from 'features/tasks/tasksTypes';
import {TodolistDomainType} from 'features/todolists/todolistsTypes';
import s from './ModalFooter.module.css'
import common from 'common/components/Modal/CommonModals.module.scss'

type ModalType = {
    type: 'todo' | 'task'
    title: string
    callback?: ()=>void
    task?: TaskDomainType
    todo?: TodolistDomainType
}
const ModalFooter: FC<ModalType> = ({type, todo,task,title,callback}) => {
    const dispatch = useAppDispatch()
    const submit = () => {
        type === 'todo' ? todo && dispatch(deleteTodoTC(todo.id)).then(() => dispatch(setModalType('idle')))
            : task && dispatch(deleteTaskTC({
                todoId: task.todoListId,
                taskId: task.id
            })).then(() => dispatch(setModalType('idle')))
    }

    const closeHandler = () => {
        dispatch(setModalType('idle'))
    }
    return (
        <div className={common.modalFooter}>
            <button onClick={closeHandler}>Cancel</button>
            <button onClick={callback? callback : submit}>{title}</button>
        </div>
    );
};

export default ModalFooter;