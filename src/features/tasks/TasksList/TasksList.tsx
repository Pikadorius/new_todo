import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {createTaskTC, fetchTasksTC} from "features/tasks/tasksSlice";
import Task from "features/tasks/TasksList/Task/Task";
import AddItemForm from "common/components/AddItemForm/AddItemForm";
import {PATH} from 'common/constants/PATH';
import s from './TasksList.module.css'

const TasksList = () => {
    const {id} = useParams<{ id: string }>()
    console.log(id)
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return
        dispatch(fetchTasksTC(id))
    }, [])

    const addTask = (title: string) => {
        id && dispatch(createTaskTC({id, title}))
    }

    return (
        <>
            <button className={s.backBnt} onClick={() => navigate(PATH.TODOLISTS)}>Go back</button>
            <div>
                {tasks.map(t => <Task key={t.id} {...t}/>)}
            </div>
        </>
    );
};

export default TasksList;