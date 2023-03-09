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

const UpdateTaskModal = () => {
    const dispatch = useAppDispatch()
    const task = useAppSelector(state => state.app.modalTask)


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
            <ModalHeader title={'Update task'}/>
            <div className={common.modalBody}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <div className={s.field}>
                        <span className={s.fieldName}>New title:</span>
                        <input autoFocus type={'text'} {...register("title", {required: true})} />
                        {errors.title && <span className={s.errorField}>This field is required</span>}
                    </div>
                    <div className={s.field}>
                        <span className={s.fieldName}>New description:</span>
                        <textarea rows={3} {...register("description")}/>
                    </div>
                    <select {...register("status")} >
                        <option value={0}>Active</option>
                        <option value={1}>In progress</option>
                        <option value={2}>Completed</option>
                    </select>
                </form>
            </div>
            <ModalFooter type={'todo'} title={'Save'} callback={handleSubmit(onSubmit)}/>
        </>
    );
};

export default UpdateTaskModal;