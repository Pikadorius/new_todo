import React, {createRef, KeyboardEvent, useEffect, useState} from 'react';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import {updateTodoTC} from 'features/todolists/todolistsSlice';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import common from 'common/components/Modal/CommonModals.module.scss'
import {setModalType} from 'app/appSlice';
import s from './UpdateTodoModal.module.scss'

const UpdateTodoModal = () => {
    const dispatch = useAppDispatch()
    const todo = useAppSelector(state => state.app.modalTodo)
    const inputRef = createRef<HTMLInputElement>()

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = todo.title
        }
    }, [])


    const [error, setError] = useState('')
    const updateTodo = () => {
        if (inputRef.current && inputRef.current.value !== '') {
            dispatch(updateTodoTC({todoId: todo.id, title: inputRef.current.value})).then(() => {
                dispatch(setModalType('idle'))
            })
            inputRef.current.value = ''
            error && setError("")
        } else setError('Required field')
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateTodo()
        }
    }

    return (
        <>
            <ModalHeader title={'Change todolist title'}/>
            <div className={common.modalBody}>
                <div>Write todolist new title:</div>
                <div>
                    <input autoFocus type={'text'} ref={inputRef} onKeyDown={onEnterHandler}/>
                    {error && <div className={s.error}>{error}</div>}
                </div>
            </div>
            <ModalFooter type={'todo'} title={'Save'} callback={updateTodo}/>
        </>
    );
};

export default UpdateTodoModal