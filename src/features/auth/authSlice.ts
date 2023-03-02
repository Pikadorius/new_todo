import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "features/auth/authAPI";
import {setAppInitialized} from "app/appSlice";

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