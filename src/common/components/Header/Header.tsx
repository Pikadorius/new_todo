import React from 'react';
import s from 'common/components/Header/Header.module.scss'
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {logoutTC} from 'features/auth/authSlice';
import {isLoggedSelector, loggedUserSelector} from 'features/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import LanguageSelect from "common/components/LanguageSelect/LanguageSelect";
import Theme from 'common/components/ThemeSelect/ThemeSelect';
import {themeSelector} from 'features/theme/themeSelectors';

const Header = () => {
    const isLoggedIn = useAppSelector(isLoggedSelector)
    const userName = useAppSelector(loggedUserSelector).login
    const theme = useAppSelector(themeSelector)

    const {t} = useTranslation()
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }

    return (
        <div className={theme === 'dark' ? s.container : `${s.container} ${s.light}`}>
            <h2 className={s.title}>
                Todo App
            </h2>
            <div className={s.logoutField}>
                <div className={s.buttons}>
                    <Theme/>
                    <LanguageSelect/>
                </div>
                {userName && <div className={s.userName}>{userName}</div>}
                {isLoggedIn &&
                    <button className={`${s.logout} ${s.btn}`} onClick={logout}>{t(`header.logout`)}</button>}
            </div>
        </div>

    );
};

export default Header;