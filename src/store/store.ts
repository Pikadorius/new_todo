import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "features/todolists/todolistsSlice";
import {tasksReducer} from "features/tasks/tasksSlice";
import {appReducer} from "app/appSlice";
import {authReducer} from "features/auth/authSlice";

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
