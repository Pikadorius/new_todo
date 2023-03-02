import {instance} from "common/constants/instance";
import {TodolistResponseType} from "features/todolists/todolistsTypes";

export const todolistsAPI = {
    fetchTodos: () => instance.get<TodolistResponseType[]>('/todo-lists'),
    createTodo: (title: string)=>instance.post('/todo-lists', {title}),
    deleteTodo: (todoId: string)=>instance.delete(`/todo-lists/${todoId}`)
}