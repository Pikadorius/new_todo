import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import {PATH} from "common/constants/PATH";
import {useAppSelector} from "common/hooks/hooks";


const RequireAuth = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />

    return <Outlet />
}

export default RequireAuth