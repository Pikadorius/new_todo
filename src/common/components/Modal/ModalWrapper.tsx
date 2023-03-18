import React, {KeyboardEvent} from 'react';
import Portal from 'common/components/Portal/Portal';
import s from 'common/components/Modal/ModalWrapper.module.css'
import ModalVariants from 'common/components/Modal/ModalVariants/ModalVariants';
import {useAppDispatch} from 'common/hooks/hooks';
import {setModalType} from 'app/appSlice';

const ModalWrapper = () => {

    const escHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') dispatch(setModalType('idle'))
    }

    const dispatch = useAppDispatch()

    const closeHandler = () => {
        dispatch(setModalType('idle'))
    }
    return (
        <Portal>
            <div className={s.container} onClick={closeHandler} onKeyDown={escHandler} tabIndex={-1}>
                <div className={s.wrapper} onClick={(e) => e.stopPropagation()}>
                    <ModalVariants/>
                </div>
            </div>
        </Portal>
    );
};

export default ModalWrapper