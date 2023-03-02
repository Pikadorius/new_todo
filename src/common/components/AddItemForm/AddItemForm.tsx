import React, {createRef, FC, KeyboardEvent} from 'react';
import s from './AddItemForm.module.css'

type PropsType = {
    callback: (value: string) => void
}

const AddItemForm: FC<PropsType> = ({callback}) => {
    const inputRef = createRef<HTMLInputElement>()

    const addItem = () => {
        if (inputRef.current && inputRef.current.value !== '') {
            callback(inputRef.current.value)
            inputRef.current.value = ''
        }
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div className={s.container}>
            <input type={'text'} ref={inputRef} onKeyDown={onEnterHandler}/>
            <button onClick={addItem}>Add item</button>
        </div>
    );
};

export default AddItemForm;