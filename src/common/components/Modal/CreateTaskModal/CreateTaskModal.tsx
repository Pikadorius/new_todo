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

const CreateTodoModal = () => {
    const dispatch = useAppDispatch()
    const id = useLocation().pathname.slice(6)
    const todolist = useAppSelector(state => state.todolists.find(t => t.id === id))

    const {register, handleSubmit, formState: {errors}} = useForm<Partial<UpdateTaskType>>({
        mode: 'onBlur'
    });
    const onSubmit: SubmitHandler<Partial<UpdateTaskType>> = data => {
        if (todolist && data.title)
            dispatch(createTaskTC({id: todolist.id, title: data.title, description: data.description || '', status: data.status || 0})).then(() => {
                dispatch(setModalType('idle'))
            })
    }

    return (
        <>
            <ModalHeader title={'Create task'}/>
            <div className={common.modalBody}>
                <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                    <div className={s.field}>
                        <span className={s.fieldName}>Title:</span>
                        < input type={'text'} {...register("title", {required: true})} />
                        {errors.title && <span className={s.errorField}>This field is required</span>}
                    </div>
                    <div className={s.field}>
                        <span className={s.fieldName}>Description:</span>
                        <input type={'text'} {...register("description")}/>
                    </div>
                    <select {...register("status")} >
                        <option value='0'>Active</option>
                        <option value="1">In progress</option>
                        <option value="2">Completed</option>
                    </select>
                </form>
            </div>
            <ModalFooter type={'todo'} title={'Create'} callback={handleSubmit(onSubmit)}/>
        </>
    );
};

export default CreateTodoModal;