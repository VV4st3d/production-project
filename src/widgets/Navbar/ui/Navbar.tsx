import React, {useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import {Modal} from "shared/ui/Modal/Modal";
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";

interface NavbarProps {
    className?: string,

}

export const Navbar = ({className}: NavbarProps) => {
    const {t} = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)

    const onToggleModal = useCallback(()=>{
        setIsAuthModal(prev=>!prev)
    },[])

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>
            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur cupiditate dolore et expedita ipsam placeat quis repellendus sit voluptatibus?
            </Modal>
        </div>
    );
};


