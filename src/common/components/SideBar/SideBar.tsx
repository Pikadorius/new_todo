import React, {useEffect} from 'react';
import s from 'common/components/SideBar/SideBar.module.scss'
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import Todolist from 'features/todolists/TodolistsList/Todolist/Todolist';
import {setModalType} from 'app/appSlice';
import addIcon from 'assets/icons/add.svg';
import {fetchTodosTC} from 'features/todolists/todolistsSlice';

const SideBar = () => {
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchTodosTC())
        // dispatch(setAppPage('Todolist App'))
    }, [])
    const addTodolist = () => {
        dispatch(setModalType('createTodo'))
    }

    const todolists = useAppSelector(state => state.todolists)
    return (
        <div className={s.sidebar}>
            <h2 className={s.sidebarTitle}>
                Todolists
               <button className={s.noBtn} onClick={addTodolist}><img src={addIcon} alt={'add'}/></button>
            </h2>
            {todolists.map(t => {
                return <Todolist key={t.id} {...t}/>
            })}
        </div>
    );
};

export default SideBar;