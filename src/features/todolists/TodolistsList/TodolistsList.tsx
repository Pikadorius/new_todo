import React, {useEffect} from 'react';
import {createTodoTC, fetchTodosTC} from "features/todolists/todolistsSlice";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import Todolist from "features/todolists/TodolistsList/Todolist/Todolist";
import AddItemForm from "common/components/AddItemForm/AddItemForm";
import {createTaskTC} from "features/tasks/tasksSlice";

const TodolistsList = () => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodosTC())
    }, [])

    const addTodo = (title: string) => {
        dispatch(createTodoTC(title))
    }

    return (
        <>
            <h1>Todolists</h1>
            <AddItemForm callback={addTodo}/>
            {todolists.map(t=><Todolist {...t} key={t.id}/>)}
        </>
    );
};

export default TodolistsList;