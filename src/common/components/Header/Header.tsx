import React from 'react';
import s from './Header.module.css'
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {logoutTC} from 'features/auth/authSlice';


const Header = () => {
    const page = useAppSelector(state => state.app.page)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={s.container}>
            <h1 className={s.title}>{page}</h1>
            {isLoggedIn && <button className={s.logoutBtn} onClick={logout}>Logout</button>}
        </div>
    );
};

export default Header;