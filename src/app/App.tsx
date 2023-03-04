import React, {useEffect} from 'react';
import 'app/App.scss';
import Pages from "pages/Pages";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import Loader from "common/components/Loader/Loader";
import {authMeTC} from "features/auth/authSlice";
import Header from "common/components/Header/Header";
import ModalWrapper from 'common/components/Modal/ModalWrapper';

function App() {

    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isAppLoading = useAppSelector(state => state.app.status) === 'loading'
    const isModalOpen = useAppSelector(state => state.app.modal) !== 'idle'
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMeTC())
    }, [])

    if (!isInitialized) {
        return <Loader/>
    }

    return (
        <div className="App">
            <Header/>
            <Pages/>
            {isAppLoading && <Loader/>}
            {isModalOpen && <ModalWrapper/>}
        </div>
    );
}

export default App;
