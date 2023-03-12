import React from 'react';
import s from 'common/components/Header/Header.module.scss'
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {logoutTC} from 'features/auth/authSlice';
import {setModalType} from 'app/appSlice';
import addIcon from 'assets/icons/add.svg'
import {useLocation} from 'react-router-dom';
import {isLoggedSelector, loggedUserSelector} from 'features/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import engFlag from 'assets/icons/lang/eng.png'
import ruFlag from 'assets/icons/lang/ru.png'

const Header = () => {
    const id = useLocation().pathname.slice(6)
    let page: string
    const todo = useAppSelector(state => state.todolists.find(t => t.id === id))

    const {t, i18n} = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    if (id && todo) {
        page = todo.title
    } else {
        page = 'Todolist App'
    }

    const isLoggedIn = useAppSelector(isLoggedSelector)
    const userName = useAppSelector(loggedUserSelector).login
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    const addTask = () => {
        dispatch(setModalType('createTask'))
    }

    return (
        <div className={s.container}>
            <h2 className={s.title}>
                <div className={s.page} title={page}>{page}</div>
                {(page !== 'Todolist App' && page !== 'Следи за делами') && isLoggedIn &&
                    <button className={s.noBtn} title={'Add new task'} onClick={addTask}><img src={addIcon}
                                                                                              alt={'add'}/></button>}
            </h2>
            <div className={s.logoutField}>
                <div className={s.langBtns}>
                    <button className={s.noBtn} onClick={() => changeLanguage("en")}><img className={s.flagBtn}
                                                                                          src={engFlag}
                                                                                          alt={'add'}/></button>
                    <button className={s.noBtn} onClick={() => changeLanguage("ru")}><img className={s.flagBtn}
                                                                                          src={ruFlag}
                                                                                          alt={'add'}/></button>
                </div>
                {userName}
                {isLoggedIn &&
                    <button className={`${s.logout} ${s.btn}`} onClick={logout}>{t(`header.logout`)}</button>}
            </div>
        </div>

    );
};

export default Header;