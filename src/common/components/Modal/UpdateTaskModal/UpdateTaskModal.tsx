import React, {createRef, KeyboardEvent, useEffect, useState} from 'react';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import common from 'common/components/Modal/CommonModals.module.scss'
import {setModalType} from 'app/appSlice';
import s from './UpdateTaskModal.module.scss'
import {updateTaskTC} from 'features/tasks/tasksSlice';

const UpdateTaskModal = () => {
    const dispatch = useAppDispatch()
    const task = useAppSelector(state => state.app.modalTask)
    const inputRef = createRef<HTMLInputElement>()

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = task.title
        }
    }, [])


    const [error, setError] = useState('')
    const updateTask = () => {
        if (inputRef.current && inputRef.current.value !== '') {
            dispatch(updateTaskTC({todoId: task.todoListId, taskId:task.id, newTask: {title: inputRef.current.value}})).then(() => {
                dispatch(setModalType('idle'))
            })
            inputRef.current.value = ''
            error && setError("")
        } else setError('Required field')
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateTask()
        }
    }

    return (
        <>
            <ModalHeader title={'Change task'}/>
            <div className={common.modalBody}>
                <div>Write task new title:</div>
                <div>
                    <input autoFocus type={'text'} ref={inputRef} onKeyDown={onEnterHandler}/>
                    {error && <div className={s.error}>{error}</div>}
                </div>
            </div>
            <ModalFooter type={'task'} title={'Save'} callback={updateTask}/>
        </>
    );
};

export default UpdateTaskModal