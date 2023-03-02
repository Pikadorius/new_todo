import React, {useEffect} from 'react';
import {fetchTodosTC} from "features/todolists/todolistsSlice";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";

const TodolistsList = () => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodosTC())
    })

    const todos = todolists.map(t => <li key={t.id}>{t.title}</li>)

    return (
        <ul>{todos}</ul>
    );
};

export default TodolistsList;