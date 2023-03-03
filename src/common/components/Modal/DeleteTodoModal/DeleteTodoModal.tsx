import React, {FC} from 'react';
import {TodolistDomainType} from 'features/todolists/todolistsTypes';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import common from 'common/components/Modal/CommonModals.module.scss'

type Props = {
    item: TodolistDomainType
}
const DeleteTodoModal: FC<Props> = ({item}) => {
    return (
        <>
            <ModalHeader title={'Delete todolist'}/>
            <div className={common.modalBody}>Do you really want to delete {item.title}?</div>
            <ModalFooter type={'todo'} todo={item} title={'Delete'}/>
        </>
    );
};

export default DeleteTodoModal;