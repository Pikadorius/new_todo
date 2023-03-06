import React, {useEffect} from 'react';
import s from 'common/components/Header/Header.module.scss'
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {logoutTC} from 'features/auth/authSlice';
import {setModalType} from 'app/appSlice';
import addIcon from '../../../assets/icons/add.svg'
import {useLocation} from 'react-router-dom';

const Header = () => {
    const id = useLocation().pathname.slice(6)
    let page=''
    const todo = useAppSelector(state => state.todolists.find(t=>t.id===id))

    if (id && todo) {
        page=todo.title
    }
    else {
        page='Todolist App'
    }

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.auth.user.login)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    const addTask = () => {
            dispatch(setModalType('createTask' ))
    }


    return (
        <div className={s.container}>
            <h1 className={s.title}>
                <div>{page}</div>
                {page!=='Todolist App' && isLoggedIn && <button className={s.noBtn} title={'Add new task'} onClick={addTask}><img src={addIcon} alt={'add'}/></button> }
            </h1>
            <span className={s.logoutField}>{userName}
                {isLoggedIn && <button className={`${s.logout} ${s.btn}`} onClick={logout}>Logout</button>}
                    </span>
        </div>

    );
};

export default Header;