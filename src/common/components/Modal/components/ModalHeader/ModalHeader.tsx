import React, {FC} from 'react';
import {useAppDispatch} from 'common/hooks/hooks';
import { setModalType} from 'app/appSlice';
import common from '../../CommonModals.module.css'

type HeaderType = {
    title: string
}
const ModalHeader:FC<HeaderType> = ({title}) => {
    const dispatch = useAppDispatch()

    const onClose = () => {
        dispatch(setModalType('idle'))
    }

    return (
        <div className={common.modalHeader}>
            {title}
            <button onClick={onClose}>x</button>
        </div>
    );
};

export default ModalHeader;