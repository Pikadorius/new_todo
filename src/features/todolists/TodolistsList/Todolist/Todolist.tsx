import React, {FC} from 'react';
import {TodolistDomainType} from "features/todolists/todolistsTypes";
import {useNavigate} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import {useAppDispatch} from "common/hooks/hooks";
import {deleteTodoTC} from "features/todolists/todolistsSlice";
import s from './Todolist.module.css'


const Todolist: FC<TodolistDomainType> = ({id, title, status}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(deleteTodoTC(id))
    }

    return (
        <div className={s.container}>
            <div onClick={() => navigate(`${PATH.TODOLISTS}/${id}`)}>
                {title}
            </div>
            <button onClick={deleteHandler}>x</button>
        </div>
    );
};

export default Todolist;