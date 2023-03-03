import React, {createRef, FC, KeyboardEvent, useState} from 'react';
import s from './AddItemForm.module.css'

type PropsType = {
    value: string
    callback: (value: string) => void
}

const AddItemForm: FC<PropsType> = ({callback, value}) => {
    const inputRef = createRef<HTMLInputElement>()
    const [error, setError] = useState('')

    const addItem = () => {
        if (inputRef.current && inputRef.current.value !== '') {
            callback(inputRef.current.value)
            inputRef.current.value = ''
            error && setError("")
        } else setError('Required field')
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <>
            <div className={s.container}>
                <input type={'text'} ref={inputRef} onKeyDown={onEnterHandler}/>
                <button onClick={addItem}>Add item</button>
                {error && <div className={s.error}>{error}</div>}
            </div>
        </>
    );
};

export default AddItemForm;