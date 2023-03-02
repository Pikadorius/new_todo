import React, {createRef, FC } from 'react';

type PropsType = {
    callback: (value: string) => void
}

const AddItemForm:FC<PropsType> = ({callback}) => {
    const inputRef = createRef<HTMLInputElement>()

    const addItem = () => {
        if(inputRef.current && inputRef.current.value!=='') {
            callback(inputRef.current.value)
            inputRef.current.value=''
        }
    }

    return (
        <div>
            <input type={'text'} ref={inputRef} />
            <button onClick={addItem}>Add item</button>
        </div>
    );
};

export default AddItemForm;