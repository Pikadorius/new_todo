import React from 'react';
import Portal from 'common/components/Portal/Portal';
import s from './Modal.module.css'
import ModalVariants from 'common/components/Modal/ModalVariants/ModalVariants';

const ModalWrapper = () => {
    return (
        <Portal>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <ModalVariants/>
                </div>
            </div>
        </Portal>
    );
};

export default ModalWrapper