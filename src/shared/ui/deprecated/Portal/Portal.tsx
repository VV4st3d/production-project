import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children?: ReactNode;
    element?: HTMLElement;
}
/**
 * устарел, используем новые компоненты из папки redesigned
 * @deprecated
 * */
export const Portal = ({ element = document.body, children }: PortalProps) => {
    return createPortal(children, element);
};
