import React, {FC} from 'react';
import {useAppDispatch} from 'common/hooks/hooks';
import {setAppPage, setModalType} from 'app/appSlice';
import {deleteTodoTC} from 'features/todolists/todolistsSlice';
import {deleteTaskTC} from 'features/tasks/tasksSlice';
import {TaskDomainType} from 'features/tasks/tasksTypes';
import {TodolistDomainType} from 'features/todolists/todolistsTypes';
import common from 'common/components/Modal/CommonModals.module.scss'
import {useNavigate} from 'react-router-dom';
import {PATH} from 'common/constants/PATH';

type ModalType = {
    type: 'todo' | 'task'
    title: string
    callback?: ()=>void
    task?: TaskDomainType
    todo?: TodolistDomainType
}
const ModalFooter: FC<ModalType> = ({type, todo,task,title,callback}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const id = document.location.hash.slice(7)
    console.log(id)
    const submit = () => {
        type === 'todo' ? todo && dispatch(deleteTodoTC(todo.id)).then(() => {
            if (id===todo.id) {
                navigate(PATH.MAIN)
                dispatch(setAppPage('Todolist App'))
            }
            dispatch(setModalType('idle'))
        })
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