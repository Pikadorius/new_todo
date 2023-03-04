import React, {useEffect} from 'react';
import {fetchTodosTC} from "features/todolists/todolistsSlice";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import Todolist from "features/todolists/TodolistsList/Todolist/Todolist";
import s from './TodolistList.module.css'

const TodolistsList = () => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodosTC())
    }, [])


    return (
        <>
            <div className={s.todosSkeleton}>
                {todolists.map(t => <Todolist {...t} key={t.id}/>)}
            </div>
        </>
    );
};

export default TodolistsList;