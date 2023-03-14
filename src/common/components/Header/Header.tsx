import React, {useRef, useState} from 'react';
import s from 'common/components/Header/Header.module.scss'
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {logoutTC} from 'features/auth/authSlice';
import {setModalType} from 'app/appSlice';
import addIcon from 'assets/icons/add.svg'
import addIconBlack from 'assets/icons/addBlack.svg'
import {useLocation} from 'react-router-dom';
import {isLoggedSelector, loggedUserSelector} from 'features/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import Tooltip from 'common/components/Tooltip/Tooltip';
import LanguageSelect from "common/components/LanguageSelect/LanguageSelect";
import Theme from 'common/components/ThemeSelect/ThemeSelect';
import {themeReducer} from 'features/theme/themeSlice';
import {themeSelector} from 'features/theme/themeSelectors';

const Header = () => {
    const id = useLocation().pathname.slice(6)
    const todo = useAppSelector(state => state.todolists.find(t => t.id === id))
    const isLoggedIn = useAppSelector(isLoggedSelector)
    const userName = useAppSelector(loggedUserSelector).login
    const theme = useAppSelector(themeSelector)

    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const refSetTimeout = useRef<NodeJS.Timeout>();
    const [tooltip, showTooltip] = useState(false)
    const onMouseEnterHandler = () => {
        refSetTimeout.current = setTimeout(() => {
            showTooltip(true);
        }, 500);
    };

    const onMouseLeaveHandler = () => {
        clearTimeout(refSetTimeout.current);
        showTooltip(false);
    };


    let page: string

    if (id && todo) {
        page = todo.title
    } else {
        page = 'Todolist App'
    }

    const logout = () => {
        dispatch(logoutTC())
    }

    const addTask = () => {
        dispatch(setModalType('createTask'))
    }

    return (
        <div className={theme==='dark' ? s.container : `${s.container} ${s.light}`}>
            <h2 className={s.title}>
                <div className={s.page} onMouseEnter={onMouseEnterHandler}
                     onMouseLeave={onMouseLeaveHandler}>{page}</div>
                {page !== 'Todolist App' && tooltip && <Tooltip text={page}><></>
                </Tooltip>}
                {(page !== 'Todolist App' && page !== 'Следи за делами') && isLoggedIn &&
                    <button className={s.noBtn} title={'Add new task'} onClick={addTask}><img src={addIcon}
                                                                                              alt={'add'}/></button>}
            </h2>
            <div className={s.logoutField}>
                <Theme/>
                <LanguageSelect/>
                {userName}
                {isLoggedIn &&
                    <button className={`${s.logout} ${s.btn}`} onClick={logout}>{t(`header.logout`)}</button>}
            </div>
        </div>

    );
};

export default Header;