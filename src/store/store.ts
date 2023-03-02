import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "features/todolists/todolistsSlice";
import {tasksReducer} from "features/tasks/tasksSlice";
import {appReducer} from "app/appSlice";
import {authReducer} from "features/auth/authSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const reducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = configureStore({
    reducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector