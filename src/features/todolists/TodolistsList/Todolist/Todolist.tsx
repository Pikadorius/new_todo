import React, {FC} from 'react';
import {TodolistDomainType} from "features/todolists/todolistsTypes";
import {useNavigate} from "react-router-dom";
import {PATH} from "common/constants/PATH";


const Todolist: FC<TodolistDomainType> = ({id, title, status}) => {
    const navigate = useNavigate()

    return (
        <div onClick={()=>navigate(`${PATH.TODOLISTS}/${id}`)}>
            {title}
        </div>
    );
};

export default Todolist;