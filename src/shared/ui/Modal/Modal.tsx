import {classNames} from "shared/lib/classNames/classNames";
import cls from './Modal.module.scss'
import {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {Portal} from "shared/ui/Portal/Portal";
import {useTheme} from "app/providers/ThemeProvider";

interface ModalProps {
    className?: string,
    children?: ReactNode,
    isOpen?: boolean;
    onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {className, onClose, isOpen, children} = props
    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])
    const contentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }
    //новые ссылки на функции создаются если не использовать useCallback, такие ссылки создаются при перерисовке
    const onKeyDown = useCallback((e:KeyboardEvent)=>{
        if(e.key === 'Escape'){
            closeHandler()
        }
    }, [closeHandler])

    useEffect(() => {
        if (isOpen){
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    const {theme} = useTheme()
    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
        [cls[theme]]: true
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content}
                         onClick={contentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
