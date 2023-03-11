import React from 'react';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import {setModalType} from 'app/appSlice';
import {updateTaskTC} from 'features/tasks/tasksSlice';
import s from './UpdateTaskModal.module.scss'
import common from 'common/components/Modal/CommonModals.module.scss'
import {SubmitHandler, useForm} from 'react-hook-form';
import {UpdateTaskType} from 'features/tasks/tasksTypes';
import {useTranslation} from 'react-i18next';

const UpdateTaskModal = () => {
    const dispatch = useAppDispatch()
    const task = useAppSelector(state => state.app.modalTask)
    const {t} = useTranslation()


    const {register, handleSubmit, formState: {errors}} = useForm<Partial<UpdateTaskType>>({
        mode: 'onTouched',
        defaultValues: {
            title: task.title,
            description: task.description,
            status: task.status
        }
    },);
    const onSubmit: SubmitHandler<Partial<UpdateTaskType>> = data => {
        dispatch(updateTaskTC({todoId: task.todoListId, taskId: task.id, newTask: data})).then(() => {
            dispatch(setModalType('idle'))
        })
    }

    return (
        <>
            <ModalHeader title={t("modal.update_task.header")}/>
            <div className={common.modalBody}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <div className={s.field}>
                        <span className={s.fieldName}>{t("modal.update_task.title")}</span>
                        <input autoFocus type={'text'} {...register("title", {required: true})} />
                        {errors.title && <span className={s.errorField}>This field is required</span>}
                    </div>
                    <div className={s.field}>
                        <span className={s.fieldName}>{t("modal.update_task.description")}</span>
                        <textarea rows={3} {...register("description")}/>
                    </div>
                    <div className={s.field}>
                        <span className={s.fieldName}>{t("modal.update_task.status")}</span>
                        <select {...register("status")} >
                            <option value={0}>{t("modal.active")}</option>
                            <option value={1}>{t("modal.in_progress")}</option>
                            <option value={2}>{t("modal.completed")}</option>
                        </select>
                    </div>
                </form>
            </div>
            <ModalFooter type={'todo'} title={t("modal.update_btn")} callback={handleSubmit(onSubmit)}/>
        </>
    );
};

export default UpdateTaskModal;