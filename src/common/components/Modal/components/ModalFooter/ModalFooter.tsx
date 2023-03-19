import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import { setModalType} from 'app/appSlice';
import {deleteTodoTC} from 'features/todolists/todolistsSlice';
import {deleteTaskTC} from 'features/tasks/tasksSlice';
import {TodolistDomainType} from 'features/todolists/todolistsTypes';
import common from 'common/components/Modal/CommonModals.module.scss'
import {useNavigate} from 'react-router-dom';
import {PATH} from 'common/constants/PATH';
import {TaskType} from 'features/tasks/tasksTypes';
import {useTranslation} from 'react-i18next';
import {themeSelector} from 'features/theme/themeSelectors';

type ModalType = {
    type: 'todo' | 'task'
    title: string
    callback?: ()=>void
    task?: TaskType
    todo?: TodolistDomainType
}
const ModalFooter: FC<ModalType> = ({type, todo,task,title,callback}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation()
    const id = document.location.hash.slice(7)
    const theme = useAppSelector(themeSelector)

    const listener = (e:any) => {
        if (e.key==='Enter') {
            callback ? callback() : submit()
        }
    }

    useEffect(()=>{
        document.addEventListener('keydown', listener)
        return ()=>{
            document.removeEventListener('keydown', listener)
        }
    },[])

    const submit = () => {
        type === 'todo' ? todo && dispatch(deleteTodoTC(todo.id)).then(() => {
            if (id===todo.id) {
                navigate(PATH.MAIN)
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
        <div className={theme==='dark' ? common.modalFooter : `${common.modalFooter} ${common.light}`}>
            <button className={common.btn} onClick={closeHandler}>{t("modal.cancel")}</button>
            <button className={common.btn} onClick={callback? callback : submit}>{title}</button>
        </div>
    );
};

export default ModalFooter;