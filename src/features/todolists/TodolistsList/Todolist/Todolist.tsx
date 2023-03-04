import React, {FC} from 'react';
import {TodolistDomainType} from "features/todolists/todolistsTypes";
import {useNavigate} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import {useAppDispatch} from "common/hooks/hooks";
import s from 'features/todolists/TodolistsList/Todolist/Todolist.module.scss'
import {setModalTodo, setModalType} from "app/appSlice";
import changeIcon from 'assets/icons/change.svg'
import deleteIcon from 'assets/icons/delete.svg'


const Todolist: FC<TodolistDomainType> = (props) => {
    const {id, title, status,addedDate} = props
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(setModalType('deleteTodo'))
        dispatch(setModalTodo(props))
    }

    const updateHandler = () => {
        dispatch(setModalType('updateTodo'))
        dispatch(setModalTodo(props))
    }

    const chooseTodo = () => {
        navigate(`${PATH.MAIN}/${id}`)
        // dispatch(setAppPage(`${title}`))
        dispatch(setModalTodo(props))
    }

    return (
        <div className={s.container} >
            <div className={s.todoHeader} >
                <button onClick={updateHandler} className={s.noBtn}><img src={changeIcon} alt={'Change'}/></button>
                <div onClick={chooseTodo}>{title}</div>
                <button onClick={deleteHandler} className={s.noBtn}><img src={deleteIcon} alt={'Change'}/></button>
            </div>


            <div className={s.info}>Click on title to see tasks</div>
        </div>
    );
};

export default Todolist;