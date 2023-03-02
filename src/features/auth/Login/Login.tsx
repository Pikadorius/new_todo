import React from 'react';
import {useAppSelector} from "common/hooks/hooks";
import {Navigate} from "react-router-dom";
import {PATH} from "common/constants/PATH";

const Login = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={PATH.TODOLISTS}/>
    }

    return (
        <div>
            Login
        </div>
    );
};

export default Login;