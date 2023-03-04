import React, {useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import RequireAuth from "pages/RequireAuth";
import TasksList from "features/tasks/TasksList/TasksList";
import Login from "features/auth/Login/Login";
import SideBar from 'common/components/SideBar/SideBar';
import Greetings from 'common/components/Greetings/Greetings';
import {useAppSelector} from 'common/hooks/hooks';

const Pages = () => {
    const [isShowed, setIsShowed] = useState(false)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const style = {
        position: 'sticky'
    }

    return (
        <>
            {isLoggedIn && isShowed && <SideBar/>}
            <button style={{position: 'absolute', bottom: '0', right: '0'}} onClick={() => setIsShowed(!isShowed)}>Show</button>
            <Routes>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route element={<RequireAuth/>}>
                    <Route path={PATH.TASKS} element={<TasksList/>}/>
                    <Route path={PATH.MAIN} element={<Greetings/>}/>
                    <Route path={'/'} element={<Navigate to={PATH.MAIN}/>}/>
                </Route>
            </Routes>
        </>
    );
};

export default Pages;