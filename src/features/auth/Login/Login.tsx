import React, {useState,KeyboardEvent} from 'react';
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
import {useTranslation} from 'react-i18next';
import {themeSelector} from 'features/theme/themeSelectors';

const Login = () => {
    const isLoggedIn = useAppSelector(isLoggedSelector)
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const theme = useAppSelector(themeSelector)
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
        <div className={theme==='dark' ? s.wrapper : `${s.wrapper} ${s.ligth}`}>
            <label>
                <p>{t("login.register")}
                    <a className={s.link}
                       href={'https://social-network.samuraijs.com/'}
                       target={'_blank'}
                       rel={'noreferrer'}>
                        {t("login.link")}
                    </a>
                </p>
                <p>{t("login.info")}</p>
                <p><b>{t("login.default_email")}:</b> <span className={s.default}>free@samuraijs.com</span></p>
                <p style={{marginBottom: '10px'}}><b>{t("login.default_pass")}:</b> <span className={s.default}>free</span></p>
            </label>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <div className={s.field}>
                    <span className={s.fieldName}>{t("login.login")}</span>
                    <input {...register('email', {required: true})} />
                    {errors.email && <span className={s.errorField}>{t("login.required")}</span>}
                </div>
                <div className={s.field}>
                    <span className={s.fieldName}>{t("login.password")}</span>
                    <input type={showPass ? 'text' : 'password'} {...register("password", {required: true})} />

                    <i onClick={passwordVisibility}><img src={showPass ? eyeOff : eye} alt={'show/hide'}/></i>
                    {errors.password && <span className={s.errorField}>{t("login.required")}</span>}
                </div>
                <div className={s.field}>
                    <input type={'checkbox'} {...register("rememberMe")}/> {t("login.remember")}
                </div>
                <div className={s.field}>
                    <button className={s.btn} type="reset" onClick={onReset}>{t("login.reset")}</button>
                </div>
                <button type="submit" className={s.btn}>
                    {t("login.send")}
                </button>
            </form>
        </div>
    );
};

export default Login;