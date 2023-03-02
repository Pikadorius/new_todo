import React, {useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {createTaskTC, fetchTasksTC} from "features/tasks/tasksSlice";
import Task from "features/tasks/TasksList/Task/Task";
import AddItemForm from "common/components/AddItemForm/AddItemForm";

const TasksList = () => {
    const {id} = useParams<{ id: string }>()
    console.log(id)
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)

    useEffect(() => {
        if (!id) return
        dispatch(fetchTasksTC(id))
    }, [])

    const addTask = (title: string) => {
        id && dispatch(createTaskTC({id, title}))
    }

    return (
        <>
            <h1>Tasks</h1>
            <AddItemForm callback={addTask}/>
            <div>
                {tasks.map(t => <Task key={t.id} {...t}/>)}
            </div>
        </>
    );
};

export default TasksList;