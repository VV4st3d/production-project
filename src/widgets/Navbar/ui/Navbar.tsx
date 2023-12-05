import React, {memo, useCallback, useState} from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {LoginModal} from "features/authByUsername";
import {useSelector} from "react-redux";
import {getUserAuthData, userActions} from "entities/User";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {Text, TextTheme} from "shared/ui/Text/Text";
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {RoutePath} from "shared/config/routerConfig/routerConfig";

interface NavbarProps {
    className?: string,

}

export const Navbar = memo(({className}: NavbarProps) => {
        const {t} = useTranslation()
        const [isAuthModal, setIsAuthModal] = useState(false)
        const authData = useSelector(getUserAuthData)
        const dispatch = useAppDispatch()

        const onCloseModal = useCallback(() => {
            setIsAuthModal(false)
        }, [])

        const onShowModal = useCallback(() => {
            setIsAuthModal(true)
        }, [])

        const onLogout = useCallback(() => {
            dispatch(userActions.logout())
        }, [dispatch])

        if (authData) {
            return (
                <aside className={classNames(cls.Navbar, {}, [className])}>
                    <Text theme={TextTheme.INVERTED} className={cls.appName} title={t('Social Media App')}/>
                    <AppLink to={RoutePath.article_create} theme={AppLinkTheme.SECONDARY} className={cls.createLink}>
                        {t('Создать статью')}
                    </AppLink>
                    <Button
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={cls.links}
                        onClick={onLogout}
                    >
                        {t('Выйти')}
                    </Button>
                    <LoginModal onClose={onCloseModal} isOpen={isAuthModal}/>
                </aside>
            )
        }

        return (
            <aside className={classNames(cls.Navbar, {}, [className])}>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    className={cls.links}
                    onClick={onShowModal}
                >
                    {t('Войти')}
                </Button>
                {isAuthModal && <LoginModal onClose={onCloseModal} isOpen={isAuthModal}/>}
            </aside>
        );
    }
)

