import React, {FC, ReactNode} from 'react';
import {createPortal} from 'react-dom';

type PortalType = {
    children: ReactNode
    el?: HTMLElement
}
const Portal: FC<PortalType> = ({children, el}) => {
    el = document.body
    return createPortal(children, el)
};

export default Portal;