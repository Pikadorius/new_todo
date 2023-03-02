import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, LoginRequestType} from "features/auth/authAPI";
import {setAppInitialized, setAppStatus} from "app/appSlice";

const initialState = {
    isLoggedIn: false
}


export const authMeTC = createAsyncThunk('authMe', async (_, {dispatch}) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
        }
    } catch (e) {

    } finally {
        dispatch(setAppInitialized(true))
    }
})

export const loginTC = createAsyncThunk('login', async (data: LoginRequestType, {dispatch})=>{
    dispatch(setAppStatus('loading'))
    const res = await authAPI.login(data)
    if (res.data.resultCode===0) {
        dispatch(setIsLoggedIn(true))
        dispatch(setAppStatus('success'))
    }
    else dispatch(setAppStatus('failed'))
})

export const logoutTC = createAsyncThunk('logout', async (_,{dispatch})=>{
    dispatch(setAppStatus('loading'))
    const res = await authAPI.logout()
    if (res.data.resultCode===0) {
        dispatch(setIsLoggedIn(false))
        dispatch(setAppStatus('success'))
    }
    else dispatch(setAppStatus('failed'))
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
    }
})

export const {setIsLoggedIn} = authSlice.actions

export const authReducer = authSlice.reducer