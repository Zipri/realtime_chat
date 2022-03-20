import React from 'react';
import s from './styles.module.css'

const Loader = () => {
    return <div className={s.block}>
        <div className={s.inside}>
            <div className={s.ldsCircle}><div>.</div></div>
        </div>
    </div>
};

export default Loader;