import React, {createRef, KeyboardEvent, useState} from 'react';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import {createTodoTC} from 'features/todolists/todolistsSlice';
import {useAppDispatch} from 'common/hooks/hooks';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import s from './CreateTodoModal.module.scss'
import common from 'common/components/Modal/CommonModals.module.scss'
import {setModalType} from 'app/appSlice';

const CreateTodoModal = () => {
    const dispatch = useAppDispatch()
    const inputRef = createRef<HTMLInputElement>()
    const [error, setError] = useState('')
    const addTodo = () => {
        if (inputRef.current && inputRef.current.value !== '') {
            dispatch(createTodoTC(inputRef.current.value)).then(()=>{
                dispatch(setModalType('idle'))
            })
            inputRef.current.value = ''
            error && setError("")
        } else setError('Required field')
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTodo()
        }
    }

    return (
        <>
            <ModalHeader title={'Create todolist'}/>
            <div className={common.modalBody}>
                <div>Write todolist title:</div>
                <div>
                    <input autoFocus type={'text'} ref={inputRef} onKeyDown={onEnterHandler}/>
                    {error && <div className={s.error}>{error}</div>}
                </div>
            </div>
            <ModalFooter type={'todo'} title={'Create'} callback={addTodo}/>
        </>
    );
};

export default CreateTodoModal;