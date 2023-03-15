import React, {FC, useEffect, useState} from 'react';
import {TodolistDomainType} from "features/todolists/todolistsTypes";
import {NavLink, useLocation} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import s from 'features/todolists/Todolist/Todolist.module.scss'
import {setModalTodo, setModalType} from "app/appSlice";
import changeIcon from 'assets/icons/change.svg'
import changeBlack from 'assets/icons/changeBlack.svg'
import deleteIcon from 'assets/icons/delete.svg'
import deleteBlack from 'assets/icons/deleteBlack.svg'
import {useTranslation} from 'react-i18next';
import {themeSelector} from 'features/theme/themeSelectors';
import {useWindowSize} from "common/hooks/useWindowSize";


type TodoType = TodolistDomainType &
{
    setSidebar: (value: boolean) => void
}

const Todolist: FC<TodoType> = (props) => {
    const {id, title, tasksCount,tasks,order,addedDate} = props
    const theme = useAppSelector(themeSelector)
    const width = useWindowSize()

    const {t} = useTranslation()

    const dispatch = useAppDispatch()

    const [todoClass, setTodoClass]=useState(s.container)

    const currentPath = useLocation().pathname
    let  isActive = currentPath ===`${PATH.MAIN}/${id}`;

    useEffect(()=>{
        if (isActive) {
            theme==='dark'? setTodoClass( `${s.activeContainer} ${s.container}`) : setTodoClass( `${s.ligthActiveContainer} ${s.container}`)
        }
        else setTodoClass(s.container)
    }, [currentPath, theme])


    const deleteHandler = () => {
        dispatch(setModalType('deleteTodo'))
        dispatch(setModalTodo({title, id, tasksCount,addedDate,tasks,order}))
    }

    const updateHandler = () => {
        dispatch(setModalType('updateTodo'))
        dispatch(setModalTodo({title, id, tasksCount,addedDate,tasks,order}))
    }

    const chooseTodo = () => {
        dispatch(setModalTodo({title, id, tasksCount,addedDate,tasks,order}))
        width<700 && props.setSidebar(false)
    }

    const activeHandler = (props: {isActive: boolean}) => {
        return props.isActive ? `${s.navlink} ${s.active}` : s.navlink
    }

    return (
        <div className={theme === 'dark' ? todoClass : `${todoClass} ${s.light}`}>
            <div className={s.todoHeader}>
                <button onClick={updateHandler} className={s.noBtn}><img src={theme==='dark' ? changeIcon : changeBlack} alt={'Change'}/></button>
                    <NavLink to={`${PATH.MAIN}/${id}`} onClick={chooseTodo}
                         className={activeHandler}>{title}</NavLink>
                <button onClick={deleteHandler} className={s.noBtn}><img src={theme==='dark' ? deleteIcon : deleteBlack} alt={'Change'}/></button>
            </div>
            <div className={s.tasksCountInfo}>{t('todolists.tasks_count')}: {tasksCount}</div>
            <div className={s.info}>{t('todolists.todo_info')}</div>
        </div>
    );
};

export default Todolist;