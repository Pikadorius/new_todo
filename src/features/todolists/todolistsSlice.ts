import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TodolistDomainType,
  TodolistResponseType,
} from "features/todolists/todolistsTypes";
import { todolistsAPI } from "features/todolists/todolistsAPI";
import { setAppError, setAppStatus } from "app/appSlice";
import { tasksAPI } from "features/tasks/tasksAPI";
import { TaskType } from "features/tasks/tasksTypes";
import i18next from "i18next";
import { errorHandler } from "common/utils/errorHandlers";

const { t } = i18next;
const initialState = [] as TodolistDomainType[];

export const fetchTodosTC = createAsyncThunk(
  "fetchTodolists",
  async (_, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await todolistsAPI.fetchTodos();
      dispatch(setTodolists(res.data));
      if (res.data.length) {
        res.data.forEach((t) => dispatch(fetchTodosTasksTC(t.id)));
      }
      dispatch(setAppStatus("success"));
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setAppStatus("idle"));
    }
  }
);

export const fetchTodosTasksTC = createAsyncThunk(
  "fetchTodolists",
  async (id: string, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await tasksAPI.fetchTasks(id);
      dispatch(
        setTodosTasks({
          id,
          tasksCount: res.data.totalCount,
          tasks: res.data.items,
        })
      );
      dispatch(setAppStatus("success"));
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setAppStatus("idle"));
    }
  }
);

export const createTodoTC = createAsyncThunk(
  "createTodo",
  async (title: string, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await todolistsAPI.createTodo(title);
      if (res.data.resultCode === 0) {
        dispatch(addTodo({ ...res.data.data.item, tasksCount: 0, tasks: [] }));
        dispatch(setAppStatus("success"));
        dispatch(setAppError(t("popUp.create_todo")));
      } else {
        dispatch(setAppStatus("failed"));
        dispatch(setAppError(res.data.messages[0]));
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setAppStatus("idle"));
    }
  }
);

export const deleteTodoTC = createAsyncThunk(
  "deleteTodo",
  async (todoId: string, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await todolistsAPI.deleteTodo(todoId);
      if (res.data.resultCode === 0) {
        dispatch(deleteTodo(todoId));
        dispatch(setAppError(t("popUp.delete_todo")));
        dispatch(setAppStatus("success"));
      } else {
        dispatch(setAppStatus("failed"));
        dispatch(setAppError(res.data.messages[0]));
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setAppStatus("idle"));
    }
  }
);

export const updateTodoTC = createAsyncThunk(
  "updateTodo",
  async (data: { todoId: string; title: string }, { dispatch }) => {
    dispatch(setAppStatus("loading"));
    try {
      const res = await todolistsAPI.updateTodo(data.todoId, data.title);
      if (res.data.resultCode === 0) {
        dispatch(updateTodoTitle(data));
        dispatch(setAppStatus("success"));
        // dispatch(setAppError(t("popUp.update_todo")))
        dispatch(setAppError(`${data.title} ${t("popUp.update_todo")}`));
      } else {
        dispatch(setAppStatus("failed"));
        dispatch(setAppError(res.data.messages[0]));
      }
    } catch (e: any) {
      errorHandler(e, dispatch);
    } finally {
      dispatch(setAppStatus("idle"));
    }
  }
);

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    setTodolists: (state, action: PayloadAction<TodolistResponseType[]>) => {
      return action.payload.map((t) => ({ ...t, tasksCount: 0, tasks: [] }));
    },
    addTodo: (state, action: PayloadAction<TodolistDomainType>) => {
      state.unshift(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((t) => t.id === action.payload);
      state.splice(index, 1);
    },
    updateTodoTitle: (
      state,
      action: PayloadAction<{ todoId: string; title: string }>
    ) => {
      return state.map((t) =>
        t.id === action.payload.todoId
          ? { ...t, title: action.payload.title }
          : t
      );
    },
    setTodosTasks: (
      state,
      action: PayloadAction<{
        id: string;
        tasksCount: number;
        tasks: TaskType[];
      }>
    ) => {
      return state.map((t) =>
        t.id === action.payload.id
          ? {
              ...t,
              tasksCount: action.payload.tasksCount,
              tasks: action.payload.tasks,
            }
          : t
      );
    },
  },
});

export const {
  setTodolists,
  addTodo,
  deleteTodo,
  updateTodoTitle,
  setTodosTasks,
} = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;
