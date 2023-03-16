import React, {useEffect, useMemo, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import RequireAuth from "pages/RequireAuth";
import TasksList from "features/tasks/TasksList/TasksList";
import Login from "features/auth/Login/Login";
import Greetings from 'common/components/Greetings/Greetings';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import {fetchTodosTC} from 'features/todolists/todolistsSlice';
import s from './Pages.module.scss'
import burger from '../assets/icons/burger.svg'
import burgerOrange from '../assets/icons/burgerOrange.svg'
import SideBar from 'common/components/SideBar/SideBar';
import {themeSelector} from 'features/theme/themeSelectors';
import {useWindowHeight} from 'common/hooks/useWindowHeight';

const Pages = () => {
    const [isShowed, setIsShowed] = useState(false)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const theme = useAppSelector(themeSelector)
    const dispatch = useAppDispatch()

    const height = window.innerHeight-60
    const width = window.innerWidth

    const todolists = useAppSelector(state => state.todolists)

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchTodosTC())
    }, [])

    useEffect(()=>{
        if (width>700) setIsShowed(true)
    }, [width])

    return (
        <div className={s.container}>
            {isLoggedIn && <><SideBar todolists={todolists} isShowed={isShowed} setShowed={setIsShowed}/>
                <button className={s.noBtn} style={{position: 'absolute', top: '15px', left: '20px', zIndex: '200'}}
                        onClick={() => setIsShowed(!isShowed)}>
                    <img src={theme === 'dark' ? burger : burgerOrange} alt={'show/hide'}/>
                </button>
            </>}
            <div className={s.main} style={{height}}>
                <Routes>
                    <Route path={PATH.LOGIN} element={<Login/>}/>
                    <Route element={<RequireAuth/>}>
                        <Route path={PATH.TASKS} element={<TasksList/>}/>
                        <Route path={PATH.MAIN} element={<Greetings/>}/>
                        <Route path={'/'} element={<Navigate to={PATH.MAIN}/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default Pages;