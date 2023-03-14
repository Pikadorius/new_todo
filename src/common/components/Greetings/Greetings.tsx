import React from 'react';
import s from './Greetings.module.scss'
import {useAppSelector} from 'common/hooks/hooks';
import {loggedUserSelector} from 'features/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import {themeSelector} from 'features/theme/themeSelectors';

const Greetings = () => {
    const userName = useAppSelector(loggedUserSelector).login
    const {t} = useTranslation()
    const theme = useAppSelector(themeSelector)

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.title}>
                    <h2>{t('greetings.hello')}, {userName}!</h2>
                    <h3>{t('greetings.welcome')} <a  rel={'noreferrer'} target={'_blank'} className={theme==='dark' ? s.link : `${s.link} ${s.light}`} href={'https://github.com/Pikadorius/new_todo'} title={t('greetings.code') || ''}>Todolist App</a></h3>
                </div>
                <div className={s.technologies}>
                    <h4>{t('greetings.technologies')}</h4>
                    <ul>
                        <li>Typescript</li>
                        <li>Redux Toolkit</li>
                        <li>React Router Dom</li>
                        <li>React Hook Form</li>
                        <li>SCSS</li>
                        <li>{t('greetings.localization')}</li>
                        <li>{t('greetings.routes')}</li>
                        <li>{t('greetings.hooks')}</li>
                        <li>{t('greetings.reusable')}</li>
                        <li>{t('greetings.lc')}</li>
                        <li>{t('greetings.custom')}</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Greetings;