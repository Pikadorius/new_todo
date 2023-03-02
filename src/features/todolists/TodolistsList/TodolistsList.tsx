import React, {useEffect} from 'react';
import {fetchTodosTC} from "features/todolists/todolistsSlice";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import Todolist from "features/todolists/TodolistsList/Todolist/Todolist";

const TodolistsList = () => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodosTC())
    }, [])


    return (
        <>
            {todolists.map(t=><Todolist {...t} key={t.id}/>)}
        </>
    );
};

export default TodolistsList;