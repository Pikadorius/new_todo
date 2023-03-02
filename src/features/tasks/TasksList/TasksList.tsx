import React, {useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {createTaskTC, fetchTasksTC} from "features/tasks/tasksSlice";

const TasksList = () => {
    const {id} = useParams<{ id: string }>()
    console.log(id)
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)

    useEffect(() => {
        if (!id) return
        dispatch(fetchTasksTC(id))
    }, [])

    return (
        <>
            <div>
                {tasks.map(t => <div key={t.id}>{t.title}</div>)}
            </div>
            {id &&<button onClick={() => dispatch(createTaskTC({id, title: '1123'}))}>Add task</button>}
        </>
    );
};

export default TasksList;