import React from 'react';
import s from 'common/components/Header/Header.module.scss'
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

    const addItemHandler = () => {
        page==='Todolists' ?
            dispatch(setModalType('createTodo')) :
            dispatch(setModalType('createTask' ))
    }


    return (
        <div className={s.container}>
            <h1 className={s.title}>
                {page}
                {isLoggedIn && <button onClick={addItemHandler}>Add {page==='Todolists' ? 'todo' : 'task'}</button> }
            </h1>
            <span className={s.logoutField}>{userName}
                {isLoggedIn && <button className={`${s.logout} ${s.btn}`} onClick={logout}>Logout</button>}
                    </span>
        </div>

    );
};

export default Header;