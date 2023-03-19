import React, {KeyboardEvent, useEffect} from 'react';
import Portal from 'common/components/Portal/Portal';
import s from 'common/components/Modal/ModalWrapper.module.css'
import ModalVariants from 'common/components/Modal/ModalVariants/ModalVariants';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import {setModalType} from 'app/appSlice';
import {modalTypeSelector} from 'app/appSelectors';

const ModalWrapper = () => {
    const modal = useAppSelector(modalTypeSelector) === 'idle'
    const dispatch = useAppDispatch()

    let listener = (e: any) => {
        if (e.key === 'Escape' && !modal) {
            closeHandler()
        }
    }

    useEffect(()=>{
        document.addEventListener('keydown', listener)
        return ()=>{
            document.removeEventListener('keydown', listener)
        }
    },[])

    const closeHandler = () => {
        dispatch(setModalType('idle'))
        document.removeEventListener('keydown', listener)
    }

    return (
        <Portal>
            <div className={s.container} onClick={closeHandler} id={'modal'}>
                <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                    <ModalVariants/>
                </div>
            </div>
        </Portal>
    );
};

export default ModalWrapper