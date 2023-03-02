import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import TodolistsList from "features/todolists/TodolistsList/TodolistsList";
import RequireAuth from "pages/RequireAuth";
import TasksList from "features/tasks/TasksList/TasksList";

const Pages = () => {
    return (

        <Routes>
            <Route path={PATH.LOGIN} element={<div>LOGIN</div>}/>
            <Route element={<RequireAuth/>}>
                <Route path={PATH.TASKS} element={<TasksList/>}/>
                <Route path={PATH.TODOLISTS} element={<TodolistsList/>}/>
                <Route path={'/'} element={<Navigate to={PATH.TODOLISTS}/>}/>
            </Route>
        </Routes>
    );
};

export default Pages;