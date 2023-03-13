import axios, { AxiosError } from 'axios'

import { setAppError, setAppStatus } from 'app/appSlice'
import {AppDispatch} from "store/store";

export const errorHandler = (e: Error | AxiosError<{ error: string }>, dispatch: AppDispatch) => {
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