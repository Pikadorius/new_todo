import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import RequireAuth from "pages/RequireAuth";
import TasksList from "features/tasks/TasksList/TasksList";
import Login from "features/auth/Login/Login";
import SideBar from 'common/components/SideBar/SideBar';
import Greetings from 'common/components/Greetings/Greetings';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import {fetchTodosTC} from 'features/todolists/todolistsSlice';
import s from './Pages.module.scss'
import eye from '../assets/icons/eye.svg'
import eyeOff from '../assets/icons/eyeOff.svg'

const Pages = () => {
    const [isShowed, setIsShowed] = useState(true)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()


    const todolists = useAppSelector(state => state.todolists)
    useEffect(() => {
        dispatch(fetchTodosTC())
    }, [])

    return (
        <div>
            {isLoggedIn && <SideBar todolists={todolists} isShowed={isShowed}/>}
            <button className={s.noBtn} style={{position: 'absolute', top: '80px', left: '20px', zIndex: '200'}} onClick={() => setIsShowed(!isShowed)}>
                <img src={isShowed ? eyeOff : eye} alt={'show/hide'}/>
            </button>
            <Routes>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path={PATH.TASKS} element={<TasksList/>}/>
                    <Route path={PATH.MAIN} element={<Greetings/>}/>
                    <Route path={'/'} element={<Navigate to={PATH.MAIN}/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default Pages;