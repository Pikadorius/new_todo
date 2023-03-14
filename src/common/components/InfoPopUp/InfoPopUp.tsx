import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import s from './InfoPopUp.module.scss'
import Portal from 'common/components/Portal/Portal';
import {setAppError} from 'app/appSlice';
import closeIcon from 'assets/icons/close.svg';
import {appErrorSelector} from 'app/appSelectors';
import {themeSelector} from 'features/theme/themeSelectors';

const InfoPopUp = () => {
    const appInfo = useAppSelector(appErrorSelector)
    const dispatch = useAppDispatch()
    const theme = useAppSelector(themeSelector)

    const closeHandler = () => {
        dispatch(setAppError(''))
    }

    useEffect(() => {
        const timeId = setTimeout(() => {
            dispatch(setAppError(''))
        }, 3000)
        return () => clearTimeout(timeId)
    }, [])

    return (
        <Portal>
            <div className={theme === 'dark' ? s.container : `${s.container} ${s.light}`}>
                <div className={s.infoField}>{appInfo}</div>
                <div className={s.bntField}>
                    <button onClick={closeHandler} className={s.noBtn}><img src={closeIcon} alt={'Close'}/></button>
                </div>
            </div>
        </Portal>
    );
};

export default InfoPopUp;