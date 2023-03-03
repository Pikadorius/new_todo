import {instance} from "common/constants/instance";
import {TodolistResponseType} from "features/todolists/todolistsTypes";

export const todolistsAPI = {
    fetchTodos: () => instance.get<TodolistResponseType[]>('/todo-lists'),
    createTodo: (title: string)=>instance.post('/todo-lists', {title}),
    updateTodo: (todoId: string, title: string)=>instance.put(`/todo-lists/${todoId}`, {title}),
    deleteTodo: (todoId: string)=>instance.delete(`/todo-lists/${todoId}`)
}