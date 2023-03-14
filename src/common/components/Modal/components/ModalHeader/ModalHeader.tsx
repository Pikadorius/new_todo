import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import { setModalType} from 'app/appSlice';
import common from 'common/components/Modal/CommonModals.module.scss'
import s from './ModalHeader.module.scss'
import closeIcon from 'assets/icons/close.svg'
import {themeSelector} from 'features/theme/themeSelectors';

type HeaderType = {
    title: string
}
const ModalHeader:FC<HeaderType> = ({title}) => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(themeSelector)

    const onClose = () => {
        dispatch(setModalType('idle'))
    }

    return (
        <div className={theme==='dark' ? common.modalHeader : `${common.modalHeader} ${common.light}`}>
            {title}
            <button onClick={onClose} className={s.noBtn}><img src={closeIcon} alt={'Close'}/></button>
        </div>
    );
};

export default ModalHeader;