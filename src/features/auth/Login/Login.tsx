import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {Navigate} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import {setAppPage} from 'app/appSlice';
import {LoginRequestType} from 'features/auth/authAPI';
import {SubmitHandler, useForm} from 'react-hook-form';
import {loginTC} from 'features/auth/authSlice';
import s from './Login.module.css'

const Login = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const [showPass, setShowPass] = useState<'password' | 'text'>('password')

    const {register, handleSubmit, formState: {errors}} = useForm<LoginRequestType>({
        mode: 'onBlur'
    });
    const onSubmit: SubmitHandler<LoginRequestType> = data => dispatch(loginTC(data));

    useEffect(() => {
        dispatch(setAppPage('Login'))
    }, [])

    if (isLoggedIn) {
        return <Navigate to={PATH.TODOLISTS}/>
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <div className={s.field}>
                    <span className={s.fieldName}>Login</span>
                    <input {...register('email', {required: true})} />
                    {errors.email && <span className={s.errorField}>This field is required</span>}
                </div>
                <div className={s.field}>
                    <span className={s.fieldName}>Password</span>
                    < input type={showPass} {...register("password", {required: true})} />
                    {errors.password && <span className={s.errorField}>This field is required</span>}
                </div>
                <div className={s.field}>
                    <input type={'checkbox'} {...register("rememberMe")}/> Remember me
                </div>
                <button type="submit" className={s.btn}>
                    Send
                </button>
            </form>
        </div>
    )
        ;
};

export default Login;