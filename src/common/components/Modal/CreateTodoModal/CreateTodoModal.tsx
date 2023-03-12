import React, {createRef, KeyboardEvent, useState} from 'react';
import ModalHeader from 'common/components/Modal/components/ModalHeader/ModalHeader';
import {createTodoTC} from 'features/todolists/todolistsSlice';
import {useAppDispatch} from 'common/hooks/hooks';
import ModalFooter from 'common/components/Modal/components/ModalFooter/ModalFooter';
import s from './CreateTodoModal.module.scss'
import common from 'common/components/Modal/CommonModals.module.scss'
import {setModalType} from 'app/appSlice';
import {useTranslation} from 'react-i18next';

const CreateTodoModal = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const inputRef = createRef<HTMLInputElement>()
    const [error, setError] = useState<string | null>(null)
    const addTodo = () => {
        if (inputRef.current && inputRef.current.value !== '') {
            dispatch(createTodoTC(inputRef.current.value)).then(()=>{
                dispatch(setModalType('idle'))
            })
            inputRef.current.value = ''
            error && setError("")
        } else setError(t("modal.required"))
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTodo()
        }
    }

    return (
        <>
            <ModalHeader title={t("modal.create_todo.header")}/>
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
            <ModalFooter type={'todo'} title={t("modal.create_btn")} callback={addTodo}/>
        </>
    );
};

export default CreateTodoModal;