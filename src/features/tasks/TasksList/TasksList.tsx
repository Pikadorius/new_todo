import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {fetchTasksTC} from "features/tasks/tasksSlice";
import Task from "features/tasks/TasksList/Task/Task";
import {PATH} from 'common/constants/PATH';
import s from 'features/tasks/TasksList/TasksList.module.scss'
import back from '../../../assets/icons/goBack.svg'

const TasksList = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return
        dispatch(fetchTasksTC(id))
    }, [id])

    const backHandler = () => {
        // dispatch(setAppPage('Todolist App'))
        navigate(PATH.MAIN)
    }


    return (
        <div className={s.container}>
            <button className={`${s.backBnt} ${s.noBtn}`} onClick={backHandler}><img src={back} alt={'go back'}/>To main</button>
            <div>
                {tasks.map(t => <Task key={t.id} {...t}/>)}
            </div>
        </div>
    );
};

export default TasksList;