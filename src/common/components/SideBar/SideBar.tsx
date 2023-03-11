import React from 'react';
import s from 'common/components/SideBar/SideBar.module.scss'
import {useAppDispatch} from 'common/hooks/hooks';
import Todolist from 'features/todolists/Todolist/Todolist';
import {setModalType} from 'app/appSlice';
import addIcon from 'assets/icons/add.svg';
import {TodolistDomainType} from 'features/todolists/todolistsTypes';
import {useTranslation} from 'react-i18next';

const SideBar = (props: { todolists: TodolistDomainType[], isShowed: boolean }) => {
    const dispatch = useAppDispatch()

    const {t} = useTranslation('translation');
    const addTodolist = () => {
        dispatch(setModalType('createTodo'))
    }

    return (
        <div className={props.isShowed ? s.sidebar : `${s.sidebar} ${s.closed}`}>
            <h2 className={s.sidebarTitle}>
                <div>{t('todolists.title')}</div>
                <button className={s.noBtn} onClick={addTodolist}><img src={addIcon} alt={'add'}/></button>
            </h2>
            {props.todolists.map(t => {
                return <Todolist key={t.id} {...t}/>
            })}
        </div>
    );
};

export default SideBar;