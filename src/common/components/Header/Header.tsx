import React, {useState} from 'react';
import s from './Header.module.css'
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {logoutTC} from 'features/auth/authSlice';


const Header = () => {
    const page = useAppSelector(state => state.app.page)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.auth.user.login)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={s.container}>
            <h1 className={s.title}>{page}</h1>
            {isLoggedIn && <span className={s.logoutField}>{userName}
                <button className={s.logoutBtn} onClick={logout}>Logout</button></span>}
        </div>
    );
};

export default Header;