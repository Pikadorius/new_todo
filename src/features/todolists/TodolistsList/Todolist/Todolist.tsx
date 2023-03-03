import React, {FC} from 'react';
import {TodolistDomainType} from "features/todolists/todolistsTypes";
import {useNavigate} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import {useAppDispatch} from "common/hooks/hooks";
import s from './Todolist.module.css'
import {setAppPage, setModalTodo, setModalType} from "app/appSlice";


const Todolist: FC<TodolistDomainType> = (props) => {
    const {id, title, status,addedDate} = props
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(setModalType('deleteTodo'))
        dispatch(setModalTodo(props))
    }

    const chooseTodo = () => {
        navigate(`${PATH.TODOLISTS}/${id}`)
        dispatch(setAppPage(`${title}`))
        dispatch(setModalTodo(props))
    }

    return (
        <div className={s.container} >
            <div className={s.todoHeader} >
                <span onClick={chooseTodo}>{title}</span>
                <button onClick={deleteHandler} className={s.btn}>x</button>
            </div>


            <div className={s.info}>Click on title to see tasks</div>
        </div>
    );
};

export default Todolist;