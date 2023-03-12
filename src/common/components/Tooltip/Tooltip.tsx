import React, {ReactElement} from 'react';
import s from './Tooltip.module.scss'


type PropsType = {
    children: ReactElement;
    text: string;
};

const ToolTip: React.FC<PropsType> = ({text,children}) => {
    return (
        <div className={s.container}>
            {children}
            <div className={s.tooltip}>
                {text}
            </div>
        </div>
    );
};

export default ToolTip;