import axios, { AxiosError } from 'axios'

import { setAppError, setAppStatus } from 'app/appSlice'
import {Dispatch} from "@reduxjs/toolkit";

export const errorHandler = (e: Error | AxiosError<{ error: string }>, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>

    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppError(error))
        console.log(error)
    } else {
        dispatch(setAppError(`Native error ${err.message}`))
        console.log(err.message)
    }
    dispatch(setAppStatus('failed'))
}