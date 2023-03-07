import React from 'react';
import s from './Greetings.module.scss'
import {useAppSelector} from 'common/hooks/hooks';
import {loggedUserSelector} from 'features/auth/authSelectors';

const Greetings = () => {
    const userName = useAppSelector(loggedUserSelector).login

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.title}>
                    <h2>Hello, {userName}!</h2>
                    <h3>Welcome to my <a  rel={'noreferrer'} target={'_blank'} className={s.link} href={'https://github.com/Pikadorius/new_todo'} title={'Here you can see code'}>Todolist App</a></h3>
                </div>
                <div className={s.technologies}>
                    <h4>Used technologies and features:</h4>
                    <ul>
                        <li>Typescript</li>
                        <li>Redux Toolkit</li>
                        <li>React router dom</li>
                        <li>React hook form</li>
                        <li>SCSS</li>
                        <li>Protected routes</li>
                        <li>Hooks</li>
                        <li>Reusable components</li>
                        <li>Local storage</li>
                        <li>No libraries of React UI components {'\n'} (only custom components)</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Greetings;