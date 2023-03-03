import React from 'react';
import s from 'common/components/Header/Header.module.scss'
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {logoutTC} from 'features/auth/authSlice';
import {setModalType} from 'app/appSlice';
import addIcon from '../../../assets/icons/add.svg'


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
                <div>{page}</div>
                {isLoggedIn && <button className={s.noBtn} onClick={addItemHandler}><img src={addIcon} alt={'add'}/></button> }
            </h1>
            <span className={s.logoutField}>{userName}
                {isLoggedIn && <button className={`${s.logout} ${s.btn}`} onClick={logout}>Logout</button>}
                    </span>
        </div>

    );
};

export default Header;