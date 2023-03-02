import React from 'react';
import s from './Header.module.css'
import {useAppSelector} from "common/hooks/hooks";


const Header = () => {
    const page = useAppSelector(state => state.app.page)

    return (
        <div className={s.container}>
            <h1 className={s.title}>{page}</h1>
        </div>
    );
};

export default Header;