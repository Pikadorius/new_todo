import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {Navigate} from "react-router-dom";
import {PATH} from "common/constants/PATH";
import {LoginRequestType} from 'features/auth/authAPI';
import {SubmitHandler, useForm} from 'react-hook-form';
import {loginTC} from 'features/auth/authSlice';
import s from 'features/auth/Login/Login.module.scss'
import {isLoggedSelector} from 'features/auth/authSelectors';
import eye from '../../../assets/icons/eye.svg'
import eyeOff from '../../../assets/icons/eyeOff.svg'

const Login = () => {
    const isLoggedIn = useAppSelector(isLoggedSelector)
    const dispatch = useAppDispatch()
    const [showPass, setShowPass] = useState(false)
    const passwordVisibility = () => {
        setShowPass(!showPass)
    }

    const {register, handleSubmit, formState: {errors}, reset} = useForm<LoginRequestType>({
        mode: 'onBlur',
        defaultValues: {
            email: 'free@samuraijs.com',
            password: 'free',
            rememberMe: true
        }
    });
    const onSubmit: SubmitHandler<LoginRequestType> = data => dispatch(loginTC(data));

    const onReset = () => {
        reset(formValues => ({
            email: '',
            password: ''
        }))
    }

    if (isLoggedIn) {
        return <Navigate to={PATH.MAIN}/>
    }

    return (
        <div className={s.wrapper}>
            <label>
                <p>To log in get registered <a className={s.link}
                                               href={'https://social-network.samuraijs.com/'}
                                               target={'_blank'}
                                               rel={'noreferrer'}>here.</a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </label>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <div className={s.field}>
                    <span className={s.fieldName}>Login</span>
                    <input {...register('email', {required: true})} />
                    {errors.email && <span className={s.errorField}>This field is required</span>}
                </div>
                <div className={s.field}>
                    <span className={s.fieldName}>Password</span>
                    <input type={showPass ? 'text' : 'password'} {...register("password", {required: true})} />

                    <i onClick={passwordVisibility}><img src={showPass ? eyeOff : eye} alt={'show/hide'}/></i>
                    {errors.password && <span className={s.errorField}>This field is required</span>}
                </div>
                <div className={s.field}>
                    <input type={'checkbox'} {...register("rememberMe")}/> Remember me
                </div>
                <div className={s.field}>
                    <button onClick={onReset}>Reset fields</button>
                </div>
                <button type="submit" className={s.btn}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Login;