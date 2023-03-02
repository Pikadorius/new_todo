import React, {createRef, FC, KeyboardEvent} from 'react';

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
        <div>
            <input type={'text'} ref={inputRef} onKeyDown={onEnterHandler}/>
            <button onClick={addItem}>Add item</button>
        </div>
    );
};

export default AddItemForm;