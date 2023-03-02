import React, {FC} from 'react';
import {TodolistDomainType} from "features/todolists/todolistsTypes";
import {useNavigate} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import {useAppDispatch} from "common/hooks/hooks";
import {deleteTodoTC} from "features/todolists/todolistsSlice";
import s from './Todolist.module.css'
import {setAppPage} from "app/appSlice";


const Todolist: FC<TodolistDomainType> = ({id, title, status,addedDate}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(deleteTodoTC(id))
    }

    const chooseTodo = () => {
        navigate(`${PATH.TODOLISTS}/${id}`)
        dispatch(setAppPage(`${title}`))
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