import React, {useEffect} from 'react';
import 'app/App.scss';
import Pages from "pages/Pages";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import Loader from "common/components/Loader/Loader";
import {authMeTC} from "features/auth/authSlice";
import Header from "common/components/Header/Header";
import ModalWrapper from 'common/components/Modal/ModalWrapper';
import InfoPopUp from 'common/components/InfoPopUp/InfoPopUp';
import {appErrorSelector, appStatusSelector, isInitializedSelector, modalTypeSelector} from 'app/appSelectors';

function App() {

    const isInitialized = useAppSelector(isInitializedSelector)
    const isAppLoading = useAppSelector(appStatusSelector) === 'loading'
    const isModalOpen = useAppSelector(modalTypeSelector) !== 'idle'
    const isInfoPopUpOpen = useAppSelector(appErrorSelector) !== ''
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
            {isInfoPopUpOpen && <InfoPopUp/>}
        </div>
    );
}

export default App;
