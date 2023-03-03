import React, {FC} from 'react';
import {TaskDomainType} from "features/tasks/tasksTypes";
import {useAppDispatch} from "common/hooks/hooks";
import {deleteTaskTC} from "features/tasks/tasksSlice";
import {setModalTask, setModalType} from 'app/appSlice';

const Task:FC<TaskDomainType> = (props) => {
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        dispatch(setModalType('deleteTask'))
        dispatch(setModalTask(props))
    }
    return (
        <div>
            <input type={'checkbox'} checked={props.status===1}/>
            <span>{props.title}</span>
            <button onClick={deleteHandler}>x</button>
        </div>
    );
};

export default Task;