import React from 'react';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import {setModalType} from 'app/appSlice';
import {createTaskTC} from 'features/tasks/tasksSlice';
import s from './CreateTaskModal.module.scss'
import common from 'common/components/Modal/CommonModals.module.scss'
import {useLocation} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import {UpdateTaskType} from 'features/tasks/tasksTypes';
import {useTranslation} from 'react-i18next';

const CreateTodoModal = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const id = useLocation().pathname.slice(6)
    const todolist = useAppSelector(state => state.todolists.find(t => t.id === id))

    const {register, handleSubmit, formState: {errors}} = useForm<Partial<UpdateTaskType>>({
        mode: 'onTouched'
    });
    const onSubmit: SubmitHandler<Partial<UpdateTaskType>> = data => {
        if (todolist && data.title)
            dispatch(createTaskTC({
                id: todolist.id,
                title: data.title,
                description: data.description || '',
                status: data.status || 0
            })).then(() => {
                dispatch(setModalType('idle'))
            })
    }

    return (
        <>
            <ModalHeader title={t("modal.create_task.header")}/>
            <div className={common.modalBody}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <div className={s.field}>
                        <div className={s.fieldName}>{t("modal.create_task.title")}</div>
                        < input autoFocus type={'text'} {...register("title", {required: true})} className={s.input}/>
                        {errors.title && <span className={s.errorField}>{t("modal.required")}</span>}
                    </div>
                    <div className={s.field}>
                        <div className={s.fieldName}>{t("modal.create_task.description")}</div>
                        <textarea rows={3} {...register("description")} className={s.textarea}/>
                    </div>
                    <div className={s.field}>
                        <div className={s.fieldName}>{t("modal.create_task.status")}</div>
                        <select {...register("status")} className={s.select}>
                            <option value='0'>{t("modal.active")}</option>
                            <option value="1">{t("modal.in_progress")}</option>
                            <option value="2">{t("modal.completed")}</option>
                        </select>
                    </div>
                </form>
            </div>
            <ModalFooter type={'todo'} title={t("modal.create_btn")} callback={handleSubmit(onSubmit)}/>
        </>
    );
};

export default CreateTodoModal;