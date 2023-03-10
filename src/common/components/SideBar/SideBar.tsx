import React from 'react';
import s from 'common/components/SideBar/SideBar.module.scss'
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import Todolist from 'features/todolists/Todolist/Todolist';
import {setModalType} from 'app/appSlice';
import addIcon from 'assets/icons/add.svg';
import addBlack from 'assets/icons/addBlack.svg';
import {TodolistDomainType} from 'features/todolists/todolistsTypes';
import {useTranslation} from 'react-i18next';
import {themeSelector} from 'features/theme/themeSelectors';
import changeIcon from 'assets/icons/change.svg';
import changeBlack from 'assets/icons/changeBlack.svg';

const SideBar = (props: { todolists: TodolistDomainType[], isShowed: boolean }) => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(themeSelector)

    const {t} = useTranslation('translation');
    const addTodolist = () => {
        dispatch(setModalType('createTodo'))
    }

    const sidebar = theme==='dark'? s.sidebar : `${s.sidebar} ${s.light}`

    return (
        <div className={props.isShowed ? sidebar : `${sidebar} ${s.closed}`}>
            <h2 className={s.sidebarTitle}>
                <div>{t('todolists.title')}</div>
                <button className={s.noBtn} onClick={addTodolist}><img src={theme==='dark' ? addIcon : addBlack} alt={'add'}/></button>
            </h2>
            {props.todolists.map(t => {
                return <Todolist key={t.id} {...t}/>
            })}
        </div>
    );
};

export default SideBar;