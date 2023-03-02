import {instance} from "common/constants/instance";

export const tasksAPI = {
    fetchTasks: (todolistId: string) => {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string) => instance.post(`/todo-lists/${todolistId}/tasks`, {title}),
    deleteTask: (todolistId: string, taskId: string) => instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
}