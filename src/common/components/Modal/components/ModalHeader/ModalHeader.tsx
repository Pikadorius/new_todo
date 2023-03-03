import React, {FC} from 'react';
import {useAppDispatch} from 'common/hooks/hooks';
import { setModalType} from 'app/appSlice';
import common from 'common/components/Modal/CommonModals.module.scss'
import s from './ModalHeader.module.scss'
import closeIcon from 'assets/icons/close.svg'

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
            <button onClick={onClose} className={s.noBtn}><img src={closeIcon} alt={'Close'}/></button>
        </div>
    );
};

export default ModalHeader;