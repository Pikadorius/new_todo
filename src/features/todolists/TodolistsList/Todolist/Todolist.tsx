import React, {FC} from 'react';
import {TodolistDomainType} from "features/todolists/todolistsTypes";
import {useNavigate} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import {useAppDispatch} from "common/hooks/hooks";
import {deleteTodoTC} from "features/todolists/todolistsSlice";
import s from './Todolist.module.css'
import {setAppPage} from "app/appSlice";


const Todolist: FC<TodolistDomainType> = ({id, title, status}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(deleteTodoTC(id))
    }

    const chooseTodo = () => {
        navigate(`${PATH.TODOLISTS}/${id}`)
        dispatch(setAppPage(`"${title}": tasks`))
    }

    return (
        <div className={s.container}>
            <div onClick={chooseTodo}>
                {title}
            </div>
            <button onClick={deleteHandler}>x</button>
        </div>
    );
};

export default Todolist;