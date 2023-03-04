import React, {FC} from 'react';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import {TaskDomainType} from 'features/tasks/tasksTypes';
import common from 'common/components/Modal/CommonModals.module.scss'


type Props = {
    item: TaskDomainType
}
const DeleteTodoModal: FC<Props> = ({item}) => {
    return (
        <>
            <ModalHeader title={'Delete task'}/>
            <div className={common.modalBody}>Do you really want to delete {item.title}?</div>
            <ModalFooter type={'task'} task={item} title={'Delete'}/>
        </>
    );
};

export default DeleteTodoModal;