import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginModal.module.scss'
import {Modal} from "shared/ui/Modal/Modal";
import {LoginForm} from "../LoginForm/LoginForm";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {useEffect} from "react";

interface LoginModalProps {
    className?: string,
    isOpen: boolean,
    onClose: () => void
}

export const LoginModal = ({className, onClose, isOpen}: LoginModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={classNames(cls.LoginModal, {}, [className])}
            lazy
        >
            <LoginForm/>
        </Modal>
    );
};
