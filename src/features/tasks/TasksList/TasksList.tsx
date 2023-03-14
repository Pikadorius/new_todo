import React, {useEffect, useMemo} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {fetchTasksTC} from "features/tasks/tasksSlice";
import Task from "features/tasks/TasksList/Task/Task";
import {PATH} from 'common/constants/PATH';
import s from 'features/tasks/TasksList/TasksList.module.scss'
import back from 'assets/icons/goBack.svg'
import backBlack from 'assets/icons/goBackBlack.svg'
import {useTranslation} from 'react-i18next';
import {themeSelector} from 'features/theme/themeSelectors';
import 'common/styles/mixins.scss'


const TasksList = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)
    const theme = useAppSelector(themeSelector)
    const navigate = useNavigate()
    const {t} = useTranslation()

    const active = useMemo(() => tasks.filter(t => t.status === 0), [tasks])
    const inProgress = useMemo(() => tasks.filter(t => t.status === 1), [tasks])
    const completed = useMemo(() => tasks.filter(t => t.status === 2), [tasks])


    useEffect(() => {
        if (!id) return
        dispatch(fetchTasksTC(id))
    }, [id])


    const backHandler = () => {
        navigate(PATH.MAIN)
    }


    return (
        <div className={s.container}>
            <button className={`${s.backBnt} ${s.noBtn}`} onClick={backHandler}><img src={theme==='dark' ? back : backBlack} alt={'go back'}/>{t("tasks.main")}
            </button>
            {tasks.length === 0 ? <EmptyBlock/> : <div className={s.tasks}>
                <div className={s.activeTasks}>
                    <h3 className={s.activeTitle}>{t("tasks.active")}</h3>
                    {active.map(t => <Task key={t.id} {...t} taskStatus={'active'}/>)}
                </div>
                <div className={s.inProgressTasks}>
                    <h3 className={theme==='dark' ? s.inProgressTitle : s.lightInProgress}>{t("tasks.in_progress")}</h3>
                    {inProgress.map(t => <Task key={t.id} {...t} taskStatus={'inProgress'}/>)}
                </div>
                <div className={s.completedTasks}>
                    <h3 className={s.completedTitle}>{t("tasks.completed")}</h3>
                    {completed.map(t => <Task key={t.id} {...t} taskStatus={'completed'}/>)}
                </div>
            </div>}
        </div>
    );
};

export default TasksList;

const EmptyBlock = () => {
    const {t}=useTranslation()
    return (
        <div className={s.emptyBlock}>
            <h2>{t("tasks.empty")}</h2>
            <p>{t("tasks.fill_todo")}</p>
        </div>
    )
}