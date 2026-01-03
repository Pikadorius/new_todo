import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {fetchTasksTC, updateTaskTC} from "features/tasks/tasksSlice";
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
import {DragDropContext, Droppable, DropResult} from '@hello-pangea/dnd';
import {TASK_STATUSES} from 'features/tasks/tasksTypes';


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

    const onDragEnd = useCallback((result: DropResult) => {
        const {destination, source, draggableId} = result

        // Если нет места назначения или задача брошена в то же место
        if (!destination) return
        if (destination.droppableId === source.droppableId) return

        // Определяем новый статус на основе колонки назначения
        const statusMap: Record<string, TASK_STATUSES> = {
            'active': TASK_STATUSES.Active,
            'inProgress': TASK_STATUSES.InProgress,
            'completed': TASK_STATUSES.Completed
        }

        const newStatus = statusMap[destination.droppableId]
        if (newStatus === undefined || !id) return

        dispatch(updateTaskTC({
            todoId: id,
            taskId: draggableId,
            newTask: {status: newStatus}
        }))
    }, [dispatch, id])

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
            {tasks.length === 0 ? <EmptyBlock/> : <DragDropContext onDragEnd={onDragEnd}>
                <div className={s.tasks}>
                    <div className={s.buttonGroup}>
                        <button className={showTasks === 'active' ? `${s.btn} + ${s.activeBtn}` : s.btn}
                                onClick={setActive}>{t('tasks.active')}: {active.length}</button>
                        <button className={showTasks === 'inProgress' ? `${s.btn} + ${s.activeBtn}` : s.btn}
                                onClick={setInProgress}>{t('tasks.in_progress')}: {inProgress.length}</button>
                        <button className={showTasks === 'completed' ? `${s.btn} + ${s.activeBtn}` : s.btn}
                                onClick={setCompleted}>{t('tasks.completed')}: {completed.length}</button>
                    </div>
                    {showTasks !== 'inProgress' && showTasks !== 'completed' && (
                        <Droppable droppableId="active">
                            {(provided, snapshot) => (
                                <div
                                    className={`${s.activeTasks} ${snapshot.isDraggingOver ? s.dragOver : ''}`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h3 className={s.activeTitle}>{t("tasks.active")}</h3>
                                    {active.map((t, index) => (
                                        <Task key={t.id} {...t} taskStatus={'active'} index={index}/>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                    {showTasks !== 'completed' && showTasks !== 'active' && (
                        <Droppable droppableId="inProgress">
                            {(provided, snapshot) => (
                                <div
                                    className={`${s.inProgressTasks} ${snapshot.isDraggingOver ? s.dragOver : ''}`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h3 className={theme === 'dark' ? s.inProgressTitle : s.lightInProgress}>{t("tasks.in_progress")}</h3>
                                    {inProgress.map((t, index) => (
                                        <Task key={t.id} {...t} taskStatus={'inProgress'} index={index}/>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                    {showTasks !== 'active' && showTasks !== 'inProgress' && (
                        <Droppable droppableId="completed">
                            {(provided, snapshot) => (
                                <div
                                    className={`${s.completedTasks} ${snapshot.isDraggingOver ? s.dragOver : ''}`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <h3 className={s.completedTitle}>{t("tasks.completed")}</h3>
                                    {completed.map((t, index) => (
                                        <Task key={t.id} {...t} taskStatus={'completed'} index={index}/>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    )}
                </div>
            </DragDropContext>}
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