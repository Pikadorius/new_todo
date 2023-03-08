import React, {FC, useEffect, useState} from 'react';
import {TodolistDomainType} from "features/todolists/todolistsTypes";
import {NavLink} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import {useAppDispatch} from "common/hooks/hooks";
import s from 'features/todolists/Todolist/Todolist.module.scss'
import {setModalTodo, setModalType} from "app/appSlice";
import changeIcon from 'assets/icons/change.svg'
import deleteIcon from 'assets/icons/delete.svg'


const Todolist: FC<TodolistDomainType> = (props) => {
    const {id, title, tasksCount, tasks} = props
    const dispatch = useAppDispatch()
    const [todoClass, setTodoClass]=useState(s.container)

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

    const activeHandler = (props: {isActive: boolean}) => {
        if (props.isActive) {
            setTodoClass( `${s.activeContainer} ${s.container}`)
        }
        else setTodoClass(s.container)

        return props.isActive ? `${s.navlink} ${s.active}` : s.navlink
    }

    return (
        <div className={todoClass}>
            <div className={s.todoHeader}>
                <button onClick={updateHandler} className={s.noBtn}><img src={changeIcon} alt={'Change'}/></button>
                    <NavLink to={`${PATH.MAIN}/${id}`} onClick={chooseTodo}
                         className={activeHandler}>{title}</NavLink>
                <button onClick={deleteHandler} className={s.noBtn}><img src={deleteIcon} alt={'Change'}/></button>
            </div>
            <div className={s.tasksCountInfo}>Tasks count: {tasksCount}</div>
            <div className={s.info}>Click on title to see tasks</div>
        </div>
    );
};

export default Todolist;