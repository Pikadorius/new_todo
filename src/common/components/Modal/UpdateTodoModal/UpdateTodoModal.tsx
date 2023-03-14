import React, {createRef, KeyboardEvent, useEffect, useState} from 'react';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import {updateTodoTC} from 'features/todolists/todolistsSlice';
import {useAppDispatch, useAppSelector} from 'common/hooks/hooks';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import common from 'common/components/Modal/CommonModals.module.scss'
import {setModalType} from 'app/appSlice';
import s from './UpdateTodoModal.module.scss'
import {useTranslation} from 'react-i18next';

const UpdateTodoModal = () => {
    const dispatch = useAppDispatch()
    const todo = useAppSelector(state => state.app.modalTodo)
    const inputRef = createRef<HTMLInputElement>()
    const {t} = useTranslation()

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = todo.title
        }
    }, [])


    const [error, setError] = useState<string | null>(null)
    const updateTodo = () => {
        if (inputRef.current && inputRef.current.value.trim() !== '') {
            dispatch(updateTodoTC({todoId: todo.id, title: inputRef.current.value})).then(() => {
                dispatch(setModalType('idle'))
            })
            inputRef.current.value = ''
            error && setError("")
        } else setError(t("modal.required"))
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateTodo()
        }
    }

    return (
        <>
            <ModalHeader title={t("modal.update_todo.header")}/>
            <div className={common.modalBody}>
                <div className={s.container}>
                    <div className={s.field}>
                        <div className={s.fieldName}>{t("modal.update_todo.body")}</div>
                        <input autoFocus type={'text'} ref={inputRef} onKeyDown={onEnterHandler}
                               className={s.input}/>
                        {error && <div className={s.errorField}>{error}</div>}
                    </div>
                </div>
            </div>
            <ModalFooter type={'todo'} title={t("modal.update_btn")} callback={updateTodo}/>
        </>
    );
};

export default UpdateTodoModal