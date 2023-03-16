import React, { useLayoutEffect} from 'react';
import s from './App.module.scss'
import Pages from "pages/Pages";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import Loader from "common/components/Loader/Loader";
import {authMeTC} from "features/auth/authSlice";
import Header from "common/components/Header/Header";
import ModalWrapper from 'common/components/Modal/ModalWrapper';
import InfoPopUp from 'common/components/InfoPopUp/InfoPopUp';
import {appErrorSelector, appStatusSelector, isInitializedSelector, modalTypeSelector} from 'app/appSelectors';
import {themeSelector} from 'features/theme/themeSelectors';
import {isLoggedSelector} from 'features/auth/authSelectors';

function App() {

    const theme = useAppSelector(themeSelector)
    const isInitialized = useAppSelector(isInitializedSelector)
    const isAppLoading = useAppSelector(appStatusSelector) === 'loading'
    const isModalOpen = useAppSelector(modalTypeSelector) !== 'idle'
    const isInfoPopUpOpen = useAppSelector(appErrorSelector) !== ''
    const isLoggedIn = useAppSelector(isLoggedSelector)
    const dispatch = useAppDispatch()


    useLayoutEffect(() => {
        !isLoggedIn && dispatch(authMeTC())
    }, [])

    if (!isInitialized) {
        return <Loader/>
    }

    return (
            <div className={theme==='dark' ? s.App : `${s.App} ${s.light}`}>
                <Header/>
                <Pages/>
                {isAppLoading && <Loader/>}
                {isModalOpen && <ModalWrapper/>}
                {isInfoPopUpOpen && <InfoPopUp/>}
            </div>
    );
}

export default App;
