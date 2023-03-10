import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginRequestType, UserRequestType} from "features/auth/authAPI";
import {setAppError, setAppInitialized, setAppStatus} from "app/appSlice";
import {fetchTodosTC} from 'features/todolists/todolistsSlice';
import i18n from 'i18next';
import {errorHandler} from "common/utils/errorHandlers";

const initialState = {
    isLoggedIn: false,
    user: {} as UserRequestType
}

export const authMeTC = createAsyncThunk('authMe', async (_, {dispatch}) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setUser(res.data.data))
        }
    } catch (e:any) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(setAppInitialized(true))
    }
})

export const loginTC = createAsyncThunk('login', async (data: LoginRequestType, {dispatch}) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(authMeTC())
            dispatch(fetchTodosTC())
            dispatch(setAppStatus('success'))
            dispatch(setAppError(i18n.t("popUp.login_success")))
        } else {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(res.data.messages[0]))
        }
    } catch (e: any) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
})

export const logoutTC = createAsyncThunk('logout', async (_, {dispatch}) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(false))
            dispatch(setUser({} as UserRequestType))
            dispatch(setAppStatus('success'))
            dispatch(setAppError(i18n.t("popUp.logout_success")))
        } else dispatch(setAppStatus('failed'))
    } catch (e: any) {
        errorHandler(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setUser: (state, action: PayloadAction<UserRequestType>) => {
            state.user = action.payload
        },
    }
})

export const {setIsLoggedIn, setUser} = authSlice.actions

export const authReducer = authSlice.reducer