import React, {FC} from 'react';

type BodyType = {
    title: string
}
const ModalBody:FC<BodyType> = ({title}) => {
    return (
        <div>
            Do you really want to delete {title}?
        </div>
    );
};

export default ModalBody;