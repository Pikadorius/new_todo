import React, {useEffect} from 'react';
import './App.css';
import Pages from "pages/Pages";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import Loader from "common/components/Loader/Loader";
import {authMeTC} from "features/auth/authSlice";
import Header from "common/components/Header/Header";

function App() {

    const isInitialized = useAppSelector(state=> state.app.isInitialized)
    const isAppLoading = useAppSelector(state => state.app.status)==='loading'
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(authMeTC())
    },[])

    if (!isInitialized) {
        return <Loader/>
    }

    return (
        <div className="App">
            <Header/>
            <Pages/>
            {isAppLoading && <Loader/>}
        </div>
    );
}

export default App;
