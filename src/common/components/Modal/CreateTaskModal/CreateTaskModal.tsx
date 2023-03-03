import React, {createRef, KeyboardEvent, useState} from 'react';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import s from 'common/components/AddItemForm/AddItemForm.module.css';
import {setModalType} from 'app/appSlice';
import {createTaskTC} from 'features/tasks/tasksSlice';
import common from 'common/components/Modal/CommonModals.module.css'

const CreateTodoModal = () => {
    const dispatch = useAppDispatch()
    const todolist = useAppSelector(state=>state.app.modalTodo)
    const inputRef = createRef<HTMLInputElement>()
    const [error, setError] = useState('')
    const addTask = () => {
        if (inputRef.current && inputRef.current.value !== '') {
            dispatch(createTaskTC({id:todolist.id, title:inputRef.current.value})).then(()=>{
                dispatch(setModalType('idle'))
            })
            inputRef.current.value = ''
            error && setError("")
        } else setError('Required field')
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <>
            <ModalHeader title={'Create task?'}/>
            <div className={common.modalBody}>
                <div>Write task title:</div>
                <div>
                    <input autoFocus type={'text'} ref={inputRef} onKeyDown={onEnterHandler}/>
                    {error && <div className={s.error}>{error}</div>}
                </div>
            </div>
            <ModalFooter type={'todo'} title={'Create'} callback={addTask}/>
        </>
    );
};

export default CreateTodoModal;