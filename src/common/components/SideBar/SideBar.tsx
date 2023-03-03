import React from 'react';
import TodolistsList from 'features/todolists/TodolistsList/TodolistsList';
import s from 'common/components/SideBar/SideBar.module.scss'
import { NavLink} from 'react-router-dom';
import {useAppSelector} from 'common/hooks/hooks';
import {PATH} from 'common/constants/PATH';

const SideBar = () => {
    const todolists = useAppSelector(state => state.todolists)
    return (
        <div className={s.sidebar}>
            {todolists.map(t=>{
                return <NavLink key={t.id} to={`${PATH.TODOLISTS}/${t.id}`}>{t.title}</NavLink>
            })}
        </div>
    );
};

export default SideBar;