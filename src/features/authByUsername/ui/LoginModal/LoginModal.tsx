import {classNames} from "shared/lib/classNames/classNames";
import cls from './LoginModal.module.scss'
import {Modal} from "shared/ui/Modal/Modal";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {Suspense, useEffect} from "react";
import {Loader} from "shared/ui/Loader/Loader";
import {LoginFormAsync} from "../LoginForm/LoginForm.async";

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
            <Suspense fallback={<Loader/>}>
                <LoginFormAsync/>
            </Suspense>
        </Modal>
    );
};
