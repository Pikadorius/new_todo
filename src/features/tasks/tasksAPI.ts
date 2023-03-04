import {DefaultResponseType, instance} from "common/constants/instance";
import {TaskType, UpdateTaskType} from 'features/tasks/tasksTypes';

export const tasksAPI = {
    fetchTasks: (todolistId: string) => {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string) => instance.post(`/todo-lists/${todolistId}/tasks`, {title}),
    deleteTask: (todolistId: string, taskId: string) => instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`),
    updateTask: (todolistId: string, taskId: string, newTask: UpdateTaskType) => instance.put<DefaultResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, newTask),
}