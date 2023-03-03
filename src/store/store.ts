import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "features/todolists/todolistsSlice";
import {tasksReducer} from "features/tasks/tasksSlice";
import {appReducer} from "app/appSlice";
import {authReducer} from "features/auth/authSlice";
import {loadState, saveState} from 'common/utils/localStorage';

const reducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = configureStore({
    reducer,
    preloadedState: loadState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

store.subscribe(() => {
    saveState(store.getState())
})
