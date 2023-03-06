import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {fetchTasksTC} from "features/tasks/tasksSlice";
import Task from "features/tasks/TasksList/Task/Task";
import {PATH} from 'common/constants/PATH';
import s from 'features/tasks/TasksList/TasksList.module.scss'
import back from '../../../assets/icons/goBack.svg'
import {TaskType} from 'features/tasks/tasksTypes';

type BoardType = {
    id:number
    title:string,
    items: TaskType[]
}

const TasksList = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)
    const navigate = useNavigate()

    const active = useMemo(() => tasks.filter(t => t.status === 0), [tasks])
    console.log(active)
    const inProgress = useMemo(() => tasks.filter(t => t.status === 1), [tasks])
    const completed = useMemo(() => tasks.filter(t => t.status === 2), [tasks])


    const [boards, setBoards] = useState<BoardType[]>([
        {id: 1, title: 'Active', items:active},
        {id: 2, title: 'In progress', items: inProgress},
        {id: 3, title: 'Completed', items: completed},
    ])
    console.log('Boards: ', boards)

    useEffect(() => {
        if (!id) return
        dispatch(fetchTasksTC(id))
    }, [id])

    const backHandler = () => {
        navigate(PATH.MAIN)
    }


    return (
        <div className={s.container}>
            <button className={`${s.backBnt} ${s.noBtn}`} onClick={backHandler}><img src={back} alt={'go back'}/>To main
            </button>
            {tasks.length === 0 ? <EmptyBlock/> : <div className={s.tasks}>
                <div className={s.activeTasks}>
                    <h3>Active</h3>
                    {active.map(t => <Task key={t.id} {...t} taskStatus={'active'}/>)}
                </div>
                <div className={s.inProgressTasks}>
                    <h3>In progress</h3>
                    {inProgress.map(t => <Task key={t.id} {...t} taskStatus={'inProgress'}/>)}
                </div>
                <div className={s.completedTasks}>
                    <h3>Completed</h3>
                    {completed.map(t => <Task key={t.id} {...t} taskStatus={'completed'}/>)}
                </div>
            </div>}

        </div>
    );
};

export default TasksList;

const EmptyBlock = () => {
    return (
        <div className={s.emptyBlock}>
            <h2>This todolist is empty!</h2>
            <p>You can create task or choose another todolist</p>
        </div>
    )
}