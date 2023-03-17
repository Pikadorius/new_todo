import React, {useEffect, useMemo, useState} from 'react';
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
import {useWindowSize} from "common/hooks/useWindowSize";
import {setModalType} from 'app/appSlice';
import addMain from 'assets/icons/addMain.svg';
import addOrange from 'assets/icons/addOrange.svg';


const TasksList = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)
    const todoTitle = useAppSelector(state => state.todolists.find(t => t.id === id))
    const theme = useAppSelector(themeSelector)
    const navigate = useNavigate()
    const {t} = useTranslation()

    const active = useMemo(() => tasks.filter(t => t.status === 0), [tasks])
    const inProgress = useMemo(() => tasks.filter(t => t.status === 1), [tasks])
    const completed = useMemo(() => tasks.filter(t => t.status === 2), [tasks])
    const [showTasks, setTasks] = useState<'all' | 'active' | 'inProgress' | 'completed'>('all')

    const width = useWindowSize()

    const addTask = () => {
        dispatch(setModalType('createTask'))
    }

    const backHandler = () => {
        navigate(PATH.MAIN)
    }

    const setActive = () => {
        setTasks('active')
    }
    const setInProgress = () => {
        setTasks('inProgress')
    }
    const setCompleted = () => {
        setTasks('completed')
    }


    useEffect(() => {
        if (!id) return
        dispatch(fetchTasksTC(id))
    }, [id])

    useEffect(() => {
        if (width > 700) setTasks('all')
        else setTasks('active')
    }, [width])


    return (
        <div className={theme === 'dark' ? s.container : `${s.light} ${s.container}`}>
            <button className={`${s.backBnt} ${s.noBtn}`}
                    onClick={backHandler}>
                <img src={theme === 'dark' ? back : backBlack} alt={'go back'}/>
                {t("tasks.main")}
            </button>
            <div className={s.tasksHeader}>
                <h2 className={s.todoTitle}>
                    {todoTitle && todoTitle.title}
                </h2>
                <button className={s.noBtn}
                        title={'Add new task'}
                        onClick={addTask}>
                    <img src={theme === 'dark' ? addMain : addOrange} alt={'add'}/>
                </button>
            </div>
            {tasks.length === 0 ? <EmptyBlock/> : <div className={s.tasks}>
                <div className={s.buttonGroup}>
                    <button className={showTasks === 'active' ? `${s.btn} + ${s.activeBtn}` : s.btn}
                            onClick={setActive}>{t('tasks.active')}: {active.length}</button>
                    <button className={showTasks === 'inProgress' ? `${s.btn} + ${s.activeBtn}` : s.btn}
                            onClick={setInProgress}>{t('tasks.in_progress')}: {inProgress.length}</button>
                    <button className={showTasks === 'completed' ? `${s.btn} + ${s.activeBtn}` : s.btn}
                            onClick={setCompleted}>{t('tasks.completed')}: {completed.length}</button>
                </div>
                {showTasks !== 'inProgress' && showTasks !== 'completed' && <>
                    <div className={s.activeTasks}>
                        <h3 className={s.activeTitle}>{t("tasks.active")}</h3>
                        {active.map(t => <Task key={t.id} {...t} taskStatus={'active'}/>)}
                    </div>
                </>}
                {showTasks !== 'completed' && showTasks !== 'active' && <>
                    <div className={s.inProgressTasks}>
                        <h3 className={theme === 'dark' ? s.inProgressTitle : s.lightInProgress}>{t("tasks.in_progress")}</h3>
                        {inProgress.map(t => <Task key={t.id} {...t} taskStatus={'inProgress'}/>)}
                    </div>
                </>}
                {showTasks !== 'active' && showTasks !== 'inProgress' && <>
                    <div className={s.completedTasks}>
                        <h3 className={s.completedTitle}>{t("tasks.completed")}</h3>
                        {completed.map(t => <Task key={t.id} {...t} taskStatus={'completed'}/>)}
                    </div>
                </>}
            </div>}
        </div>
    );
};

export default TasksList;

const EmptyBlock = () => {
    const {t} = useTranslation()
    return (
        <div className={s.emptyBlock}>
            <h2>{t("tasks.empty")}</h2>
            <p>{t("tasks.fill_todo")}</p>
        </div>
    )
}