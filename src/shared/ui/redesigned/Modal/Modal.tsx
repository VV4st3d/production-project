import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { ReactNode } from 'react';
import { Portal } from '@/shared/ui/redesigned/Portal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Overlay } from '@/shared/ui/redesigned/Overlay/Overlay';
import { useModal } from '../../../lib/hooks/useModal/useModal';
import { toggleFeatures } from '@/shared/lib/features';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const { className, onClose, isOpen, children, lazy } = props;
    const {
        isClosing,
        close: closeHandler,
        isMounted,
    } = useModal({
        animationDelay: ANIMATION_DELAY,
        isOpen: isOpen,
        onClose: onClose,
    });
    const { theme } = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }
    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(cls.Modal, mods, [
                    className,
                    theme,
                    'app_modal',
                    toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => cls.modalNew,
                        off: () => cls.modalOld,
                    }),
                ])}
            >
                <Overlay onClick={closeHandler} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
};
