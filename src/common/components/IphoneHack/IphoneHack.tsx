import React from 'react';
import iphone from '../../../assets/pics/iphone.jpg'
import s from './IphoneHack.module.scss'


const IphoneHack = () => {
    return (
        <div className={s.container}>
            <img src={iphone} alt={'iphone'}/>
        </div>
    );
};

export default IphoneHack;