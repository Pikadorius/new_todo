import React from 'react';
import s from 'common/components/Loader/Loader.module.css'
import loader from 'assets/animations/loading.svg'

const Loader = () => {
    return (
        <div className={s.container}>
            <div className={s.loader}><img src={loader} alt={'loading'}/></div>
        </div>
    );
};

export default Loader;