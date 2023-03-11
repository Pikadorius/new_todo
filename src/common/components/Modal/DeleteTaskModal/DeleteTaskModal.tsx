import React, {FC} from 'react';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import common from 'common/components/Modal/CommonModals.module.scss'
import {TaskType} from 'features/tasks/tasksTypes';
import {useTranslation} from 'react-i18next';


type Props = {
    item: TaskType
}
const DeleteTodoModal: FC<Props> = ({item}) => {
    const {t} = useTranslation()
    return (
        <>
            <ModalHeader title={t("modal.delete_task.header")}/>
            <div className={common.modalBody}>{t("modal.delete_body")} {item.title}?</div>
            <ModalFooter type={'task'} task={item} title={t("modal.delete_btn")}/>
        </>
    );
};

export default DeleteTodoModal;