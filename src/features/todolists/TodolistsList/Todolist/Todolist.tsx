import React, {FC, useEffect} from 'react';
import {TodolistDomainType} from "features/todolists/todolistsTypes";
import {NavLink} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import {useAppDispatch} from "common/hooks/hooks";
import s from 'features/todolists/TodolistsList/Todolist/Todolist.module.scss'
import {setModalTodo, setModalType} from "app/appSlice";
import changeIcon from 'assets/icons/change.svg'
import deleteIcon from 'assets/icons/delete.svg'
import {fetchTasksTC} from 'features/tasks/tasksSlice';


const Todolist: FC<TodolistDomainType> = (props) => {
    const {id, title, tasksCount, order, addedDate} = props
    const dispatch = useAppDispatch()

    // useEffect(()=>{
    //     dispatch(fetchTasksTC(id))
    // }, [])

    const deleteHandler = () => {
        dispatch(setModalType('deleteTodo'))
        dispatch(setModalTodo(props))
    }

    const updateHandler = () => {
        dispatch(setModalType('updateTodo'))
        dispatch(setModalTodo(props))
    }

    const chooseTodo = () => {
        dispatch(setModalTodo(props))
    }

    return (
        <div className={s.container}>
            <div className={s.todoHeader}>
                <button onClick={updateHandler} className={s.noBtn}><img src={changeIcon} alt={'Change'}/></button>
                <NavLink to={`${PATH.MAIN}/${id}`} onClick={chooseTodo}
                         className={({isActive}) => isActive ? `${s.navlink} ${s.active}` : s.navlink}>{title}</NavLink>
                <button onClick={deleteHandler} className={s.noBtn}><img src={deleteIcon} alt={'Change'}/></button>
            </div>
            <div className={s.info}>Click on title to see tasks</div>
        </div>
    );
};

export default Todolist;