import React from 'react';
import s from './Header.module.css'
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {logoutTC} from 'features/auth/authSlice';
import {setModalType} from 'app/appSlice';


const Header = () => {
    const page = useAppSelector(state => state.app.page)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.auth.user.login)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    const addTodoHandler = () => {
        dispatch(setModalType('createTodo'))
    }

    const addTaskHandler = () => {
        dispatch(setModalType('createTask'))
    }

    return (
        <div className={s.container}>
            <h1 className={s.title}>
                {page}
                {page === 'Todolists' ? <button onClick={addTodoHandler}>Add todo</button> : <button onClick={addTaskHandler}>Add task</button>}
            </h1>
            {isLoggedIn && <span className={s.logoutField}>{userName}
                <button className={s.logoutBtn} onClick={logout}>Logout</button></span>}
        </div>
    );
};

export default Header;